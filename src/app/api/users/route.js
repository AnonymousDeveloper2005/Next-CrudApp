// src/app/api/users/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/utils/connectMongo";
import User from "@/models/user";

export async function GET() {
  await dbConnect();
  try {
    const users = await User.find({});
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const user = await User.create(body);
    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      // Custom error message for duplicate email
      return NextResponse.json(
        { success: false, error: "Email already exists" },
        { status: 400 }
      );
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return NextResponse.json(
        { success: false, error: messages },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
// update with slug_id


// get with slug_id
