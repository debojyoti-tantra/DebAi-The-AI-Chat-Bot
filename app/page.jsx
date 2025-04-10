'use client';
import Message from "@/components/Message";
import PromptBox from "@/components/PromptBox";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState([1]);

  return (
    <div className="flex flex-1 flex-col">

      <div className="flex flex-1 flex-col items-center justify-center">
        {
          message.length === 0 ? (
            <div className="flex flex-col items-center justify-center my-2">
              <div className="text-xl">Hii, I'am Debai, your AI assistant.</div>
              <div className="text-base text-gray-700 dark:text-gray-300">How can I help you today?</div>
            </div>
          ) : (
            <div>
              <Message role="user" content='what is nextjs?' />
            </div>
          )
        }

        {/* prompt box */}
        <PromptBox />
      </div>


      {/* footer */}
      <footer className="absolute bottom-0 p-2 left-[50%] text-sm text-gray-600 dark:text-gray-400">
        AI-generated, for reference only.
      </footer>
    </div>
  );
}
