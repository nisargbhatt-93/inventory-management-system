import { useState } from "react";
import { Package, BarChart3, Users, Settings, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "suppliers", label: "Suppliers", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const NavItem = ({ item }: { item: typeof navItems[0] }) => (
    <button
      onClick={() => {
        onTabChange(item.id);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        activeTab === item.id
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-accent"
      }`}
    >
      <item.icon className="w-4 h-4" />
      <span>{item.label}</span>
    </button>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <Menu className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 h-screen bg-card border-r border-border fixed left-0 top-0">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <Package className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">InventoryPro</h1>
              <p className="text-xs text-muted-foreground">Management System</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="fixed left-0 top-0 w-64 h-full bg-card border-r border-border">
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-8">
                <Package className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-xl font-bold text-foreground">InventoryPro</h1>
                  <p className="text-xs text-muted-foreground">Management System</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <NavItem key={item.id} item={item} />
                ))}
              </nav>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Navigation;