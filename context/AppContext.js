'use client'
import { useAuth, useUser } from '@clerk/nextjs'
import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

export const AppContext = createContext()

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = ({ children }) => {
    const {user} = useUser()
    const {getToken} = useAuth()

    const [chats, setChats] = useState([])
    const [selectedChat, setSelectedChat] = useState(null)

    const createNewChat = async () => {
        try {
            if (!user) return null;
            
            const token = await getToken()

            await axios.post('/api/chat/create', {}, {headers: {Authorization: `Bearer ${token}`}})

            fetchUserChats()

        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchUserChats = async () => {
        try {
            if (!user) return null;
            
            const token = await getToken()

            const {data} = await axios.get('/api/chat/get', {headers: {Authorization: `Bearer ${token}`}})

            if (data.success) {
                setChats(data.data)

                // if the user has no chats then create a new chat
                if (data.data.length === 0) {
                    createNewChat()
                    return fetchUserChats()
                } else {
                    // short the chats by updated date
                    data.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

                    // set resently updated chats as selected chat
                    setSelectedChat(data.data[0])
                }

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
      if (user) {
        fetchUserChats()
      }
    }, [user])
    

    const value = {
        user,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        createNewChat,
        fetchUserChats
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}