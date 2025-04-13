'use client';
import Message from "@/components/Message";
import PromptBox from "@/components/PromptBox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppContext } from "@/context/AppContext";
import { ThumbsUpIcon } from "lucide-react";
import { ThumbsDownIcon } from "lucide-react";
import { CopyIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { isLoaded } = useUser()
  const [messages, setMessages] = useState([]);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const { selectedChat } = useAppContext()

  const containerRef = useRef(null);

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages)
    }
  }, [selectedChat])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages])

  if (!isLoaded) {
    return (
      <div className="w-full p-10 flex flex-col gap-5">
        <div className="w-full flex justify-end">
          <div className="flex items-center space-x-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
        </div>

        <div className="w-full flex justify-start">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end">
          <div className="flex items-center space-x-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
        </div>

        <div className="w-full flex justify-start">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end">
          <div className="flex items-center space-x-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
        </div>

        <div className="w-full flex justify-start">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>

        <Skeleton className="h-[125px] w-full rounded-xl" />
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col">

      <div className="flex flex-1 flex-col justify-center">
        {
          messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center my-2">
              <div className="text-xl flex items-center gap-2">
                <Image src={`/debai.png`} width={25} height={25} alt="debai" className="border border-white rounded-md" />
                <p>Hii, I'am Debai, your AI assistant.</p>
              </div>
              <div className="text-base text-gray-700 dark:text-gray-300">How can I help you today?</div>
            </div>
          ) : (
            <div className="h-[69vh] overflow-y-auto flex flex-col gap-4 mb-3" ref={containerRef}>
              <p className="text-xl sticky top-0 bg-slate-200 text-slate-800 z-50 px-2 py-1 rounded-md underline font-bold mx-auto">{selectedChat?.name}</p>
              {
                messages.map((msg, index) => (
                  <Message role={msg.role} content={msg.content} key={index} />
                ))
              }
              {
                isMessageLoading && (
                  <div className="flex gap-2 flex-col w-[90%] mx-auto">
                    <Avatar className="border border-white">
                      <AvatarImage src='/debai.png' />
                      <AvatarFallback>DAi</AvatarFallback>
                    </Avatar>
                    <div className="loader flex justify-center items-center gap-1 bg-purple-200 dark:bg-gray-800 p-3 rounded-md">
                      <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                      <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                      <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                    </div>
                    <div className='flex items-center gap-2 ml-1'>
                      <CopyIcon />
                      <ThumbsUpIcon />
                      <ThumbsDownIcon />
                    </div>
                  </div>
                )
              }
            </div>
          )
        }

        {/* prompt box */}
        <PromptBox isMessageLoading={isMessageLoading} setIsMessageLoading={setIsMessageLoading} />
      </div>


      {/* footer */}
      {/* <footer className="relative bottom-0 p-2 left-[30%] sm:left-[40%] text-sm text-gray-600 dark:text-gray-400">
        AI-generated, for reference only.
      </footer> */}
    </div>
  );
}
