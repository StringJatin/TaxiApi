import dbConn from "@/utils/dbConn";
import CityData from "@/models/city";
import {NextResponse} from "next/server";
export const revalidate = 1;
export const GET = async (request) => { 
  
    try {
      await dbConn();
  
      const posts = await CityData.find({});
  
      return new NextResponse(JSON.stringify(posts), { status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
       });
    } catch (err) {
      return new NextResponse("Database Error", { status: 500 });
    }
  };