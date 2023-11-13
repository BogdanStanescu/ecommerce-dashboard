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

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
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

    const product = await prisma.product.create({
      data: {
        name: body.name,
        price: parseInt(body.price),
        category_id: body.categoryId,
        color_id: body.colorId,
        size_id: body.sizeId,
        is_featured: body.isFeatured,
        is_archived: body.isArchived,
        store_id: params.storeId,
        images: {
          createMany: {
            data: [
              ...body.images.map((image) => ({
                url: image,
              })),
            ],
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(product));
  } catch (error) {
    console.error("[PRODUCTS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const products = await prisma.product.findMany({
      where: {
        store_id: params.storeId,
        category_id: categoryId,
        color_id: colorId,
        size_id: sizeId,
        is_featured: isFeatured ? true : undefined,
        is_archived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return new NextResponse(JSON.stringify(products));
  } catch (error) {
    console.error("[PRODUCTS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
