
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

interface ProductStatistics {
  product_id: string;
  total_views: number;
  total_sales: number;
  revenue: number;
  product_name?: string;
}

interface UserStatistic {
  day: string;
  registrations: number;
}

interface SalesDistribution {
  name: string;
  value: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export const AdminCharts = () => {
  const [productStats, setProductStats] = useState<ProductStatistics[]>([]);
  const [userRegistrations, setUserRegistrations] = useState<UserStatistic[]>([]);
  const [salesDistribution, setSalesDistribution] = useState<SalesDistribution[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product statistics
        const { data: statsData, error: statsError } = await supabase
          .from('product_statistics')
          .select(`
            product_id,
            total_views,
            total_sales,
            revenue,
            products (
              name
            )
          `);
  
        if (statsError) throw statsError;
        
        // Generate user registration mock data
        const mockUserData = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          return {
            day: date.toLocaleDateString('ru-RU', { weekday: 'short' }),
            registrations: Math.floor(Math.random() * 20) + 1
          };
        }).reverse();
        
        // Mock sales distribution data
        const mockSalesDistribution = [
          { name: 'Футболки', value: 35 },
          { name: 'Рубашки', value: 25 },
          { name: 'Брюки', value: 20 },
          { name: 'Аксессуары', value: 10 },
          { name: 'Другое', value: 10 }
        ];
        
        setProductStats(statsData.map(stat => ({
          ...stat,
          product_name: stat.products?.name || 'Неизвестный товар'
        })));
        setUserRegistrations(mockUserData);
        setSalesDistribution(mockSalesDistribution);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="p-4">Загрузка данных...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
      <div className="bg-card rounded-lg p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-4">Статистика продаж по товарам</h3>
        <ChartContainer 
          config={{
            sales: { color: "#8884d8" },
            revenue: { color: "#82ca9d" }
          }}
          className="aspect-[4/3]"
        >
          <BarChart data={productStats} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="product_name" 
              angle={-45} 
              textAnchor="end" 
              height={70}
            />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend content={<ChartLegendContent />} />
            <Bar dataKey="total_sales" name="Продажи" fill="var(--color-sales)" />
            <Bar dataKey="revenue" name="Выручка" fill="var(--color-revenue)" />
          </BarChart>
        </ChartContainer>
      </div>

      <div className="bg-card rounded-lg p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-4">Регистрации пользователей</h3>
        <ChartContainer 
          config={{
            registrations: { color: "#ff7300" }
          }}
          className="aspect-[4/3]"
        >
          <LineChart data={userRegistrations} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend content={<ChartLegendContent />} />
            <Line 
              type="monotone" 
              dataKey="registrations" 
              name="Регистрации" 
              stroke="var(--color-registrations)" 
              activeDot={{ r: 8 }} 
            />
          </LineChart>
        </ChartContainer>
      </div>

      <div className="bg-card rounded-lg p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-4">Распределение продаж по категориям</h3>
        <ChartContainer 
          config={{}}
          className="aspect-[4/3]"
        >
          <PieChart>
            <Pie
              data={salesDistribution}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {salesDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ChartContainer>
      </div>

      <div className="bg-card rounded-lg p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-4">Просмотры товаров</h3>
        <ChartContainer 
          config={{
            views: { color: "#3F51B5" }
          }}
          className="aspect-[4/3]"
        >
          <BarChart data={productStats} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="product_name" 
              angle={-45} 
              textAnchor="end" 
              height={70}
            />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend content={<ChartLegendContent />} />
            <Bar dataKey="total_views" name="Просмотры" fill="var(--color-views)" />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};
