
import { useState } from "react";
import { addAdminUser } from "@/services/adminService";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield } from "lucide-react";

interface AddAdminFormProps {
  onAdminAdded: () => void;
}

export const AddAdminForm = ({ onAdminAdded }: AddAdminFormProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAddAdmin = async () => {
    if (!email.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите email пользователя",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await addAdminUser(email);
      
      toast({
        title: "Администратор добавлен",
        description: `Пользователь ${email} добавлен как администратор`,
      });
      
      setEmail("");
      onAdminAdded();
    } catch (error: any) {
      console.error("Error adding admin:", error);
      toast({
        title: "Ошибка добавления администратора",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSpecificAdmin = async () => {
    setIsLoading(true);
    try {
      const specificEmail = "temperyuri@gmail.com";
      await addAdminUser(specificEmail);
      
      toast({
        title: "Администратор добавлен",
        description: `Пользователь ${specificEmail} добавлен как администратор`,
      });
      
      onAdminAdded();
    } catch (error: any) {
      console.error("Error adding specific admin:", error);
      toast({
        title: "Ошибка добавления администратора",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Добавить администратора</h3>
      <div className="flex gap-2">
        <Input 
          type="email" 
          placeholder="Email пользователя" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleAddAdmin} disabled={isLoading}>
          {isLoading ? "Добавление..." : "Добавить"}
        </Button>
      </div>
      <div className="mt-4">
        <Button 
          onClick={handleAddSpecificAdmin} 
          variant="outline" 
          disabled={isLoading}
          className="w-full flex items-center gap-2"
        >
          <Shield className="h-4 w-4" />
          Добавить temperyuri@gmail.com как админа
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        Пользователь должен быть зарегистрирован в системе
      </p>
    </div>
  );
};
