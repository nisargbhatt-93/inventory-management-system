import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, TrendingUp, AlertTriangle, Users } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Products",
      value: "1,234",
      change: "+12.5%",
      icon: Package,
      positive: true,
    },
    {
      title: "Low Stock Items",
      value: "23",
      change: "-8.2%",
      icon: AlertTriangle,
      positive: false,
    },
    {
      title: "Total Value",
      value: "₹20,45,890",
      change: "+18.7%",
      icon: TrendingUp,
      positive: true,
    },
    {
      title: "Suppliers",
      value: "67",
      change: "+2.1%",
      icon: Users,
      positive: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your inventory management system
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Badge
                  variant={stat.positive ? "default" : "destructive"}
                  className="px-1.5 py-0.5"
                >
                  {stat.change}
                </Badge>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest inventory movements and updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Stock updated for "MacBook Pro 16-inch"
                </p>
                <p className="text-xs text-muted-foreground">
                  2 minutes ago
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Low stock alert for "iPhone 15 Pro"
                </p>
                <p className="text-xs text-muted-foreground">
                  5 minutes ago
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-info rounded-full"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  New product added: "Samsung Galaxy S24"
                </p>
                <p className="text-xs text-muted-foreground">
                  15 minutes ago
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Stock Status</CardTitle>
            <CardDescription>
              Current inventory distribution
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-stock-high rounded-full"></div>
                <span className="text-sm">In Stock</span>
              </div>
              <span className="text-sm font-medium">1,125</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-stock-medium rounded-full"></div>
                <span className="text-sm">Low Stock</span>
              </div>
              <span className="text-sm font-medium">86</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-stock-low rounded-full"></div>
                <span className="text-sm">Critical</span>
              </div>
              <span className="text-sm font-medium">23</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-stock-out rounded-full"></div>
                <span className="text-sm">Out of Stock</span>
              </div>
              <span className="text-sm font-medium">0</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;