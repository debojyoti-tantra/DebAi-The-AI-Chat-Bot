'use client';
import Message from "@/components/Message";
import PromptBox from "@/components/PromptBox";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const {selectedChat} = useAppContext()

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
  

  return (
    <div className="flex flex-1 flex-col">

      <div className="flex flex-1 flex-col items-center justify-center">
        {
          messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center my-2">
              <div className="text-xl">Hii, I'am Debai, your AI assistant.</div>
              <div className="text-base text-gray-700 dark:text-gray-300">How can I help you today?</div>
            </div>
          ) : (
            <div className="h-[70vh] overflow-y-auto" ref={containerRef}>
              <p className="text-sm text-gray-600 dark:text-gray-400"></p>
              {
                messages.map((msg, index) => (
                  <Message role={msg.role} content={msg.content} key={index} />
                ))
              }
            </div>
          )
        }

        {/* prompt box */}
        <PromptBox isMessageLoading={isMessageLoading} setIsMessageLoading={setIsMessageLoading} />
      </div>


      {/* footer */}
      <footer className="absolute bottom-0 p-2 left-[50%] text-sm text-gray-600 dark:text-gray-400">
        AI-generated, for reference only.
      </footer>
    </div>
  );
}
