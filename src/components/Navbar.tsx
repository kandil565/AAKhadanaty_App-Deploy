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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const links = [
    { to: "/", label: "الرئيسية", icon: Home },
    { to: "/services", label: "الخدمات", icon: Grid3X3 },
    { to: "/booking", label: "احجز الآن", icon: CalendarPlus },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-0">
            <img src="/logo.png" alt="أخدماتي" className="h-15 w-12" />
            <span className="text-xl font-bold font-cairo text-foreground">
              أخدماتي
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

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hidden md:inline-flex"
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {user?.isAdmin && (
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm" className="gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      لوحة التحكم
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
                  خروج
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <LogIn className="h-4 w-4" />
                    تسجيل الدخول
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="gap-2">
                    إنشاء حساب
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Mobile Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="md:hidden"
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
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
                        لوحة التحكم
                      </Button>
                    </Link>
                  )}
                  <Link to="/my-bookings" onClick={() => setOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                    >
                      حجوزاتي
                    </Button>
                  </Link>
                  <Link to="/profile" onClick={() => setOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                    >
                      <User className="h-4 w-4" />
                      الملف الشخصي
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
                    تسجيل الخروج
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
                      تسجيل الدخول
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setOpen(false)}>
                    <Button className="w-full gap-2">إنشاء حساب</Button>
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
