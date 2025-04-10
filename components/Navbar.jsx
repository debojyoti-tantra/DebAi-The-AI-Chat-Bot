'use client'
import React from 'react'
import ThemeToggle from './ThemeToggle'
import { SidebarTrigger } from './ui/sidebar'
import { SignedOut, SignedIn } from '@clerk/nextjs'
import { Button } from './ui/button'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'

const Navbar = () => {
  const { openSignIn, openSignUp } = useClerk()
  const router = useRouter()

  return (
    <div className='flex items-center justify-between flex-wrap p-2 px-4 bg-gray-100 dark:bg-gray-900'>
        <SidebarTrigger />
        <div className='flex items-center space-x-4'>
          <ThemeToggle />
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button onClick={openSignIn}>Sign In</Button>
            <Button onClick={openSignUp}>Sign Up</Button>
          </SignedOut>
        </div>
    </div>
  )
}

export default Navbar