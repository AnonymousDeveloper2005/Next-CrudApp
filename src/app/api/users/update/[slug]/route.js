import { NextResponse } from "next/server";
import dbConnect from "@/utils/connectMongo";
import User from "@/models/user";

export async function PUT(req, { params }) {
  await dbConnect();

  const { slug } = params;

  try {
    const body = await req.json();

    const user = await User.findOneAndUpdate(
      { _id: slug },  // yoki { username: slug }, agar username ishlatilayotgan bo'lsa
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });

  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: "Email already exists" }, { status: 400 });
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return NextResponse.json({ success: false, error: messages }, { status: 400 });
    }

    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
