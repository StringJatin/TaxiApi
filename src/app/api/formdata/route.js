import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import initMiddleware from '@/utils/init-middleware';
import dbConn from "@/utils/dbConn";
import FormData from "@/models/form";
import {NextResponse} from "next/server";
export const revalidate = 1;
// export async function POST(req, res) {


//     try {

//         const body = await req.json();
//         await dbConn();

//         await FormData.create(body);

//         return NextResponse.json({
//             message:"Message sent successfully!"
//         }, {
//             status: 200,
//             headers: {
//                 'Access-Control-Allow-Origin': '*',
//                 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//                 'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//               },
//         })

//     }catch (e) {
//         return NextResponse.json(
//             { message: "Server error, please try again!" },
//             { status: 500 }
//         )
//     }
// }
const cors = initMiddleware(
    Cors({
      methods: ['POST', 'OPTIONS'], // Allow POST and OPTIONS methods
      origin: 'https://your-allowed-origin.com', // Replace with your allowed origin
      optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
    })
  );
  
  export default async function handler(req, res) {
    // Apply the CORS middleware for both POST and OPTIONS requests
    await cors(req, res);
  
    if (req.method === 'OPTIONS') {
      // Handle preflight (OPTIONS) request for CORS
      return res.status(204).end();
    }
  
    try {
      const body = JSON.parse(req.body); // Parse the request body if needed
      await dbConn();
  
      const result = await FormData.create(body);
  
      return res.status(200).json({
        message: 'Blog sent successfully!',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Server error, please try again!',
      });
    }
  }
export const GET = async (Request) => {
   
    try {
        await dbConn();
        const data = await FormData.find();
        console.log("Data fetched successfully:", data);
        return new NextResponse(JSON.stringify(data), { status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
              },
             });
    } catch (err) {
      

        console.error("Error fetching data:", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

