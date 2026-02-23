import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Users,
  CheckCircle,
  Clock,
  Sparkles,
  Shield,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { services, testimonials, formatPrice } from "@/data/services";
import ServiceCard from "@/components/ServiceCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const stats = [
  { icon: Users, value: "٥٠٠٠+", label: "عميل سعيد" },
  { icon: CheckCircle, value: "١٢٠٠٠+", label: "خدمة مكتملة" },
  { icon: Star, value: "٤.٨", label: "تقييم عام" },
  { icon: Clock, value: "٢٤/٧", label: "دعم متواصل" },
];

const features = [
  {
    icon: Shield,
    title: "ضمان الجودة",
    desc: "نضمن لك جودة الخدمة أو استرداد المبلغ",
  },
  {
    icon: Sparkles,
    title: "فنيين محترفين",
    desc: "جميع مقدمي الخدمات معتمدين ومدربين",
  },
  {
    icon: Headphones,
    title: "دعم على مدار الساعة",
    desc: "فريق خدمة العملاء متاح ٢٤ ساعة",
  },
];

const HomePage = () => {
  const featuredServices = services.slice(0, 6);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <div className="w-full flex justify-center mb-6">
              <img
                src="/This Way Work GIF by Wakelet.gif"
                alt="خدمات منزلية"
                className="w-full max-h-[350px] object-cover rounded-2xl shadow-lg"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-cairo leading-tight">
              خدمات منزلية <span className="text-primary">احترافية</span> بين
              يديك
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              احجز خدمات التنظيف والصيانة والسباكة وغيرها بسهولة. فنيين محترفين
              وأسعار تنافسية بالجنيه المصري.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/services">
                <Button size="lg" className="gap-2 text-base px-8">
                  تصفح الخدمات
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/booking">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 text-base px-8"
                >
                  احجز الآن
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <s.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">خدماتنا المميزة</h2>
            <p className="text-muted-foreground">
              اختر من بين مجموعة واسعة من الخدمات المنزلية والشخصية
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/services">
              <Button variant="outline" size="lg" className="gap-2">
                عرض جميع الخدمات
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">لماذا أخدماتي؟</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <Card className="text-center p-6 h-full">
                  <CardContent className="p-0 space-y-3">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                      <f.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">آراء عملائنا</h2>
            <p className="text-muted-foreground">
              اكتشف تجارب عملائنا مع خدماتنا
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <Card key={t.id} className="p-5">
                <CardContent className="p-0 space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {t.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {t.service}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t.comment}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold text-primary-foreground">
            جاهز تحجز خدمتك؟
          </h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto">
            سجّل الآن واحجز أي خدمة منزلية بسهولة. أسعار تبدأ من{" "}
            {formatPrice(150)} فقط!
          </p>
          <Link to="/booking">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 text-base px-8"
            >
              احجز الآن
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
