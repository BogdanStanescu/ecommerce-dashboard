import React from "react";
import prisma from "@/lib/prisma";
import { OrdersColumn } from "./components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import OrderClient from "./components/client";

const Orders = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  const orders = await prisma.order.findMany({
    where: {
      store_id: params.storeId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  const formattedOrders: OrdersColumn[] = orders.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    products: order.items.map((item) => item.product.name).join(", "),
    totalPrice: formatter.format(
      order.items.reduce((total, item) => total + item.product.price, 0)
    ),
    createdAt: format(order.created_at, "MMMM do, yyyy"),
    isPaid: order.is_paid,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default Orders;
