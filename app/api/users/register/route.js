import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, email, image, provider } = await req.json();
  await connectDB();
  const userExists = await User.findOne({ email: email})


  if(!userExists) {
    await User.create({
        name,
        email,
        image,
        provider,
      });
    
      return new NextResponse({
        message: 'User created successfully',
        status: 201
      })
  }
  else{
    console.log("User already exists... ")
  }
}
