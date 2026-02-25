import { useParams, Link } from "react-router-dom";
import { Star, Clock, CheckCircle, Shield, ArrowLeft } from "lucide-react";
import { services, formatPrice } from "@/data/services";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { useLanguage } from "@/contexts/LanguageContext";

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const { t, isRTL, language, formatCurrency, formatNumber } = useLanguage();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center space-y-4">
          <h1 className="text-2xl font-bold">{t("serviceNotFound")}</h1>
          <Link to="/services">
            <Button variant="outline">{t("backToServices")}</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedServices = services
    .filter((s) => s.category === service.category && s.id !== service.id)
    .slice(0, 3);

  const name = language === "en" ? (service.nameEn || service.name) : service.name;
  const description = language === "en" ? (service.descriptionEn || service.description) : service.description;
  const duration = language === "en" ? (service.durationEn || service.duration) : service.duration;
  const provider = language === "en" ? (service.providerEn || service.provider) : service.provider;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/services" className="hover:text-primary transition-colors">{t("services")}</Link>
          <ArrowLeft className={`h-3 w-3 ${isRTL ? "" : "rotate-180"}`} />
          <span className="font-medium text-foreground">{name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl border border-border">
              <img src={service.image} alt={name} className="w-full h-full object-cover" />
              <Badge className="absolute top-6 left-6 text-base px-4 py-1.5 backdrop-blur-md bg-primary/90">{t(service.category) || service.category}</Badge>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-3xl md:text-5xl font-bold font-cairo">{name}</h1>
                <div className="flex items-center gap-1.5 bg-accent/10 px-3 py-1.5 rounded-full">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span className="font-bold text-lg">{formatNumber(service.rating)}</span>
                  <span className="text-muted-foreground text-sm">({formatNumber(service.reviewCount)} {t("review")})</span>
                </div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{t("expectedDuration")}</div>
                  <div className="font-bold">{duration}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 border border-border">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{t("certifiedProvider")}</div>
                  <div className="font-bold">{provider}</div>
                </div>
              </div>
            </div>

            {/* Testimonials within details */}
            <div className="space-y-6 pt-8">
              <h2 className="text-2xl font-bold">{t("customerReviews")}</h2>
              <div className="space-y-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <Card key={i} className="bg-card">
                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">{i === 0 ? "M" : "S"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold font-cairo">
                            {i === 0 ? (language === "ar" ? "محمد المصري" : "Mohamed El-Masry") : (language === "ar" ? "سارة أحمد" : "Sara Ahmed")}
                          </div>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Star key={j} className="h-3 w-3 fill-accent text-accent" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground italic">
                        {i === 0
                          ? (language === "ar" ? "\"خدمة ممتازة وفني محترف جداً، أنصح بالتعامل معهم.\"" : "\"Excellent service and very professional technician, I highly recommend them.\"")
                          : (language === "ar" ? "\"تم إنجاز العمل في وقت قياسي وبجودة عالية.\"" : "\"Work was completed in record time with high quality.\"")}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-24 border-2 border-primary/20 shadow-2xl overflow-hidden rounded-3xl">
              <CardHeader className="bg-primary/5 pb-4">
                <CardTitle className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{t("bookService")}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="text-center py-2">
                  <div className="text-4xl font-black text-primary font-sans">{formatCurrency(service.price)}</div>
                  <div className="text-sm text-muted-foreground mt-2">{t("priceIncluded")}</div>
                </div>

                <Link to={`/booking?service=${service.id}`} className="block w-full">
                  <Button className="w-full text-lg font-bold py-7 rounded-2xl shadow-lg shadow-primary/25" size="lg">
                    {t("bookThisService")}
                  </Button>
                </Link>

                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>{t("serviceGuarantee")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>{t("certifiedTechs")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>{t("freeCancellation")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4 pt-6">
              <h3 className="font-bold text-lg">{t("whyUs")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("qualityGuaranteeDesc")}
              </p>
            </div>
          </div>
        </div>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-8">{t("similarServices")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ServiceDetailsPage;
