import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { services, formatPrice } from "@/data/services";
import { useBookings } from "@/contexts/BookingContext";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

const BookingPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { addBooking } = useBookings();
  const { user } = useAuth();
  const { t, language, isRTL } = useLanguage();

  const [serviceId, setServiceId] = useState(params.get("service") || "");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const selectedService = services.find((s) => s.id === serviceId);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!serviceId) e.service = t("chooseService");
    if (!date) e.date = t("chooseDate");
    if (!time) e.time = t("chooseTime");
    if (!name.trim()) e.name = t("enterValidName");
    if (!phone.trim() || phone.length < 11) e.phone = t("enterValidPhone");
    if (!email.trim() || !email.includes("@")) e.email = t("enterValidEmail");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const success = await addBooking({
      serviceId,
      serviceName: selectedService?.name || "",
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
      date: format(date!, "yyyy-MM-dd"),
      time,
      price: selectedService?.price || 0,
      notes,
    });

    if (success) {
      setSubmitted(true);
      toast.success(t("bookingSuccessMsg"));
    } else {
      toast.error(t("bookingError"));
    }
  };

  const locale = language === "ar" ? ar : enUS;

  if (submitted) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center space-y-6 max-w-md">
          <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>
          <h1 className="text-2xl font-bold">{t("bookingSuccessTitle")}</h1>
          <p className="text-muted-foreground">
            {t("bookedServiceOn")} <strong>{isRTL ? selectedService?.name : selectedService?.nameEn || selectedService?.name}</strong> {t("onDate")}{" "}
            <strong>{format(date!, "dd MMMM yyyy", { locale })}</strong> {t("atTime")} <strong>{time}</strong>.
          </p>
          <p className="text-sm text-muted-foreground">{t("willContactYou")}</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate("/my-bookings")}>{t("myBookings")}</Button>
            <Button variant="outline" onClick={() => navigate("/")}>{t("homePage")}</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{t("bookingTitle")}</h1>
          <p className="text-muted-foreground">{t("bookingDesc")}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>{t("bookingData")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Service */}
              <div className="space-y-2">
                <Label>{t("serviceLabel")} {t("required")}</Label>
                <Select value={serviceId} onValueChange={setServiceId}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectService")} />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {isRTL ? s.name : s.nameEn || s.name} - {formatPrice(s.price)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.service && <p className="text-sm text-destructive">{errors.service}</p>}
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t("dateLabel")} {t("required")}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start", isRTL ? "text-right" : "text-left", !date && "text-muted-foreground")}>
                        <CalendarIcon className={`${isRTL ? "ml-2" : "mr-2"} h-4 w-4`} />
                        {date ? format(date, "dd/MM/yyyy") : t("selectDate")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(d) => d < new Date()}
                        className="p-3 pointer-events-auto"
                        locale={locale}
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
                </div>
                <div className="space-y-2">
                  <Label>{t("timeLabel")} {t("required")}</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("selectTime")} />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((t_slot) => (
                        <SelectItem key={t_slot} value={t_slot}>{t_slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.time && <p className="text-sm text-destructive">{errors.time}</p>}
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-2">
                <Label>{t("fullName")} {t("required")}</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={t("enterFullName")} />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t("phoneLabel")} {t("required")}</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="01XXXXXXXXX" type="tel" />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>
                <div className="space-y-2">
                  <Label>{t("emailLabel")} {t("required")}</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" type="email" />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t("notes")}</Label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t("notesPlaceholder")} />
              </div>

              {/* Summary */}
              {selectedService && (
                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <h4 className="font-bold">{t("bookingSummary")}</h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("serviceLabel")}</span>
                    <span>{isRTL ? selectedService.name : selectedService.nameEn || selectedService.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("expectedDuration")}</span>
                    <span>{isRTL ? selectedService.duration : selectedService.durationEn || selectedService.duration}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-border pt-2">
                    <span>{t("total")}</span>
                    <span className="text-primary">{formatPrice(selectedService.price)}</span>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full" size="lg">
                {t("submitBooking")}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
