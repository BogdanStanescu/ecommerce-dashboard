import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!body.name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const store = await prisma.store.create({
      data: {
        name: body.name,
        user_id: userId,
      },
    });

    return new NextResponse(JSON.stringify(store));
  } catch (error) {
    console.error("[STORES_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
