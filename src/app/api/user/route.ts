import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { hash } from "bcrypt";
import {userSchema} from "@/lib/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, username } = userSchema.parse(body);
    const existingUserByEmail = await prismadb.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 },
      );
    }

    const existingUserByUsername = await prismadb.user.findUnique({
      where: { username: username },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 },
      );
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await prismadb.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
    const { password: userPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User created successfully" },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
