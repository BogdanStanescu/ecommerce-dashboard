import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
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

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const updatedStore = await prisma.store.update({
      where: {
        id: params.storeId,
        user_id: userId,
      },
      data: {
        name: body.name,
      },
    });

    return NextResponse.json(updatedStore);
  } catch (error) {
    console.error("[STORE_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const deletedStore = await prisma.store.delete({
      where: {
        id: params.storeId,
        user_id: userId,
      },
    });

    return NextResponse.json(deletedStore);
  } catch (error) {
    console.error("[STORE_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
