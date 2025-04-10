import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { UserIcon } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"
import { StarsIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { MenuIcon } from "lucide-react"
import { PencilIcon } from "lucide-react"
import { DeleteIcon } from "lucide-react"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Image src={'/DebAi.png'} alt="debai logo" width={80} height={80} className="rounded-md w-[60%] h-[60%] mx-auto mt-2" />
        <Button className='mx-auto'>New Chat <StarsIcon /></Button>
      </SidebarHeader>
        <p className="text-sm text-gray-600 dark:text-gray-400 my-1 mx-3">Recent Chats</p>
      <SidebarContent>
        <SidebarGroup className="flex flex-row gap-2 justify-between w-[90%] bg-gray-300 hover:bg-gray-400 dark:hover:bg-gray-700 dark:bg-gray-800 p-2 mx-auto rounded-md">
          <p className="text-sm my-1 mx-3">New Chat</p>
          <DropdownMenu>
            <DropdownMenuTrigger><MenuIcon /></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem><PencilIcon /> Rename</DropdownMenuItem>
              <DropdownMenuItem><DeleteIcon /> Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button className="flex items-center justify-center flex-row gap-2 text-sm my-3">
          <UserIcon /> <p>Profile</p>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
