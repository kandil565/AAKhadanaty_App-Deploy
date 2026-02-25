import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer style={{ backgroundColor: "#1E3A8A" }} className="mt-16">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <span className="text-white font-bold text-lg">{t("footerBrandLetter")}</span>
              </div>
              <span className="text-xl font-bold font-cairo text-white">{t("footerBrand")}</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              {t("footerDesc")}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-5">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
                >
                  <Icon className="h-4 w-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-base">{t("quickLinks")}</h4>
            <div className="space-y-2.5 text-sm text-white/70">
              <Link to="/" className="block hover:text-white transition-colors">{t("home")}</Link>
              <Link to="/services" className="block hover:text-white transition-colors">{t("services")}</Link>
              <Link to="/booking" className="block hover:text-white transition-colors">{t("bookNowBtn")}</Link>
            </div>
          </div>

          {/* Popular Services */}
          <div>
            <h4 className="font-bold text-white mb-4 text-base">{t("popularServices")}</h4>
            <div className="space-y-2.5 text-sm text-white/70">
              <Link to="/services/1" className="block hover:text-white transition-colors">{t("houseCleaning")}</Link>
              <Link to="/services/2" className="block hover:text-white transition-colors">{t("acMaintenance")}</Link>
              <Link to="/services/3" className="block hover:text-white transition-colors">{t("plumbingService")}</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4 text-base">{t("contactUs")}</h4>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-center gap-2 font-sans" dir="ltr">
                <Phone className="h-4 w-4 text-white/50 flex-shrink-0" />
                01000000000
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-white/50 flex-shrink-0" />
                info@a5adamaty.com
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-white/50 flex-shrink-0" />
                {t("location")}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/15 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-white/50">
          <span>© 2026 {t("footerBrand")} — {t("footerRights")}</span>
          <span className="text-white/30">Powered by AAKhadanaty Platform</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
