import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Plus } from "lucide-react";
import AddSupplierModal from "./AddSupplierModal";
import { useToast } from "@/hooks/use-toast";

const Suppliers = () => {
  const { toast } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([
    {
      id: "1",
      name: "Apple Inc.",
      email: "orders@apple.com",
      phone: "+91-80-6749-2323",
      address: "Concorde Tower, UB City Mall, Vittal Mallya Road, Bangalore",
      products: 45,
      status: "Active",
      rating: 4.9
    },
    {
      id: "2",
      name: "Samsung Electronics",
      email: "b2b@samsung.com",
      phone: "+91-124-479-2200",
      address: "Samsung Plaza, Central Expressway, Sector 19, Gurugram",
      products: 32,
      status: "Active",
      rating: 4.7
    },
    {
      id: "3",
      name: "Dell Technologies",
      email: "sales@dell.com",
      phone: "+91-80-6749-2335",
      address: "Bagmane World Technology Center, Marathahalli, Bangalore",
      products: 28,
      status: "Active",
      rating: 4.5
    },
    {
      id: "4",
      name: "Sony Corporation",
      email: "business@sony.com",
      phone: "+91-22-6777-7777",
      address: "Interface Building, Malad Link Road, Malad West, Mumbai",
      products: 15,
      status: "Pending",
      rating: 4.6
    }
  ]);

  const handleAddSupplier = (newSupplier: any) => {
    setSuppliers(prev => [...prev, newSupplier]);
  };

  const handleViewDetails = (supplierId: string) => {
    toast({
      title: "Supplier Details",
      description: "Detailed view will be implemented soon.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Suppliers</h2>
          <p className="text-muted-foreground">
            Manage your supplier relationships and contacts
          </p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Supplier
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {suppliers.map((supplier) => (
          <Card key={supplier.id} className="transition-all hover:shadow-md">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{supplier.name}</CardTitle>
                  <CardDescription>{supplier.products} products</CardDescription>
                </div>
                <Badge
                  variant={supplier.status === "Active" ? "default" : "secondary"}
                  className={supplier.status === "Active" ? "bg-success" : ""}
                >
                  {supplier.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{supplier.email}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{supplier.phone}</span>
              </div>
              
              <div className="flex items-start space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">{supplier.address}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium">Rating:</span>
                  <div className="flex items-center">
                    <span className="text-sm font-bold text-warning">{supplier.rating}</span>
                    <span className="text-xs text-muted-foreground ml-1">/ 5.0</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewDetails(supplier.id)}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddSupplierModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSupplierAdded={handleAddSupplier}
      />
    </div>
  );
};

export default Suppliers;