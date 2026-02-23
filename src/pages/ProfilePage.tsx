import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const ProfilePage = () => {
  const { isAuthenticated, user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");

  if (!isAuthenticated || !user) return <Navigate to="/login" />;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("تم حفظ البيانات بنجاح");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">الملف الشخصي</h1>
        <Card>
          <CardHeader className="text-center">
            <Avatar className="h-20 w-20 mx-auto mb-3">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <CardTitle>{user.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label>الاسم</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>البريد الإلكتروني</Label>
                <Input value={user.email} disabled />
              </div>
              <div className="space-y-2">
                <Label>رقم الهاتف</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <Button type="submit" className="w-full">حفظ التغييرات</Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
