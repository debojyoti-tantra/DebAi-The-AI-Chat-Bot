'use client'
import React from 'react'
import ThemeToggle from './ThemeToggle'
import { SidebarTrigger } from './ui/sidebar'
import { SignedOut, SignedIn } from '@clerk/nextjs'
import { Button } from './ui/button'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'
import { Skeleton } from './ui/skeleton'

const Navbar = () => {
  const { openSignIn, openSignUp } = useClerk()
  const {isLoaded} = useUser()
  const router = useRouter()

  return (
    <div className='flex items-center justify-between flex-wrap p-2 px-4 bg-gray-100 dark:bg-gray-900'>
        <SidebarTrigger />
        <div className='flex items-center space-x-4'>
          <ThemeToggle />
            {
              isLoaded ? (
                <SignedIn>
                  <UserButton />
                </SignedIn>
              ) : (
                <Skeleton className="rounded-full h-8 w-8" />
              )
            }
          <SignedOut>
            <Button className='px-2' onClick={openSignIn}>Sign In</Button>
            <Button className='px-2' onClick={openSignUp}>Sign Up</Button>
          </SignedOut>
        </div>
    </div>
  )
}

export default Navbar