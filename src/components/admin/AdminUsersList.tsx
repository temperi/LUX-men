
import { useState, useEffect } from "react";
import { AdminUser } from "@/types/admin.types";
import { fetchAdminUsers, removeAdminUser } from "@/services/adminService";
import { useToast } from "@/hooks/use-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export const AdminUsersList = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    setIsLoading(true);
    try {
      const adminUsers = await fetchAdminUsers();
      setAdmins(adminUsers);
    } catch (error: any) {
      console.error("Error loading admins:", error);
      toast({
        title: "Ошибка загрузки администраторов",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveAdmin = async (id: string, email: string) => {
    try {
      await removeAdminUser(id);
      toast({
        title: "Администратор удален",
        description: `Пользователь ${email} больше не администратор`,
      });
      loadAdmins();
    } catch (error: any) {
      console.error("Error removing admin:", error);
      toast({
        title: "Ошибка удаления администратора",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (admins.length === 0) {
    return <p>Нет администраторов</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead className="w-20">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {admins.map((admin) => (
          <TableRow key={admin.id}>
            <TableCell>{admin.email}</TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Удалить администратора?</DialogTitle>
                    <DialogDescription>
                      Вы уверены, что хотите удалить администратора {admin.email}?
                      Это действие нельзя отменить.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end gap-2 mt-4">
                    <DialogClose asChild>
                      <Button variant="outline">Отмена</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button 
                        variant="destructive" 
                        onClick={() => handleRemoveAdmin(admin.id, admin.email)}
                      >
                        Удалить
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
