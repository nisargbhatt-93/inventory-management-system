import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Save, Bell, Shield, Database, Globe, Moon, Sun } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // General Settings
    companyName: "InventoryPro Solutions",
    currency: "INR",
    timezone: "Asia/Kolkata",
    language: "en",
    
    // Notifications
    lowStockAlerts: true,
    emailNotifications: true,
    smsNotifications: false,
    reorderReminders: true,
    
    // Security
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
    
    // Inventory
    autoReorder: false,
    reorderThreshold: "10",
    defaultSupplier: "",
    stockValuation: "FIFO",
    
    // Display
    darkMode: false,
    itemsPerPage: "25",
    showOutOfStock: true,
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Settings</h2>
        <p className="text-muted-foreground">
          Configure your inventory management system preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Company Information
              </CardTitle>
              <CardDescription>
                Basic company and system settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={settings.companyName}
                    onChange={(e) => updateSetting("companyName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={settings.currency} onValueChange={(value) => updateSetting("currency", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="GBP">British Pound (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => updateSetting("timezone", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                      <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                      <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Display Preferences</h4>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Dark Mode</Label>
                    <div className="text-sm text-muted-foreground">
                      Toggle between light and dark themes
                    </div>
                  </div>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(checked) => updateSetting("darkMode", checked)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="itemsPerPage">Items per page</Label>
                    <Select value={settings.itemsPerPage} onValueChange={(value) => updateSetting("itemsPerPage", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Show Out of Stock</Label>
                      <div className="text-sm text-muted-foreground">
                        Display items with zero stock
                      </div>
                    </div>
                    <Switch
                      checked={settings.showOutOfStock}
                      onCheckedChange={(checked) => updateSetting("showOutOfStock", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure how you receive alerts and notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Low Stock Alerts</Label>
                    <div className="text-sm text-muted-foreground">
                      Get notified when items reach minimum stock level
                    </div>
                  </div>
                  <Switch
                    checked={settings.lowStockAlerts}
                    onCheckedChange={(checked) => updateSetting("lowStockAlerts", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <div className="text-sm text-muted-foreground">
                      Receive alerts via email
                    </div>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">SMS Notifications</Label>
                    <div className="text-sm text-muted-foreground">
                      Receive critical alerts via SMS
                    </div>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => updateSetting("smsNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Reorder Reminders</Label>
                    <div className="text-sm text-muted-foreground">
                      Get reminded to reorder products
                    </div>
                  </div>
                  <Switch
                    checked={settings.reorderReminders}
                    onCheckedChange={(checked) => updateSetting("reorderReminders", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage security and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Two-Factor Authentication</Label>
                  <div className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </div>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => updateSetting("twoFactorAuth", checked)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => updateSetting("sessionTimeout", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                  <Input
                    id="passwordExpiry"
                    type="number"
                    value={settings.passwordExpiry}
                    onChange={(e) => updateSetting("passwordExpiry", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Inventory Management
              </CardTitle>
              <CardDescription>
                Configure inventory tracking and management rules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto Reorder</Label>
                  <div className="text-sm text-muted-foreground">
                    Automatically create purchase orders when stock is low
                  </div>
                </div>
                <Switch
                  checked={settings.autoReorder}
                  onCheckedChange={(checked) => updateSetting("autoReorder", checked)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reorderThreshold">Default Reorder Threshold (%)</Label>
                  <Input
                    id="reorderThreshold"
                    type="number"
                    value={settings.reorderThreshold}
                    onChange={(e) => updateSetting("reorderThreshold", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stockValuation">Stock Valuation Method</Label>
                  <Select value={settings.stockValuation} onValueChange={(value) => updateSetting("stockValuation", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="FIFO">FIFO (First In, First Out)</SelectItem>
                      <SelectItem value="LIFO">LIFO (Last In, First Out)</SelectItem>
                      <SelectItem value="WAC">WAC (Weighted Average Cost)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;