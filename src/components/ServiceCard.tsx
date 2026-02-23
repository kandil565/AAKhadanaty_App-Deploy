import { Link } from "react-router-dom";
import { Star, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Service, formatPrice } from "@/data/services";

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="h-40 bg-gradient-to-bl from-primary/10 to-accent/10 flex items-center justify-center">
        <img
          src={service.image}
          alt={service.name}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-lg">{service.name}</h3>
          <Badge variant="secondary" className="text-xs">
            {service.category === "cleaning"
              ? "تنظيف"
              : service.category === "maintenance"
              ? "صيانة"
              : service.category}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {service.description}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span>{service.rating}</span>
            <span>({service.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{service.duration}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-lg font-bold text-primary">
            {formatPrice(service.price)}
          </span>
          <div className="flex gap-2">
            <Link to={`/services/${service.id}`}>
              <Button variant="outline" size="sm">
                التفاصيل
              </Button>
            </Link>
            <Link to={`/booking?service=${service.id}`}>
              <Button size="sm">احجز الآن</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
