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
    { to: "/booking", label: t("bookNow"), icon: CalendarPlus },
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-0">
            <img src="/logo.png" alt="أخدماتي" className="h-15 w-12" />
            <span className="text-xl font-bold font-cairo text-foreground">
              {t("appName")}
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link key={l.to} to={l.to}>
                <Button
                  variant={isActive(l.to) ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <l.icon className="h-4 w-4" />
                  {l.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right side controls */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              title={language === "ar" ? "Switch to English" : "التبديل للعربية"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "20px",
                border: "1.5px solid",
                borderColor: "hsl(var(--primary))",
                background: "transparent",
                color: "hsl(var(--primary))",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "600",
                transition: "all 0.25s ease",
                letterSpacing: "0.3px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "hsl(var(--primary))";
                (e.currentTarget as HTMLButtonElement).style.color = "hsl(var(--primary-foreground))";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "hsl(var(--primary))";
              }}
            >
              <Globe style={{ width: "15px", height: "15px" }} />
              {language === "ar" ? "English" : "عربي"}
            </button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <>
                {user?.isAdmin && (
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm" className="gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      {t("dashboard")}
                    </Button>
                  </Link>
                )}
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    {user?.name}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="gap-2 text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  {t("logout")}
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <LogIn className="h-4 w-4" />
                    {t("login")}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="gap-2">
                    {t("register")}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-1">
            {/* Mobile Language Toggle */}
            <button
              onClick={toggleLanguage}
              title={language === "ar" ? "Switch to English" : "التبديل للعربية"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "4px 10px",
                borderRadius: "16px",
                border: "1.5px solid",
                borderColor: "hsl(var(--primary))",
                background: "transparent",
                color: "hsl(var(--primary))",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              <Globe style={{ width: "13px", height: "13px" }} />
              {language === "ar" ? "EN" : "ع"}
            </button>

            {/* Mobile Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 border-t border-border pt-3 space-y-1 animate-fade-in">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>
                <Button
                  variant={isActive(l.to) ? "default" : "ghost"}
                  className="w-full justify-start gap-2"
                >
                  <l.icon className="h-4 w-4" />
                  {l.label}
                </Button>
              </Link>
            ))}
            <div className="border-t border-border pt-2 mt-2 space-y-1">
              {isAuthenticated ? (
                <>
                  {user?.isAdmin && (
                    <Link to="/admin-dashboard" onClick={() => setOpen(false)}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        {t("dashboard")}
                      </Button>
                    </Link>
                  )}
                  <Link to="/my-bookings" onClick={() => setOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                    >
                      {t("myBookings")}
                    </Button>
                  </Link>
                  <Link to="/profile" onClick={() => setOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                    >
                      <User className="h-4 w-4" />
                      {t("profile")}
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-destructive"
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    {t("logout")}
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                    >
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
