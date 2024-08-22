import dbConnect from "@/utils/connectMongo";
import { NextResponse } from "next/server";
import User from "@/models/user";

// function for getbyid
export async function GET(req, { params }) {
    try {
        // Ensure database connection is established
        await dbConnect();
        // Extract slug from params
        const { slug } = params;
        console.log("Slug:", slug);  // Logging slug

        // Fetch user by ID
        const user = await User.findOne({ _id: slug });
        if (!user) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: user }, { status: 200 });

    } catch (error) {
        console.error("Error occurred:", error);  // Log error details
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
