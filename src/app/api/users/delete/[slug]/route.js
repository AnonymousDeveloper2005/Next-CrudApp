import dbConnect from "@/utils/connectMongo";
import User from "@/models/user";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const { slug } = params;

        // Ensure the slug is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(slug)) {
            return NextResponse.json({ success: false, error: "Invalid user ID" }, { status: 400 });
        }

        const response = await User.findByIdAndDelete(slug);
        if (!response) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
