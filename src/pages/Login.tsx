
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { checkIsAdmin } from "@/services/adminService";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email({
    message: "Введите корректный email адрес",
  }),
  password: z.string().min(6, {
    message: "Пароль должен содержать минимум 6 символов",
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      console.log("Attempting login with:", values.email);
      // First login the user
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        console.error("Login error:", error);
        throw error;
      }

      if (!data.user) {
        throw new Error("Ошибка аутентификации");
      }

      console.log("Login successful, checking admin status");
      // Check if user is admin
      const isAdmin = await checkIsAdmin(data.user.id);
      console.log("Is admin:", isAdmin);

      if (isAdmin) {
        toast({
          title: "Вход выполнен",
          description: "Добро пожаловать, администратор!",
        });
        navigate('/admin');
      } else {
        toast({
          title: "Вход выполнен",
          description: "Добро пожаловать!",
        });
        navigate('/');
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Ошибка входа",
        description: error.message || "Не удалось выполнить вход",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    const email = form.getValues("email");
    
    if (!email) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Введите email для сброса пароля",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/#/reset-password',
      });
      
      if (error) throw error;
      
      toast({
        title: "Ссылка для сброса пароля отправлена",
        description: "Проверьте вашу почту",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Не удалось отправить ссылку для сброса пароля",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-md mx-auto bg-[#403E43]/50 p-8 rounded-lg backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-center mb-6">Вход в систему</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="example@mail.com" 
                          className="pl-10" 
                          {...field} 
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input 
                          type="password" 
                          className="pl-10" 
                          {...field} 
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Вход..." : "Войти"}
              </Button>
            </form>
          </Form>
          
          <div className="mt-4">
            <Button 
              variant="link" 
              className="text-sm text-primary p-0 h-auto" 
              onClick={handleResetPassword}
              disabled={isLoading}
            >
              Забыли пароль?
            </Button>
          </div>
          
          <p className="text-center mt-4 text-sm text-muted-foreground">
            Нет аккаунта?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Регистрация
            </Link>
          </p>
          <div className="flex justify-center mt-4">
            <Link to="/" className="text-muted-foreground hover:text-white flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
