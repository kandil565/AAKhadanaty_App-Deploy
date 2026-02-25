import { Navigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBookings } from "@/contexts/BookingContext";
import { useAuth } from "@/contexts/AuthContext";
import { statusColors, formatPrice, services } from "@/data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t, isRTL } = useLanguage();
  const getLocalizedServiceName = (serviceId: string, fallbackName: string) => {
    if (isRTL) return fallbackName;
    const service = services.find((s) => s.id === serviceId);
    return service?.nameEn || fallbackName;
  };

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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">{t("myBookingsTitle")}</h1>
            <p className="text-muted-foreground">{t("trackOrders")}</p>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder={t("all")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all")}</SelectItem>
              <SelectItem value="pending">{t("pending")}</SelectItem>
              <SelectItem value="confirmed">{t("confirmed")}</SelectItem>
              <SelectItem value="completed">{t("completed")}</SelectItem>
              <SelectItem value="canceled">{t("canceled")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className={`${isRTL ? "mr-3" : "ml-3"} text-muted-foreground`}>{t("loadingBookings")}</span>
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
                        <span className="font-bold text-lg">{getLocalizedServiceName(b.serviceId, b.serviceName)}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {b.date} • {b.time}
                      </div>
                      {b.notes && <div className="text-sm text-muted-foreground">📝 {b.notes}</div>}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-primary font-sans" dir="ltr">{formatPrice(b.price)}</span>
                      <Badge className={statusColors[b.status]}>
                        {t(b.status)}
                      </Badge>
                    </div>
                  </div>
                  {b.status === "pending" && (
                    <p className="mt-3 text-sm text-yellow-600 bg-yellow-50 rounded-md px-3 py-2">
                      {t("pendingReviewMsg")}
                    </p>
                  )}
                  {b.status === "confirmed" && (
                    <p className="mt-3 text-sm text-green-600 bg-green-50 rounded-md px-3 py-2">
                      {t("confirmedMsg")}
                    </p>
                  )}
                  {b.status === "canceled" && (
                    <p className="mt-3 text-sm text-red-600 bg-red-50 rounded-md px-3 py-2">
                      {t("rejectedMsg")}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-12">{t("noBookings")}</p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBookingsPage;
