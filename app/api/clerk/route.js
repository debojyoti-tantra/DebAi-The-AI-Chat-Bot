import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "@/models/userModel";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    const wh = new Webhook(process.env.SIGNING_SECRET);
    const headerPayload = await headers()
    const svixHeaders = {
        "svix-id": headerPayload.get("svix-id"),
        "svix-timestamp": headerPayload.get("svix-timestamp"),
        "svix-signature": headerPayload.get("svix-signature")
    }

    // get the payload and verify it
    const payload = await req.json();
    const body = JSON.stringify(payload);
    const { data, type } = wh.verify(body, svixHeaders);

    // prepare the userdata to be saved in the database
    const userData = {
        clerkId: data.id,
        fullName: `${data.first_name} ${data.last_name}`,
        email: data.email_addresses[0].email_address,
        imageUrl: data.image_url
    }

    await connectDB();

    switch (type) {
        case 'user.created':
            await User.create(userData);
            break;
        
        case 'user.updated':
            await User.findOneAndUpdate({clerkId: data.id}, userData);
            break;

        case 'user.deleted':
            await User.findOneAndDelete({clerkId: data.id});
            break;
    
        default:
            break;
    }

    return NextResponse.json({message: 'Event received'});
}
