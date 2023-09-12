import dbConn from "@/utils/dbConn";
import CityData from "@/models/city";
import {NextResponse} from "next/server";
export const revalidate = 1;
export async function POST(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://patna-taxi-service.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

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

