import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type Body = {
  name: string;
  price: string;
  categoryId: string;
  colorId: string;
  sizeId: string;
  images: string[];
  isFeatured: boolean;
  isArchived: boolean;
};

export async function GET(
  _req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    const body: Body = await req.json();

    Object.entries(body).forEach(([key, value]) => {
      if (key === "isFeatured" || key === "isArchived") return;

      if (!value) {
        return new NextResponse(`${key} is required`, { status: 400 });
      }
    });

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
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

    const product = await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name: body.name,
        price: parseInt(body.price),
        category_id: body.categoryId,
        color_id: body.colorId,
        size_id: body.sizeId,
        is_featured: body.isFeatured,
        is_archived: body.isArchived,
        images: {
          deleteMany: {},
          createMany: {
            // @ts-ignore
            data: [...body.images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse("Product ID is required", { status: 400 });
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

    const product = await prisma.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
