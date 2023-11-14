"use client";

import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/header";
import { Separator } from "@/components/ui/separator";
import { OrdersColumn, columns } from "./columns";

interface IOrderClient {
  data: OrdersColumn[];
}

const OrderClient = ({ data }: IOrderClient) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
};

export default OrderClient;
