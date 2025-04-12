import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Chat from "@/models/chatModel";
import connectDB from "@/config/db";

export async function POST(req) {
    try {
        const { userId } = getAuth(req);
        
        if (!userId) {
            return NextResponse.json({ success: false, message: "user not authenticated" }, { status: 401 });
        }

        const { chatId, name } = await req.json();

        // connect to the database and update the chat name
        await connectDB();
        await Chat.findOneAndUpdate({ _id: chatId }, { name });

        return NextResponse.json({ success: true, message: "chat renamed successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}