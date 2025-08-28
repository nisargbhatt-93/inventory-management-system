import { useState } from "react";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import ProductTable from "@/components/ProductTable";
import Suppliers from "@/components/Suppliers";
import Settings from "@/components/Settings";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "inventory":
        return <ProductTable />;
      case "suppliers":
        return <Suppliers />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="lg:ml-64 p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
