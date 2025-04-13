'use client'
import React, { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { CopyIcon, ThumbsUpIcon } from 'lucide-react'
import { ThumbsDownIcon } from 'lucide-react'
import Markdown from 'react-markdown'
import Prism from 'prismjs'
import { toast } from 'sonner'

const Message = ({ role, content }) => {
    const { user } = useUser()
    
    useEffect(() => {
      Prism.highlightAll()
    }, [content])
    
    const handleCopyText = () => {
        navigator.clipboard.writeText(content)
        toast.success('Text Copied Successfully...')
    }

    return (
        <div className="flex flex-col w-[90%] mx-auto text-sm">
            <div className={`flex relative gap-2 ${role === 'user' ? 'justify-end text-left items-end flex-col-reverse' : 'justify-start text-left flex-col'}`}>
                {
                    role === 'user' ? (
                        <>
                            <div className='bg-green-200 dark:bg-green-800 px-2 py-2 rounded-md'>
                                {/* <p className="mx-2 font-bold">{user?.fullName}</p> */}
                                <div className="mx-2 text-sm">
                                    <Markdown>{content}</Markdown>
                                </div>
                            </div>
                            <Avatar>
                                <AvatarImage src={user?.imageUrl} />
                                <AvatarFallback>DAi</AvatarFallback>
                            </Avatar>
                        </>
                    ) : (
                        <>
                            <Avatar className="border border-white">
                                <AvatarImage src='/debai.png' />
                                <AvatarFallback>DAi</AvatarFallback>
                            </Avatar>
                            <div className="bg-purple-200 dark:bg-gray-800 p-3 rounded-md">
                                <div className="text-sm">
                                    <Markdown>
                                        {content}
                                    </Markdown>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 ml-1'>
                                <CopyIcon onClick={handleCopyText} />
                                <ThumbsUpIcon />
                                <ThumbsDownIcon />
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Message