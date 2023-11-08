import prismaDB from "@/lib/prismaDB";

interface IDashboardPageProps {
  params: {
    storeId: string;
  };
}

const DashboardPage = async ({ params }: IDashboardPageProps) => {
  const store = await prismaDB.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return <div>Active Store: {store?.name}</div>;
};

export default DashboardPage;
