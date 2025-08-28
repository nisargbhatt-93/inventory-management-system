import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Search, Plus, AlertTriangle } from "lucide-react";
import AddProductModal from "./AddProductModal";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  minStock: number;
  price: number;
  supplier: string;
}

const ProductTable = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "MacBook Pro 16-inch",
      sku: "MBP-16-001",
      category: "Laptops",
      quantity: 25,
      minStock: 10,
      price: 199999.99,
      supplier: "Apple Inc."
    },
    {
      id: "2",
      name: "iPhone 15 Pro",
      sku: "IPH-15P-001",
      category: "Smartphones",
      quantity: 8,
      minStock: 15,
      price: 79999.99,
      supplier: "Apple Inc."
    },
    {
      id: "3",
      name: "Samsung Galaxy S24",
      sku: "SAM-S24-001",
      category: "Smartphones",
      quantity: 45,
      minStock: 20,
      price: 74999.99,
      supplier: "Samsung Electronics"
    },
    {
      id: "4",
      name: "Dell XPS 13",
      sku: "DEL-XPS13-001",
      category: "Laptops",
      quantity: 0,
      minStock: 5,
      price: 109999.99,
      supplier: "Dell Technologies"
    },
    {
      id: "5",
      name: "Sony WH-1000XM5",
      sku: "SNY-WH1000-001",
      category: "Audio",
      quantity: 67,
      minStock: 25,
      price: 29999.99,
      supplier: "Sony Corporation"
    }
  ]);

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [...prev, newProduct]);
  };

  const handleEditProduct = (productId: string) => {
    toast({
      title: "Edit Product",
      description: "Edit functionality will be implemented soon.",
    });
  };

  const getStockStatus = (quantity: number, minStock: number) => {
    if (quantity === 0) return { status: "Out of Stock", color: "bg-stock-out" };
    if (quantity <= minStock * 0.5) return { status: "Critical", color: "bg-stock-low" };
    if (quantity <= minStock) return { status: "Low Stock", color: "bg-stock-medium" };
    return { status: "In Stock", color: "bg-stock-high" };
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockCount = products.filter(p => p.quantity <= p.minStock && p.quantity > 0).length;
  const outOfStockCount = products.filter(p => p.quantity === 0).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Inventory</h2>
          <p className="text-muted-foreground">
            Manage your product inventory and stock levels
          </p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {(lowStockCount > 0 || outOfStockCount > 0) && (
        <Card className="border-warning/50 bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center text-warning">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Stock Alerts
            </CardTitle>
            <CardDescription>
              {lowStockCount > 0 && `${lowStockCount} items are running low on stock. `}
              {outOfStockCount > 0 && `${outOfStockCount} items are out of stock.`}
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products, SKU, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product.quantity, product.minStock);
                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{product.quantity}</span>
                        <span className="text-xs text-muted-foreground">
                          (min: {product.minStock})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`${stockStatus.color} text-white border-0`}
                      >
                        {stockStatus.status}
                      </Badge>
                    </TableCell>
                    <TableCell>₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell className="text-muted-foreground">{product.supplier}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditProduct(product.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddProductModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onProductAdded={handleAddProduct}
      />
    </div>
  );
};

export default ProductTable;