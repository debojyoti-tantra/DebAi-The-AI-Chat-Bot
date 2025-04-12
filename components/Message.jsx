'use client'
import React from 'react'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'

const Message = ({role, content}) => {
    const { user } = useUser()

  return (
    <div className="flex flex-col items-center w-full max-w-3xl text-sm">
        <div className={`${role === 'user' ? 'items-end bg-green-500' : 'items-start bg-gray-500'} rounded-lg p-2 text-white`}>
            {
                role === 'user' ? (
                    <>
                        <img src={user?.imageUrl} alt={user?.name} width={40} height={40} className="rounded-full" />
                        <p className="ml-2">{user?.fullName}</p>
                        <p className="ml-2 text-sm">{content}</p>
                    </>
                ) : (
                    <>
                        <p className="mr-2">{content}</p>
                    </>
                )
            }
        </div>
    </div>
  )
}

export default Message