import dbConn from "@/utils/dbConn";
import PostPage from "@/models/post";
import {NextResponse} from "next/server";
export const revalidate = 0;
export const GET = async (request) => { 
  
    try {
      await dbConn();
  
      const posts = await PostPage.find({});
      console.log("postdetails", posts)
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