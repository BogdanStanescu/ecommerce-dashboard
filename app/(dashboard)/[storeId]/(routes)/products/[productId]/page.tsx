import prisma from "@/lib/prisma";
import React from "react";
import ProductForm from "./components/product-form";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prisma.category.findMany({
    where: {
      store_id: params.storeId,
    },
  });

  const sizes = await prisma.size.findMany({
    where: {
      store_id: params.storeId,
    },
  });

  const colors = await prisma.color.findMany({
    where: {
      store_id: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          colors={colors}
          sizes={sizes}
          product={product}
        />
      </div>
    </div>
  );
};

export default ProductPage;
