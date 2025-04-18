import { supabase } from "@/integrations/supabase/client";
import { AdminUser, AdminData } from "@/types/admin.types";

// Define a type for the user object returned by Supabase
interface SupabaseUser {
  id: string;
  email: string | null;
}

export async function fetchAdminUsers(): Promise<AdminUser[]> {
  try {
    // First get admin IDs
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('id');
    
    if (adminError) throw adminError;
    
    if (adminData && adminData.length > 0) {
      // Then fetch user emails from auth
      const { data: usersData, error: userError } = await supabase.auth.admin.listUsers();
      
      if (userError) throw userError;
      
      // Map admin IDs to emails
      const adminUsers: AdminUser[] = [];
      
      // Make sure we have users data before processing
      if (usersData && usersData.users) {
        const users = usersData.users as SupabaseUser[];
        
        for (const admin of adminData as AdminData[]) {
          const user = users.find(u => u.id === admin.id);
          if (user) {
            adminUsers.push({
              id: admin.id,
              email: user.email || 'Неизвестный пользователь'
            });
          }
        }
      }
      
      return adminUsers;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching admins:", error);
    throw error;
  }
}

export async function checkIsAdmin(userId: string): Promise<boolean> {
  if (!userId) {
    console.log("No userId provided to checkIsAdmin");
    return false;
  }
  
  try {
    console.log(`Checking admin status for userId: ${userId}`);
    
    // First, try direct count method
    const { count, error: countError } = await supabase
      .from('admin_users')
      .select('*', { count: 'exact', head: true })
      .eq('id', userId);
    
    if (countError) {
      console.error("Admin check error (count method):", countError);
    } else {
      console.log(`Admin count result for ${userId}: ${count}`);
      if (count && count > 0) return true;
    }
    
    // Fallback to data retrieval method
    const { data, error } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error("Admin check error (data method):", error);
      return false;
    }
    
    console.log(`Admin data result for ${userId}:`, data);
    return !!data;
  } catch (error) {
    console.error("Unexpected error checking admin status:", error);
    return false;
  }
}

export async function addAdminByEmail(email: string): Promise<void> {
  try {
    // First, find the user with the provided email
    const { data: usersData, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) throw userError;
    
    if (!usersData || !usersData.users) {
      throw new Error("Не удалось получить список пользователей");
    }
    
    const users = usersData.users as SupabaseUser[];
    const user = users.find(u => u.email === email.trim());
    
    if (!user) {
      throw new Error("Пользователь с таким email не существует");
    }

    // Check if user is already an admin
    const { data: existingAdmin, error: existingError } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .single();
    
    if (existingAdmin) {
      throw new Error("Этот пользователь уже имеет права администратора");
    }

    // Add user to admin_users table
    const { error: insertError } = await supabase
      .from('admin_users')
      .insert({ id: user.id });
    
    if (insertError) throw insertError;
  } catch (error: any) {
    console.error("Error adding admin:", error);
    throw error;
  }
}

export async function addAdminUser(email: string): Promise<void> {
  return addAdminByEmail(email);
}

export async function removeAdminUser(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('admin_users')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error("Error deleting admin:", error);
      throw error;
    }
  } catch (error) {
    throw error;
  }
}
