import connectDB from "@/config/db";
import Chat from "@/models/chatModel";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return NextResponse.json({ success: false, message: "user not authenticated" }, { status: 401 });
        }

        // connect to the database and fetch the all the chats
        await connectDB();
        const data = await Chat.find({ clerkId: userId });

        return NextResponse.json({ success: true, data }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}