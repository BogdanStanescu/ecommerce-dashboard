import Heading from "@/components/ui/header";
import { Separator } from "@/components/ui/separator";
import {
  getGraphRevenue,
  getSalesCount,
  getStockCount,
  getTotalRevenue,
} from "@/actions";
import { CreditCardIcon, DollarSign, LucideIcon, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Overview from "@/components/overview";

interface IDashboardPageProps {
  params: {
    storeId: string;
  };
}

const DashboardPage = async ({ params }: IDashboardPageProps) => {
  const [salesCount, stockCount, graphData, totalRevenue] = await Promise.all([
    getSalesCount(params.storeId),
    getStockCount(params.storeId),
    getGraphRevenue(params.storeId),
    getTotalRevenue(params.storeId),
  ]);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />

        <div className="grid gap-4 grid-cols-3">
          {/*Total Revenue Card*/}
          <CardItem
            title="Total Revenue"
            icon={DollarSign}
            value={`$${totalRevenue}`}
          />

          {/*Sales Card*/}
          <CardItem
            title="Sales"
            icon={CreditCardIcon}
            value={`+${salesCount}`}
          />

          {/*Products In Stock Card*/}
          <CardItem
            title="Products In Stock"
            icon={Package}
            value={`${stockCount}`}
          />
        </div>

        {/*Revenue Diagram*/}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>

          <CardContent className="pl-2">
            <Overview data={graphData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface ICardItemProps {
  title: string;
  icon: LucideIcon;
  value: string;
}

const CardItem = ({ title, icon, value }: ICardItemProps) => {
  const Icon = icon;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};

export default DashboardPage;
