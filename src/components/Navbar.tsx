import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Grid3X3,
  CalendarPlus,
  LayoutDashboard,
  LogIn,
  LogOut,
  User,
  Sun,
  Moon,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const links = [
    { to: "/", label: t("home"), icon: Home },
    { to: "/services", label: t("services"), icon: Grid3X3 },
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="أخدماتي" className="h-10 w-10" />
            <span className="text-xl font-bold font-cairo text-primary">
              {t("appName")}
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-4 py-2 text-sm font-semibold transition-colors relative group ${isActive(l.to)
                    ? "text-primary"
                    : "text-foreground/70 hover:text-primary"
                  }`}
              >
                {l.label}
                {isActive(l.to) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Right Controls */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              title={language === "ar" ? "Switch to English" : "التبديل للعربية"}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary text-primary text-xs font-semibold hover:bg-primary hover:text-white transition-all duration-200"
            >
              <Globe className="w-3.5 h-3.5" />
              {language === "ar" ? "English" : "عربي"}
            </button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              className="text-foreground/60 hover:text-primary"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            {/* Auth */}
            {isAuthenticated ? (
              <>
                {user?.isAdmin && (
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm" className="gap-2 border-primary text-primary hover:bg-primary hover:text-white">
                      <LayoutDashboard className="h-4 w-4" />
                      {t("dashboard")}
                    </Button>
                  </Link>
                )}
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="gap-2 text-foreground/70 hover:text-primary">
                    <User className="h-4 w-4" />
                    {user?.name}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="gap-2 text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4" />
                  {t("logout")}
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="gap-2 text-foreground/70 hover:text-primary">
                    <LogIn className="h-4 w-4" />
                    {t("login")}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="gap-2 bg-secondary text-white hover:bg-secondary/90">
                    {t("register")}
                  </Button>
                </Link>
              </>
            )}

            {/* Book Now CTA - Orange */}
            <Link to="/booking">
              <Button
                size="sm"
                className="gap-2 font-bold text-white px-5"
                style={{ backgroundColor: "#F59E0B" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d97706")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F59E0B")}
              >
                <CalendarPlus className="h-4 w-4" />
                {t("bookNow")}
              </Button>
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-primary text-primary text-xs font-semibold"
            >
              <Globe className="w-3 h-3" />
              {language === "ar" ? "EN" : "ع"}
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-foreground/60"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-4 border-t border-border pt-3 space-y-1 animate-fade-in">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>
                <button
                  className={`w-full text-start px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors ${isActive(l.to)
                      ? "text-primary bg-primary/5"
                      : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                    }`}
                >
                  <l.icon className="h-4 w-4" />
                  {l.label}
                </button>
              </Link>
            ))}

            {/* Book Now Mobile */}
            <Link to="/booking" onClick={() => setOpen(false)}>
              <button
                className="w-full text-start px-4 py-2 rounded-md flex items-center gap-2 text-sm font-bold text-white mt-1"
                style={{ backgroundColor: "#F59E0B" }}
              >
                <CalendarPlus className="h-4 w-4" />
                {t("bookNow")}
              </button>
            </Link>

            <div className="border-t border-border pt-2 mt-2 space-y-1">
              {isAuthenticated ? (
                <>
                  {user?.isAdmin && (
                    <Link to="/admin-dashboard" onClick={() => setOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        {t("dashboard")}
                      </Button>
                    </Link>
                  )}
                  <Link to="/my-bookings" onClick={() => setOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      {t("myBookings")}
                    </Button>
                  </Link>
                  <Link to="/profile" onClick={() => setOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <User className="h-4 w-4" />
                      {t("profile")}
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-destructive"
                    onClick={() => { logout(); setOpen(false); }}
                  >
                    <LogOut className="h-4 w-4" />
                    {t("logout")}
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <LogIn className="h-4 w-4" />
                      {t("login")}
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setOpen(false)}>
                    <Button className="w-full gap-2">{t("register")}</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
