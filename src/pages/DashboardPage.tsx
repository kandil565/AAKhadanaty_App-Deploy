import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { CalendarCheck, DollarSign, Star, TrendingUp, BookOpen, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBookings } from "@/contexts/BookingContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice, statusLabels } from "@/data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Navigate } from "react-router-dom";

const DashboardPage = () => {
  const { isAuthenticated } = useAuth();
  const { bookings } = useBookings();

  if (!isAuthenticated) return <Navigate to="/login" />;

  const totalRevenue = bookings.filter((b) => b.status === "completed").reduce((s, b) => s + b.price, 0);
  const totalBookings = bookings.length;
  const completedBookings = bookings.filter((b) => b.status === "completed").length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;

  const statusData = [
    { name: statusLabels.pending, value: bookings.filter((b) => b.status === "pending").length, color: "hsl(38, 92%, 50%)" },
    { name: statusLabels.confirmed, value: bookings.filter((b) => b.status === "confirmed").length, color: "hsl(213, 80%, 50%)" },
    { name: statusLabels.completed, value: bookings.filter((b) => b.status === "completed").length, color: "hsl(142, 70%, 45%)" },
    { name: statusLabels.canceled, value: bookings.filter((b) => b.status === "canceled").length, color: "hsl(0, 72%, 51%)" },
  ];

  const monthlyData = [
    { month: "يناير", bookings: 15 },
    { month: "فبراير", bookings: totalBookings },
    { month: "مارس", bookings: 0 },
  ];

  const statCards = [
    { icon: DollarSign, label: "إجمالي الإيرادات", value: formatPrice(totalRevenue), color: "text-success" },
    { icon: CalendarCheck, label: "إجمالي الحجوزات", value: totalBookings.toString(), color: "text-primary" },
    { icon: TrendingUp, label: "حجوزات مكتملة", value: completedBookings.toString(), color: "text-accent" },
    { icon: BookOpen, label: "حجوزات قيد الانتظار", value: pendingBookings.toString(), color: "text-warning" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">لوحة التحكم</h1>
            <p className="text-muted-foreground">مرحباً بك في لوحة إدارة أخدماتي</p>
          </div>
          <div className="flex gap-2">
            <Link to="/my-bookings"><Button variant="outline">حجوزاتي</Button></Link>
            <Link to="/profile"><Button variant="outline">الملف الشخصي</Button></Link>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((s, i) => (
            <Card key={i}>
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${s.color}`}>
                  <s.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                  <div className="text-2xl font-bold">{s.value}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>الحجوزات الشهرية</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="hsl(213, 80%, 50%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>حالة الحجوزات</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {statusData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
