import dbConn from "@/utils/dbConn";
import RoutePage from "@/models/route";
import {NextResponse} from "next/server";
export const revalidate = 1;
export async function POST(req, res) {
    try {

        const body = await req.json();
        await dbConn();

        await RoutePage.create(body);

        return NextResponse.json({
            message:"route sent successfully!"
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

