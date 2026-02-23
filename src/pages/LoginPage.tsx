import { useState } from "react";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }

    setIsLoading(true);
    try {
      const isLoggedIn = await login(email, password);
      if (isLoggedIn) {
        toast.success("تم تسجيل الدخول بنجاح!");

        // Get user data from localStorage to check admin status
        const userData = localStorage.getItem("a5adamaty_user");
        if (userData) {
          const user = JSON.parse(userData);
          if (user.isAdmin) {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        }
      } else {
        toast.error("بيانات الدخول غير صحيحة");
      }
    } catch (error) {
      toast.error("حصل خطأ أثناء تسجيل الدخول");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
            <CardDescription>ادخل بياناتك للوصول إلى حسابك</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>البريد الإلكتروني</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label>كلمة المرور</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "جاري التحميل..." : "تسجيل الدخول"}
              </Button>
            </form>
            <p className="text-center text-sm mt-4 text-muted-foreground">
              ليس لديك حساب؟{" "}
              <Link
                to="/register"
                className="text-primary hover:underline font-medium"
              >
                إنشاء حساب
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
