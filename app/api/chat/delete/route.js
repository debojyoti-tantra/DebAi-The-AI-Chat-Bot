import connectDB from "@/config/db";
import Chat from "@/models/chatModel";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req) {
    try {
        const { userId } = getAuth(req);
        const { chatId } = await req.json();
        
        if (!userId) {
            return NextResponse.json({ success: false, message: "user not authenticated" }, { status: 401 });
        }

        // connect to the database and delete the chat
        await connectDB();
        await Chat.findOneAndDelete({ _id: chatId, clerkId: userId });

        return NextResponse.json({ success: true, message: "chat deleted successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

}