import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { CalendarCheck, DollarSign, TrendingUp, BookOpen, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBookings } from "@/contexts/BookingContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice, statusColors, services } from "@/data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const DashboardPage = () => {
  const { isAuthenticated, user } = useAuth();
  const { bookings, allBookings, loading, fetchAllBookings, updateStatus } = useBookings();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { t, isRTL } = useLanguage();

  const getLocalizedServiceName = (serviceId: string, fallbackName: string) => {
    if (isRTL) return fallbackName;
    const service = services.find((s) => s.id === serviceId);
    return service?.nameEn || fallbackName;
  };

  useEffect(() => {
    if (isAuthenticated && user?.isAdmin) {
      fetchAllBookings();
    }
  }, [isAuthenticated, user, fetchAllBookings]);

  if (!isAuthenticated) return <Navigate to="/login" />;

  const displayBookings = user?.isAdmin ? allBookings : bookings;

  const totalRevenue = displayBookings.filter((b) => b.status === "completed").reduce((s, b) => s + b.price, 0);
  const totalBookings = displayBookings.length;
  const completedBookings = displayBookings.filter((b) => b.status === "completed").length;
  const pendingBookings = displayBookings.filter((b) => b.status === "pending").length;

  const statusData = [
    { name: t("pending"), value: displayBookings.filter((b) => b.status === "pending").length, color: "hsl(38, 92%, 50%)" },
    { name: t("confirmed"), value: displayBookings.filter((b) => b.status === "confirmed").length, color: "hsl(213, 80%, 50%)" },
    { name: t("completed"), value: displayBookings.filter((b) => b.status === "completed").length, color: "hsl(142, 70%, 45%)" },
    { name: t("canceled"), value: displayBookings.filter((b) => b.status === "canceled").length, color: "hsl(0, 72%, 51%)" },
  ];

  const monthlyData = [
    { month: t("jan"), bookings: 15 },
    { month: t("feb"), bookings: totalBookings },
    { month: t("mar"), bookings: 0 },
  ];

  const statCards = [
    { icon: DollarSign, label: t("totalRevenue"), value: formatPrice(totalRevenue), color: "text-success" },
    { icon: CalendarCheck, label: t("totalBookings"), value: totalBookings.toString(), color: "text-primary" },
    { icon: TrendingUp, label: t("completedBookingsCount"), value: completedBookings.toString(), color: "text-accent" },
    { icon: BookOpen, label: t("pendingBookingsCount"), value: pendingBookings.toString(), color: "text-warning" },
  ];

  const handleApprove = async (id: string) => {
    setUpdatingId(id);
    const success = await updateStatus(id, "confirmed");
    if (success) {
      toast.success(t("approveSuccess"));
    } else {
      toast.error(t("updateError"));
    }
    setUpdatingId(null);
  };

  const handleReject = async (id: string) => {
    setUpdatingId(id);
    const success = await updateStatus(id, "canceled");
    if (success) {
      toast.success(t("rejectSuccess"));
    } else {
      toast.error(t("updateError"));
    }
    setUpdatingId(null);
  };

  const pendingList = displayBookings.filter((b) => b.status === "pending");

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">{t("adminDashboard")}</h1>
            <p className="text-muted-foreground">{t("welcomeDashboard")}</p>
          </div>
          <div className="flex gap-2">
            <Link to="/my-bookings"><Button variant="outline">{t("myBookings")}</Button></Link>
            <Link to="/profile"><Button variant="outline">{t("profileTitle")}</Button></Link>
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
                  <div className="text-2xl font-bold font-sans" dir="ltr">{s.value}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Admin Bookings Management */}
        {user?.isAdmin && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📋 {t("managePendingBookings")}
                {pendingList.length > 0 && (
                  <Badge className="bg-warning/20 text-warning border-warning/30 px-2">{pendingList.length}</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <span className={`${isRTL ? "mr-3" : "ml-3"} text-muted-foreground`}>{t("loading")}</span>
                </div>
              ) : pendingList.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">🎉 {t("noPendingBookings")}</p>
              ) : (
                <div className="space-y-4">
                  {pendingList.map((b) => (
                    <div key={b.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg bg-muted/30">
                      <div className="space-y-1 flex-1">
                        <div className="font-bold text-lg">{getLocalizedServiceName(b.serviceId, b.serviceName)}</div>
                        <div className="text-sm text-muted-foreground">
                          👤 {b.customerName} • 📞 {b.customerPhone}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          📅 {b.date} • ⏰ {b.time}
                        </div>
                        {b.notes && <div className="text-sm text-muted-foreground">📝 {b.notes}</div>}
                        <div className="font-bold text-primary">{formatPrice(b.price)}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleApprove(b.id)}
                          disabled={updatingId === b.id}
                        >
                          {updatingId === b.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className={`h-4 w-4 ${isRTL ? "ml-1" : "mr-1"}`} />}
                          {t("approve")}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(b.id)}
                          disabled={updatingId === b.id}
                        >
                          {updatingId === b.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className={`h-4 w-4 ${isRTL ? "ml-1" : "mr-1"}`} />}
                          {t("reject")}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* All bookings list */}
              {displayBookings.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-bold text-lg mb-4">{t("allBookingsCounter")} ({displayBookings.length})</h3>
                  <div className="space-y-3">
                    {displayBookings.map((b) => (
                      <div key={b.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 border rounded-lg">
                        <div className="space-y-1 flex-1">
                          <div className="font-semibold">{getLocalizedServiceName(b.serviceId, b.serviceName)}</div>
                          <div className="text-xs text-muted-foreground">
                            👤 {b.customerName} • 📅 {b.date} • ⏰ {b.time}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-primary">{formatPrice(b.price)}</span>
                          <Badge className={statusColors[b.status]}>{t(b.status)}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("monthlyBookings")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis orientation={isRTL ? "right" : "left"} />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="hsl(213, 80%, 50%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("bookingStatusDist")}</CardTitle>
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
