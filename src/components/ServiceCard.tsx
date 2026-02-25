import { Link } from "react-router-dom";
import { Star, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Service, formatPrice } from "@/data/services";
import { useLanguage } from "@/contexts/LanguageContext";

const ServiceCard = ({ service }: { service: Service }) => {
  const { t, language, formatCurrency, formatNumber } = useLanguage();

  const name = language === "en" ? (service.nameEn || service.name) : service.name;
  const description = language === "en" ? (service.descriptionEn || service.description) : service.description;
  const duration = language === "en" ? (service.durationEn || service.duration) : service.duration;

  return (
    <Card className="group overflow-hidden border border-border hover:shadow-md transition-shadow duration-300 bg-white">
      {/* Image */}
      <div className="h-44 overflow-hidden bg-muted">
        <img
          src={service.image}
          alt={name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <CardContent className="p-5 space-y-3">
        {/* Title + Badge */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-base text-foreground leading-snug">{name}</h3>
          <span
            className="text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 text-white"
            style={{ backgroundColor: "#16A34A" }}
          >
            {t(service.category) || service.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Rating + Duration */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-sans font-medium text-foreground">{formatNumber(service.rating)}</span>
            <span className="font-sans text-muted-foreground">({formatNumber(service.reviewCount)})</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>

        {/* Price + Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-lg font-bold text-primary font-sans">
            {formatCurrency(service.price)}
          </span>
          <div className="flex gap-2">
            <Link to={`/services/${service.id}`}>
              <button className="text-sm px-3 py-1.5 rounded-md border border-primary text-primary hover:bg-primary/5 transition-colors font-medium">
                {t("details")}
              </button>
            </Link>
            <Link to={`/booking?service=${service.id}`}>
              <button
                className="text-sm px-3 py-1.5 rounded-md font-bold text-white transition-colors"
                style={{ backgroundColor: "#F59E0B" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d97706")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F59E0B")}
              >
                {t("bookNowBtn")}
              </button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
