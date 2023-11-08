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

    const updatedStore = await prismaDB.store.update({
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
