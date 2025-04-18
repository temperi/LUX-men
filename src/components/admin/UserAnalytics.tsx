
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShoppingBag, UserCheck, Clock } from "lucide-react";

interface UserSummary {
  total_users: number;
  active_users: number;
  recent_registrations: number;
  cart_abandonment: number;
}

interface UserActivity {
  id: string;
  email: string;
  last_activity: string;
  total_orders: number;
  total_spent: number;
}

export const UserAnalytics = () => {
  const [userSummary, setUserSummary] = useState<UserSummary>({
    total_users: 0,
    active_users: 0,
    recent_registrations: 0,
    cart_abandonment: 0
  });
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get total number of users
        const { count: totalUsers } = await supabase
          .from('profiles')
          .select('id', { count: 'exact', head: true });
          
        // For demo purposes, we'll use mock data
        // In a real app, you would query real data from your database
        
        setUserSummary({
          total_users: totalUsers || 0,
          active_users: Math.floor((totalUsers || 0) * 0.8), // 80% of total
          recent_registrations: Math.floor((totalUsers || 0) * 0.2), // 20% of total
          cart_abandonment: 35 // percentage
        });
        
        // Mock user activity data
        const mockUserActivities = [
          {
            id: "1",
            email: "user@example.com",
            last_activity: "2 hours ago",
            total_orders: 3,
            total_spent: 15000
          },
          {
            id: "2",
            email: "admin@example.com",
            last_activity: "5 minutes ago",
            total_orders: 1,
            total_spent: 5000
          },
          {
            id: "3",
            email: "test@example.com",
            last_activity: "1 day ago",
            total_orders: 2,
            total_spent: 8500
          }
        ];
        
        setUserActivities(mockUserActivities);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  if (isLoading) {
    return <div className="p-4">Loading user data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userSummary.total_users}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userSummary.active_users}</div>
            <p className="text-xs text-muted-foreground">Active within a month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Registrations</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userSummary.recent_registrations}</div>
            <p className="text-xs text-muted-foreground">In the last 7 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cart Abandonment</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userSummary.cart_abandonment}%</div>
            <p className="text-xs text-muted-foreground">Abandonment rate</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-card rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">User Activity</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userActivities.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {user.last_activity}
                </TableCell>
                <TableCell>{user.total_orders}</TableCell>
                <TableCell>{user.total_spent.toLocaleString()} ₽</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
