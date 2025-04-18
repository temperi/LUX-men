
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, ShoppingBag, Users, Shield, BarChart3, ShoppingCart } from "lucide-react";
import { AdminCharts } from "@/components/admin/AdminCharts";
import { UserAnalytics } from "@/components/admin/UserAnalytics";
import { ProductManagement } from "@/components/admin/ProductManagement";
import { AdminUsers } from "@/components/admin/AdminUsers";
import { OrderManagement } from "@/components/admin/OrderManagement";
import { StoreOverview } from "@/components/admin/StoreOverview";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const AdminDashboard = () => {
  const { isAdmin, isLoading } = useAdminAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/20"></div>
          <div className="h-4 w-32 rounded bg-primary/20"></div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // The useAdminAuth hook already handles redirection
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col bg-card border-r p-4 h-[calc(100vh-64px)] sticky top-16">
          <h2 className="text-xl font-bold mb-6">Админ панель</h2>
          <nav className="space-y-1">
            <Button 
              variant={activeTab === "dashboard" ? "default" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveTab("dashboard")}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Обзор
            </Button>
            <Button 
              variant={activeTab === "products" ? "default" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveTab("products")}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Товары
            </Button>
            <Button 
              variant={activeTab === "orders" ? "default" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveTab("orders")}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Заказы
            </Button>
            <Button 
              variant={activeTab === "sales" ? "default" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveTab("sales")}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Продажи
            </Button>
            <Button 
              variant={activeTab === "users" ? "default" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveTab("users")}
            >
              <Users className="mr-2 h-4 w-4" />
              Пользователи
            </Button>
            <Button 
              variant={activeTab === "admins" ? "default" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveTab("admins")}
            >
              <Shield className="mr-2 h-4 w-4" />
              Администраторы
            </Button>
          </nav>
          
          <div className="mt-auto">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate('/')}
            >
              Вернуться на сайт
            </Button>
          </div>
        </div>
        
        {/* Mobile tabs for smaller screens */}
        <div className="md:hidden w-full">
          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Обзор
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Товары
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Заказы
              </TabsTrigger>
              <TabsTrigger value="sales" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Продажи
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Пользователи
              </TabsTrigger>
              <TabsTrigger value="admins" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Админы
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Обзор магазина</h1>
              <StoreOverview />
              <AdminCharts />
            </div>
          )}
          
          {activeTab === "products" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Управление товарами</h1>
              <ProductManagement />
            </div>
          )}
          
          {activeTab === "orders" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Управление заказами</h1>
              <OrderManagement />
            </div>
          )}
          
          {activeTab === "sales" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Аналитика продаж</h1>
              <AdminCharts />
            </div>
          )}
          
          {activeTab === "users" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Аналитика пользователей</h1>
              <UserAnalytics />
            </div>
          )}
          
          {activeTab === "admins" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Управление администраторами</h1>
              <AdminUsers />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
