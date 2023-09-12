import dbConn from "@/utils/dbConn";
import CityData from "@/models/city";
import {NextResponse} from "next/server";
export const revalidate = 1;
export async function POST(req, res) {
    try {

        const body = await req.json();
        await dbConn();

        await CityData.create(body);

        return NextResponse.json({
            message:"route sent successfully!"
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

