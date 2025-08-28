import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface AddSupplierModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSupplierAdded: (supplier: any) => void;
}

const AddSupplierModal = ({ open, onOpenChange, onSupplierAdded }: AddSupplierModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    contactPerson: "",
    taxNumber: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newSupplier = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      contactPerson: formData.contactPerson,
      taxNumber: formData.taxNumber,
      description: formData.description,
      products: 0,
      status: "Active",
      rating: 4.0,
    };

    onSupplierAdded(newSupplier);
    
    toast({
      title: "Success",
      description: "Supplier added successfully!",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      contactPerson: "",
      taxNumber: "",
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
          <DialogTitle>Add New Supplier</DialogTitle>
          <DialogDescription>
            Add a new supplier to your vendor network.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Enter company name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person</Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) => updateField("contactPerson", e.target.value)}
                placeholder="Contact person name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="contact@company.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="Complete address"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="taxNumber">GST/Tax Number</Label>
              <Input
                id="taxNumber"
                value={formData.taxNumber}
                onChange={(e) => updateField("taxNumber", e.target.value)}
                placeholder="GST Number"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Notes</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Additional notes about the supplier"
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Add Supplier
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSupplierModal;