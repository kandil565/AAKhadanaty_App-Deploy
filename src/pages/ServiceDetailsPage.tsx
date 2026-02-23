import { useParams, Link } from "react-router-dom";
import { Star, Clock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { services, testimonials, formatPrice } from "@/data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import * as Icons from "lucide-react";

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">الخدمة غير موجودة</h1>
          <Link to="/services"><Button>العودة للخدمات</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const IconComponent = (Icons as any)[service.icon] || Icons.Wrench;
  const relatedReviews = testimonials.filter((t) => t.service === service.name);
  const relatedServices = services.filter((s) => s.category === service.category && s.id !== service.id).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">الرئيسية</Link>
          <ArrowRight className="h-3 w-3" />
          <Link to="/services" className="hover:text-primary">الخدمات</Link>
          <ArrowRight className="h-3 w-3" />
          <span className="text-foreground">{service.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <div className="h-64 rounded-xl bg-gradient-to-bl from-primary/10 to-accent/10 flex items-center justify-center">
              <IconComponent className="h-24 w-24 text-primary/50" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  {service.rating} ({service.reviewCount} تقييم)
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {service.duration}
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>

            {/* Provider */}
            <Card>
              <CardContent className="p-5 flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-bold">{service.provider}</div>
                  <div className="text-sm text-muted-foreground">مقدم الخدمة المعتمد</div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            {relatedReviews.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">آراء العملاء</h2>
                <div className="space-y-4">
                  {relatedReviews.map((r) => (
                    <Card key={r.id}>
                      <CardContent className="p-4 flex items-start gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">{r.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold text-sm">{r.name}</div>
                          <div className="flex gap-0.5 my-1">
                            {Array.from({ length: r.rating }).map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">{r.comment}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-20">
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{formatPrice(service.price)}</div>
                  <div className="text-sm text-muted-foreground">السعر يشمل المواد والعمالة</div>
                </div>
                <Link to={`/booking?service=${service.id}`}>
                  <Button className="w-full" size="lg">احجز هذه الخدمة</Button>
                </Link>
                <div className="text-xs text-muted-foreground text-center space-y-1">
                  <p>✓ ضمان جودة الخدمة</p>
                  <p>✓ فنيين معتمدين</p>
                  <p>✓ إمكانية الإلغاء المجاني</p>
                </div>
              </CardContent>
            </Card>

            {relatedServices.length > 0 && (
              <div>
                <h3 className="font-bold mb-3">خدمات مشابهة</h3>
                <div className="space-y-3">
                  {relatedServices.map((s) => (
                    <Link key={s.id} to={`/services/${s.id}`}>
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-3 flex items-center justify-between">
                          <span className="text-sm font-medium">{s.name}</span>
                          <Badge variant="secondary">{formatPrice(s.price)}</Badge>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceDetailsPage;
