
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import Collections from "./pages/Collections";
import ResetPassword from "./pages/ResetPassword";
import Reviews from "./pages/Reviews";

// Создаем клиент для React Query
const queryClient = new QueryClient();

// Используем HashRouter для совместимости с GitHub Pages
const App = () => {
  console.log("Рендеринг главного компонента App");
  
  return (
    <QueryClientProvider client={queryClient}>
      {/* Fixing the TooltipProvider by wrapping it correctly */}
      <HashRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/category/:type" element={<Category />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
        </TooltipProvider>
      </HashRouter>
    </QueryClientProvider>
  );
};

export default App;
