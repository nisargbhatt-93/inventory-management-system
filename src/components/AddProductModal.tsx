import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductAdded: (product: any) => void;
}

const AddProductModal = ({ open, onOpenChange, onProductAdded }: AddProductModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    quantity: "",
    minStock: "",
    price: "",
    supplier: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.sku || !formData.category || !formData.quantity || !formData.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      quantity: parseInt(formData.quantity),
      minStock: parseInt(formData.minStock) || 10,
      price: parseFloat(formData.price),
      supplier: formData.supplier || "Unknown",
      description: formData.description,
    };

    onProductAdded(newProduct);
    
    toast({
      title: "Success",
      description: "Product added successfully!",
    });

    // Reset form
    setFormData({
      name: "",
      sku: "",
      category: "",
      quantity: "",
      minStock: "",
      price: "",
      supplier: "",
      description: "",
    });
    
    onOpenChange(false);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Add a new product to your inventory system.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku">SKU *</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => updateField("sku", e.target.value)}
                placeholder="e.g., PRD-001"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => updateField("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Laptops">Laptops</SelectItem>
                  <SelectItem value="Smartphones">Smartphones</SelectItem>
                  <SelectItem value="Audio">Audio</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Gaming">Gaming</SelectItem>
                  <SelectItem value="Storage">Storage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier</Label>
              <Select value={formData.supplier} onValueChange={(value) => updateField("supplier", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="Apple Inc.">Apple Inc.</SelectItem>
                  <SelectItem value="Samsung Electronics">Samsung Electronics</SelectItem>
                  <SelectItem value="Dell Technologies">Dell Technologies</SelectItem>
                  <SelectItem value="Sony Corporation">Sony Corporation</SelectItem>
                  <SelectItem value="HP Inc.">HP Inc.</SelectItem>
                  <SelectItem value="Lenovo Group">Lenovo Group</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) => updateField("quantity", e.target.value)}
                placeholder="0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minStock">Min Stock</Label>
              <Input
                id="minStock"
                type="number"
                min="0"
                value={formData.minStock}
                onChange={(e) => updateField("minStock", e.target.value)}
                placeholder="10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => updateField("price", e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Product description (optional)"
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Add Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;