'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { Button } from "./ui/button"
import { StarsIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { MenuIcon } from "lucide-react"
import { PencilIcon } from "lucide-react"
import { DeleteIcon } from "lucide-react"
import { useAppContext } from "@/context/AppContext"
import axios from "axios"
import { toast } from "sonner"
import { useUser } from "@clerk/nextjs"
import { Skeleton } from "./ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "./ui/dialog"
import Link from "next/link"
import { FileCode2 } from "lucide-react"


export function AppSidebar() {
  const { isLoaded } = useUser()
  const { fetchUserChats, chats, setSelectedChat, createNewChat, selectedChat } = useAppContext()

  const selectChat = ({ id }) => {
    const chatData = chats.find(chat => chat._id === id)
    setSelectedChat(chatData)
  }

  const renameChatHandler = async ({ id }) => {
    try {
      const newName = prompt("Enter new name: ")
      if (!newName) return

      const { data } = await axios.post('/api/chat/rename', { chatId: id, name: newName })
      if (data.success) {
        fetchUserChats()
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteChatHandler = async ({ id }) => {
    try {
      const confirm = window.confirm('Are you want to delete the chat?')
      if (!confirm) return

      const { data } = await axios.post('/api/chat/delete', { chatId: id })

      if (data.success) {
        fetchUserChats()
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <Image src={'/DebAi.png'} alt="debai logo" width={50} height={50} className="rounded-md w-[50%] h-[40%] mx-auto mt-2" />
        <Button onClick={createNewChat} className='mx-auto'>New Chat <StarsIcon /></Button>
      </SidebarHeader>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 mx-3">Recent Chats</p>
      <SidebarContent>
        {isLoaded ? (
          chats.map((chat, index) => {
            return (
              <SidebarGroup key={index} onClick={() => selectChat({ id: chat?._id })} className={`flex flex-row gap-2 justify-between w-[90%] ${chat._id === selectedChat._id ? 'bg-violet-400 dark:bg-gray-700' : 'bg-violet-300 hover:bg-violet-400 dark:hover:bg-gray-700 dark:bg-gray-800'} p-2 mx-auto rounded-md`}>
                <div className="text-sm my-1 mx-3 flex justify-center items-center gap-2">
                  <FileCode2 /> <p>{chat?.name}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger><MenuIcon /></DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => renameChatHandler({ id: chat?._id })} ><PencilIcon /> Rename</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => deleteChatHandler({ id: chat?._id })} ><DeleteIcon /> Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarGroup>
            )
          })
        ) : (
          <div className="flex flex-col gap-2">
            <Skeleton className='h-12 w-[90%] mx-auto' />
            <Skeleton className='h-12 w-[90%] mx-auto' />
            <Skeleton className='h-12 w-[90%] mx-auto' />
            <Skeleton className='h-12 w-[90%] mx-auto' />
            <Skeleton className='h-12 w-[90%] mx-auto' />
          </div>
        )
        }

      </SidebarContent>
      <SidebarFooter>
        <Dialog>
          <DialogTrigger className="flex items-center justify-center flex-row gap-2 text-sm my-1 p-2 bg-violet-400 dark:bg-violet-800 rounded-md">
              {/* <UserIcon />  */}
              <Avatar className="w-7 h-7 border bg-white border-white">
                <AvatarImage src="https://avatars.githubusercontent.com/u/171080341?v=4" />
                <AvatarFallback>DAi</AvatarFallback>
              </Avatar>
              <p>About Devloper</p>
            </DialogTrigger>
          <DialogContent>
            <DialogTitle className="mx-auto">About Devloper</DialogTitle>
            <div className="flex gap-3 justify-center items-center">
              <img src="https://avatars.githubusercontent.com/u/171080341?v=4" alt="debojyoti image" className="w-20 h-20 rounded-full border border-black bg-white" />
              <p>Hii my name is Debojyoti Tantra. I am a professional Devloper.</p>
            </div>
            <DialogFooter>
              <Link target="_blank" href="https://debojyotitantra.vercel.app" className="mx-auto text-blue-800 dark:text-blue-200 underline">Portfolio</Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarFooter>
    </Sidebar>
  )
}
