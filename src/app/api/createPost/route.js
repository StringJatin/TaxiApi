// import dbConn from "@/utils/dbConn";
// import PostPage from "@/models/post"
// import {NextResponse} from "next/server";
// import cors from "cors";
// export const revalidate = 1;

// export async function POST(req, res) {
//     try {

//         const body = await req.json();
//         await dbConn();

//        const res = await PostPage.create(body);
//         return NextResponse.json({
//             message:"blog sent successfully!"
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

import dbConn from "@/utils/dbConn";
import PostPage from "@/models/post";
import { NextResponse } from "next/server";
import Cors from "cors";
import initMiddleware from "@/utils/init-middleware";

export const revalidate = 1;

// Initialize the cors middleware
const corsMiddleware = initMiddleware(
  Cors({
    // Specify allowed origins or use '*' for any origin
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

export default async function handler(req, res) {
  // Apply the cors middleware to your route
  await corsMiddleware(req, res);

  try {
    const body = await req.json();
    await dbConn();

    // Use a different variable name for the result
    const result = await PostPage.create(body);

    return res.status(200).json({
      message: "Blog sent successfully!",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Server error, please try again!",
    });
  }
}
