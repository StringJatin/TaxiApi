import dbConn from "@/utils/dbConn";
import PostPage from "@/models/post"
import {NextResponse} from "next/server";
import cors from "cors";
export const revalidate = 1;

export async function POST(req, res) {
    try {

        const body = await req.json();
        await dbConn();

       const res = await PostPage.create(body);
        return NextResponse.json({
            message:"blog sent successfully!"
        }, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
              },
        })

    }catch (e) {
        return NextResponse.json(
            { message: "Server error, please try again!" },
            { status: 500 }
        )
    }
}

