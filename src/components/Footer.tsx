import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-card border-t border-border mt-16">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">أ</span>
            </div>
            <span className="text-xl font-bold font-cairo">أخدماتي</span>
          </div>
          <p className="text-muted-foreground text-sm">
            منصة متكاملة لحجز وإدارة الخدمات المنزلية والشخصية في مصر.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-3">روابط سريعة</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <Link to="/" className="block hover:text-primary transition-colors">الرئيسية</Link>
            <Link to="/services" className="block hover:text-primary transition-colors">الخدمات</Link>
            <Link to="/booking" className="block hover:text-primary transition-colors">احجز الآن</Link>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-3">الخدمات الشائعة</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <Link to="/services/1" className="block hover:text-primary transition-colors">تنظيف منازل</Link>
            <Link to="/services/2" className="block hover:text-primary transition-colors">صيانة تكييفات</Link>
            <Link to="/services/3" className="block hover:text-primary transition-colors">سباكة</Link>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-3">تواصل معنا</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> 01000000000</div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@a5adamaty.com</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> القاهرة، مصر</div>
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
        © 2026 أخدماتي - جميع الحقوق محفوظة
      </div>
    </div>
  </footer>
);

export default Footer;
