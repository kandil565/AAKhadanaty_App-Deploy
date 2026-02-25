import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Users,
  CheckCircle,
  Clock,
  Shield,
  Sparkles,
  Headphones,
  Phone,
  Award,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { services, testimonials, formatPrice } from "@/data/services";
import ServiceCard from "@/components/ServiceCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const HomePage = () => {
  const { t, isRTL, formatCurrency } = useLanguage();
  const featuredServices = services.slice(0, 6);
  const bigServices = featuredServices.slice(0, 2);
  const smallServices = featuredServices.slice(2, 6);

  const stats = [
    { icon: Users, value: isRTL ? "٥٠٠٠+" : "5000+", label: t("happyClients") },
    { icon: CheckCircle, value: isRTL ? "١٢٠٠٠+" : "12000+", label: t("completedServices") },
    { icon: Star, value: isRTL ? "٤.٨" : "4.8", label: t("generalRating") },
    { icon: Clock, value: isRTL ? "٢٤/٧" : "24/7", label: t("continuousSupport") },
  ];

  const whyUs = [
    {
      icon: Shield,
      title: t("qualityGuarantee"),
      desc: t("qualityGuaranteeDesc"),
      img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",
    },
    {
      icon: Sparkles,
      title: t("professionalTechnicians"),
      desc: t("professionalTechniciansDesc"),
      img: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&q=80",
    },
    {
      icon: Headphones,
      title: t("support24"),
      desc: t("support24Desc"),
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div
            className={`flex flex-col md:flex-row items-center gap-10 py-16 md:py-24 ${isRTL ? "md:flex-row-reverse" : ""
              }`}
          >
            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              className="flex-1 space-y-6"
            >
              {/* Trust chip */}
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full border border-primary/20 text-primary bg-primary/5">
                <Award className="h-4 w-4" />
                {isRTL ? "منصة الخدمات المنزلية الأولى" : "Egypt's #1 Home Services Platform"}
              </span>

              <h1 className="text-4xl md:text-5xl font-extrabold font-cairo leading-tight text-foreground">
                {t("heroTitle")}{" "}
                <span className="text-primary">{t("heroTitleHighlight")}</span>{" "}
                {t("heroTitleEnd")}
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                {t("heroDesc")}
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-3">
                {/* Primary CTA - orange Book Now */}
                <Link to="/booking">
                  <button
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-lg text-base font-bold text-white transition-colors"
                    style={{ backgroundColor: "#F59E0B" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d97706")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F59E0B")}
                  >
                    {t("bookNowBtn")}
                    <ArrowLeft className={`h-5 w-5 ${isRTL ? "" : "rotate-180"}`} />
                  </button>
                </Link>

                {/* Secondary - outline */}
                <Link to="/services">
                  <button className="inline-flex items-center gap-2 px-8 py-3 rounded-lg text-base font-semibold border border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                    {t("browseServices")}
                    <ArrowLeft className={`h-5 w-5 ${isRTL ? "" : "rotate-180"}`} />
                  </button>
                </Link>
              </div>

              {/* Mini trust stats */}
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-1.5">
                  <ThumbsUp className="h-4 w-4 text-secondary" />
                  <span className="text-sm font-semibold text-foreground">
                    {isRTL ? "5,000+ عميل سعيد" : "5,000+ Happy Clients"}
                  </span>
                </div>
                <div className="flex -space-x-2">
                  {["م", "أ", "س", "ن"].map((l, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: "#1E3A8A" }}
                    >
                      {l}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="flex-1 w-full"
            >
              <img
                src="/This Way Work GIF by Wakelet.gif"
                alt={t("heroTitle")}
                className="w-full max-h-[400px] object-cover rounded-2xl shadow-md"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      <section className="py-10 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <s.icon className="h-7 w-7 text-white/60 mx-auto mb-1.5" />
                <div className="text-2xl md:text-3xl font-extrabold text-white">{s.value}</div>
                <div className="text-sm text-white/70 mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED SERVICES ─── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Section header — left-aligned for variety */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-2">{t("featuredServices")}</h2>
            <p className="text-muted-foreground">{t("featuredServicesDesc")}</p>
            <div className="mt-3 w-14 h-1 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
          </div>

          {/* First 2 services — wider cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {bigServices.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>

          {/* Remaining 4 services — standard 4-col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {smallServices.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/services">
              <button className="inline-flex items-center gap-2 px-8 py-3 rounded-lg text-base font-semibold border border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                {t("viewAllServices")}
                <ArrowLeft className={`h-4 w-4 ${isRTL ? "" : "rotate-180"}`} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── Alternating layout */}
      <section className="py-16 bg-white border-t border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">{t("whyUs")}</h2>
            <div className="mx-auto mt-3 w-14 h-1 rounded-full" style={{ backgroundColor: "#1E3A8A" }} />
          </div>

          <div className="space-y-16">
            {whyUs.map((item, i) => {
              const isEven = i % 2 === 0;
              const imgLeft = isRTL ? !isEven : isEven;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center gap-10 ${imgLeft ? "" : "md:flex-row-reverse"
                    }`}
                >
                  {/* Image */}
                  <div className="flex-1 w-full">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-60 object-cover rounded-2xl shadow-sm"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 space-y-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "#EFF6FF" }}
                    >
                      <item.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    <Link to="/services">
                      <button className="mt-2 text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
                        {isRTL ? "اعرف المزيد" : "Learn More"}
                        <ArrowLeft className={`h-4 w-4 ${isRTL ? "" : "rotate-180"}`} />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── Mixed card sizes */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-2">{t("customerReviews")}</h2>
            <p className="text-muted-foreground">{t("customerReviewsDesc")}</p>
            <div className="mx-auto mt-3 w-14 h-1 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First testimonial — spans 2 cols */}
            {testimonials[0] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:col-span-2"
              >
                <Card className="p-7 h-full border border-border bg-white shadow-sm">
                  <CardContent className="p-0 space-y-4">
                    {/* Quote mark */}
                    <div className="text-5xl font-serif text-primary/20 leading-none select-none">"</div>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {isRTL ? testimonials[0].comment : testimonials[0].commentEn || testimonials[0].comment}
                    </p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: testimonials[0].rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="flex items-center gap-3 pt-2 border-t border-border">
                      <Avatar>
                        <AvatarFallback className="font-bold text-white" style={{ backgroundColor: "#1E3A8A" }}>
                          {isRTL ? testimonials[0].avatar : testimonials[0].avatarEn || testimonials[0].avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-bold text-sm">
                          {isRTL ? testimonials[0].name : testimonials[0].nameEn || testimonials[0].name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {isRTL ? testimonials[0].service : testimonials[0].serviceEn || testimonials[0].service}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Second testimonial — 1 col */}
            {testimonials[1] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                viewport={{ once: true }}
              >
                <Card className="p-5 h-full border border-border bg-white shadow-sm">
                  <CardContent className="p-0 space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="font-bold text-white" style={{ backgroundColor: "#16A34A" }}>
                          {isRTL ? testimonials[1].avatar : testimonials[1].avatarEn || testimonials[1].avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-bold text-sm">
                          {isRTL ? testimonials[1].name : testimonials[1].nameEn || testimonials[1].name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {isRTL ? testimonials[1].service : testimonials[1].serviceEn || testimonials[1].service}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: testimonials[1].rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {isRTL ? testimonials[1].comment : testimonials[1].commentEn || testimonials[1].comment}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Remaining testimonials — 3 equal cols */}
            {testimonials.slice(2).map((t_item, i) => (
              <motion.div
                key={t_item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (i + 2) * 0.08 }}
                viewport={{ once: true }}
              >
                <Card className="p-5 h-full border border-border bg-white shadow-sm">
                  <CardContent className="p-0 space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="font-bold text-white" style={{ backgroundColor: "#1E3A8A" }}>
                          {isRTL ? t_item.avatar : t_item.avatarEn || t_item.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-bold text-sm">
                          {isRTL ? t_item.name : t_item.nameEn || t_item.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {isRTL ? t_item.service : t_item.serviceEn || t_item.service}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: t_item.rating }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {isRTL ? t_item.comment : t_item.commentEn || t_item.comment}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── Solid blue background */}
      <section className="py-16" style={{ backgroundColor: "#1E3A8A" }}>
        <div className="container mx-auto px-4">
          <div
            className={`flex flex-col md:flex-row items-center justify-between gap-8 ${isRTL ? "md:flex-row-reverse" : ""
              }`}
          >
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-white">{t("readyToBook")}</h2>
              <p className="text-white/70 max-w-md">
                {t("ctaDesc")} {formatCurrency(150)} {t("ctaDescEnd")}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Phone */}
              <a
                href="tel:01000000000"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                <Phone className="h-5 w-5" />
                {isRTL ? "اتصل الآن" : "Call Now"}
              </a>

              {/* Book Now - orange */}
              <Link to="/booking">
                <button
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-lg text-base font-bold text-white transition-colors"
                  style={{ backgroundColor: "#F59E0B" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d97706")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F59E0B")}
                >
                  {t("bookNowBtn")}
                  <ArrowLeft className={`h-5 w-5 ${isRTL ? "" : "rotate-180"}`} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
