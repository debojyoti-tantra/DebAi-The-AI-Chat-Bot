import connectDB from "@/config/db";
import Chat from "@/models/chatModel";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req) {
    try {
        const { userId } = getAuth(req);
        
        if (!userId) {
            return NextResponse.json({ success: false, message: "user not authenticated" }, { status: 401 });
        }

        // prepare the chat data to be saved in the database
        const chatData = {
            clerkId: userId,
            messages: [],
            name: "New Chat"
        }

        // connect to the database and create a new chat
        await connectDB();
        await Chat.create(chatData);

        return NextResponse.json({ success: true, message: "chat created successfully" }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}