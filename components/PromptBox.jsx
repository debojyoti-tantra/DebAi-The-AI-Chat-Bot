'use client'
import React, { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { SendHorizonal } from 'lucide-react'
import { toast } from 'sonner'

const PromptBox = () => {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!prompt.trim()) {
      toast.error('Please enter a prompt')
      setPrompt('')
    }
    // Handle sending the message...
    console.log(prompt)
    setPrompt('')
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex items-center gap-2 border rounded-lg px-4 py-3 shadow-md bg-background w-full max-w-3xl mx-auto p-1 border-gray-500"
    >
      <Textarea
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