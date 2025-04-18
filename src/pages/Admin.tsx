
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, ShoppingBag, Users, Shield } from "lucide-react";
import { AdminCharts } from "@/components/admin/AdminCharts";
import { UserAnalytics } from "@/components/admin/UserAnalytics";
import { ProductManagement } from "@/components/admin/ProductManagement";
import { AdminUsers } from "@/components/admin/AdminUsers";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export const Admin = () => {
  const { isAdmin, isLoading } = useAdminAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return null; // The useAdminAuth hook already handles redirection
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Панель администратора</h1>

        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Дашборд
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Товары
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Пользователи
            </TabsTrigger>
            <TabsTrigger value="admins" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Администраторы
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <div className="bg-card p-4 rounded-lg shadow mb-6">
              <h2 className="text-2xl font-semibold mb-4">Статистика магазина</h2>
              <AdminCharts />
            </div>
          </TabsContent>
          
          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>
          
          <TabsContent value="users">
            <div className="bg-card p-4 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Аналитика пользователей</h2>
              <UserAnalytics />
            </div>
          </TabsContent>
          
          <TabsContent value="admins">
            <AdminUsers />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
