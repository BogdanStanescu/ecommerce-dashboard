import prisma from "@/lib/prisma";

interface IDashboardPageProps {
  params: {
    storeId: string;
  };
}

const DashboardPage = async ({ params }: IDashboardPageProps) => {
  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return <div className="p-4">Active Store: {store?.name}</div>;
};

export default DashboardPage;
