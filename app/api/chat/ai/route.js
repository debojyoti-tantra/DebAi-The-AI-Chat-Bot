export const maxDurations = 60;
import connectDB from "@/config/db";
import Chat from "@/models/chatModel";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(req) {
    try {
        const { userId } = getAuth(req);
        
        // extract the chatId and prompt from the request body
        const { chatId, prompt } = await req.json();

        if (!userId) {
            return NextResponse.json({ success: false, message: "user not authenticated" }, { status: 401 });
        }

        // find the chat document in the database based on userId and chatId
        await connectDB();
        const data = await Chat.findOne({ clerkId: userId, _id: chatId });

        // create a user message object
        const userPrompt = {
            role: "user",
            content: prompt,
            timestamps: Date.now()
        };

        data.messages.push(userPrompt);

        // call the deepseek api to get a chat complication
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "deepseek-chat",
            store: true,
        });
    
        // console.log(completion.choices[0].message.content);
        const message = completion.choices[0].message
        message.timestamps = Date.now()
        data.messages.push(message)
        data.save()

        return NextResponse.json({ success: true, data: message }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}