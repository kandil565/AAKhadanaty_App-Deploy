import { Navigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBookings } from "@/contexts/BookingContext";
import { useAuth } from "@/contexts/AuthContext";
import { statusLabels, statusColors, formatPrice } from "@/data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const statusIcons: Record<string, string> = {
  pending: "🕐",
  confirmed: "✅",
  completed: "✔️",
  cancelled: "❌",
  canceled: "❌",
};

const MyBookingsPage = () => {
  const { isAuthenticated } = useAuth();
  const { bookings, loading, fetchMyBookings } = useBookings();
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    if (isAuthenticated) {
      fetchMyBookings();
    }
  }, [isAuthenticated, fetchMyBookings]);

  if (!isAuthenticated) return <Navigate to="/login" />;

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">حجوزاتي</h1>
            <p className="text-muted-foreground">متابعة حالة طلباتك</p>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="الكل" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              <SelectItem value="pending">قيد الانتظار</SelectItem>
              <SelectItem value="confirmed">مؤكد</SelectItem>
              <SelectItem value="completed">مكتمل</SelectItem>
              <SelectItem value="canceled">ملغي</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="mr-3 text-muted-foreground">جاري تحميل الحجوزات...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((b) => (
              <Card key={b.id}>
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{statusIcons[b.status] ?? "📋"}</span>
                        <span className="font-bold text-lg">{b.serviceName}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {b.date} • {b.time}
                      </div>
                      {b.notes && <div className="text-sm text-muted-foreground">📝 {b.notes}</div>}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-primary">{formatPrice(b.price)}</span>
                      <Badge className={statusColors[b.status]}>
                        {statusLabels[b.status]}
                      </Badge>
                    </div>
                  </div>
                  {b.status === "pending" && (
                    <p className="mt-3 text-sm text-yellow-600 bg-yellow-50 rounded-md px-3 py-2">
                      ⏳ طلبك قيد المراجعة من قِبل الإدارة
                    </p>
                  )}
                  {b.status === "confirmed" && (
                    <p className="mt-3 text-sm text-green-600 bg-green-50 rounded-md px-3 py-2">
                      ✅ تم قبول طلبك! سيتواصل معك مقدم الخدمة قريباً
                    </p>
                  )}
                  {(b.status === "canceled" || b.status === "cancelled") && (
                    <p className="mt-3 text-sm text-red-600 bg-red-50 rounded-md px-3 py-2">
                      ❌ تم رفض طلبك
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-12">لا توجد حجوزات</p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBookingsPage;
