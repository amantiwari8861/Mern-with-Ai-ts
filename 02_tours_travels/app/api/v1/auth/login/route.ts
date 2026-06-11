import { connectDB } from "@/backend/config/mongoose.config";
import UserModel from "@/backend/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    const userInDb = await UserModel.findOne({email});

    if (!userInDb) {
      return NextResponse.json(
        {
            message: "Account Does Not Exist!",
            status: false
        },
        {
            status: 404
        }
      );
    }

    if (userInDb.password !== password) {
      return NextResponse.json(
        {
            message: "Invalid credentials!",
            status: false
        },
        {
            status: 401
        }
      );
    }


    return NextResponse.json(
      {
        message: "User logged in successfully!",
        status: true,
        data: userInDb,
      },
      {
        status: 200,
      }
    );
  } 
  catch (error: any) {
    return NextResponse.json(
      {
        message: "Unable to login user!",
        status: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}