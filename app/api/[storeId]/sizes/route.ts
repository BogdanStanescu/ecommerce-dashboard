import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!body.name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!body.value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    const store = await prisma.store.findUnique({
      where: {
        id: params.storeId,
        user_id: userId,
      },
    });

    if (!store) {
      return new NextResponse("Store not found", { status: 404 });
    }

    const size = await prisma.size.create({
      data: {
        name: body.name,
        value: body.value,
        store_id: store.id,
      },
    });

    return new NextResponse(JSON.stringify(size));
  } catch (error) {
    console.error("[SIZES_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const sizes = await prisma.size.findMany({
      where: {
        store_id: params.storeId,
      },
    });

    return new NextResponse(JSON.stringify(sizes));
  } catch (error) {
    console.error("[SIZES_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
