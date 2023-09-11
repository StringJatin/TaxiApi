import dbConn from "@/utils/dbConn";
import PostPage from "@/models/post"
import {NextResponse} from "next/server";

export async function POST(req, res) {
    try {

        const body = await req.json();
        await dbConn();

       const res = await PostPage.create(body);
        console.log("ccccc", res)
        return NextResponse.json({
            message:"blog sent successfully!"
        }, {
            status: 200
        })

    }catch (e) {
        return NextResponse.json(
            { message: "Server error, please try again!" },
            { status: 500 }
        )
    }
}

