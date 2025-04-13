'use client'
import React, { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { SendHorizonal } from 'lucide-react'
import { toast } from 'sonner'
import { useAppContext } from '@/context/AppContext'
import axios from 'axios'

const PromptBox = ({isMessageLoading, setIsMessageLoading}) => {
  const [prompt, setPrompt] = useState('')
  const { user, chats, setChats, selectedChat, setSelectedChat, createNewChat, fetchUserChats } = useAppContext()


  const sendPrompt = async (e) => {
    const promptCopy = prompt
    try {
      e.preventDefault()
      if (!user) return toast.error('Please login to send messages')
      if (isMessageLoading) return toast.error('Please wait for the previous message to finish loading')
      
      setIsMessageLoading(true)
      setPrompt('')

      const userPrompt = {
        role: 'user',
        content: prompt,
        timestamp: Date.now(),
      }

      // saving user prompt to the chats array
      setChats((prevChats) => prevChats.map((chat) => chat._id === selectedChat._id ? {
        ...chat,
        messages: [...chat.messages, userPrompt],
      }: chat
      ))

      // saving user prompt to the selected chat
      setSelectedChat((prevSelectedChat) => ({
        ...prevSelectedChat,
        messages: [...prevSelectedChat.messages, userPrompt],
      }))


      const {data} = await axios.post('/api/chat/ai', {
        chatId: selectedChat._id,
        prompt
      })

      if (data.success) {
        setChats((prevChats) => prevChats.map((chat) => chat._id === selectedChat._id ? {
          ...chat,
          messages: [...chat.messages, data.data],
        }: chat
        ))

        const message = data.data.content;
        const messageTokens = message.split(" ");
        let assistanceMessage ={
          role: 'assistant',
          content: "",
          timestamp: Date.now(),
        }

        setSelectedChat((prevSelectedChat) => ({
          ...prevSelectedChat,
          messages: [...prevSelectedChat.messages, assistanceMessage],
        }))

        for (let i = 0; i < messageTokens.length; i++) {
          setTimeout(() => {
            assistanceMessage.content = messageTokens.slice(0, i + 1).join(" ");
            setSelectedChat((prev) => {
              const updatedMessages = [
                ...prev.messages.slice(0, -1),
                assistanceMessage,
              ]
              return {...prev, messages: updatedMessages}
            })
          }, i*100)
          
        }

      } else {
        toast.error(data.message)
        setPrompt(promptCopy)
      }

    } catch (error) {
      toast.error(error.message)
      setPrompt(promptCopy)
    } finally {
      setIsMessageLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendPrompt(e)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!prompt.trim()) {
      toast.error('Please enter a prompt')
      setPrompt('')
    }
    // Handle sending the message...
    setPrompt('')
  }

  return (
    <form 
      onSubmit={sendPrompt}
      className="flex items-center gap-2 border rounded-lg px-4 py-3 shadow-md bg-background w-[93%] mx-auto ax-w-3xl mx-auto p-1 border-gray-500"
    >
      <Textarea
        onKeyDown={handleKeyDown}
        rows={2}
        placeholder="Chat with DebAi..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="resize-none w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
      />
      <Button type="submit" className={`shrink-0 h-10 px-3 ${prompt.trim() ? '' : 'bg-gray-500'}`}>
        <SendHorizonal className="w-4 h-4" />
      </Button>
    </form>
  )
}

export default PromptBox