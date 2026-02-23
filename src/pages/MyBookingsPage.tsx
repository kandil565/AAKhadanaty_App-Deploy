import { Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBookings } from "@/contexts/BookingContext";
import { useAuth } from "@/contexts/AuthContext";
import { statusLabels, statusColors, formatPrice, BookingStatus } from "@/data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { useState } from "react";

const MyBookingsPage = () => {
  const { isAuthenticated } = useAuth();
  const { bookings, updateStatus } = useBookings();
  const [filter, setFilter] = useState<string>("all");

  if (!isAuthenticated) return <Navigate to="/login" />;

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const handleStatusChange = (id: string, newStatus: BookingStatus) => {
    updateStatus(id, newStatus);
    toast.success(`تم تحديث حالة الحجز إلى: ${statusLabels[newStatus]}`);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">حجوزاتي</h1>
            <p className="text-muted-foreground">إدارة ومتابعة جميع حجوزاتك</p>
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

        <div className="space-y-4">
          {filtered.map((b) => (
            <Card key={b.id}>
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-bold">{b.serviceName}</span>
                      <Badge className={statusColors[b.status]}>{statusLabels[b.status]}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {b.customerName} • {b.date} • {b.time}
                    </div>
                    {b.notes && <div className="text-sm text-muted-foreground">📝 {b.notes}</div>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-primary">{formatPrice(b.price)}</span>
                    <div className="flex gap-1">
                      {b.status === "pending" && (
                        <>
                          <Button size="sm" onClick={() => handleStatusChange(b.id, "confirmed")}>تأكيد</Button>
                          <Button size="sm" variant="destructive" onClick={() => handleStatusChange(b.id, "canceled")}>إلغاء</Button>
                        </>
                      )}
                      {b.status === "confirmed" && (
                        <Button size="sm" onClick={() => handleStatusChange(b.id, "completed")}>إتمام</Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">لا توجد حجوزات</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyBookingsPage;
