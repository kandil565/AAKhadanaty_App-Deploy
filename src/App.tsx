import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { BookingProvider } from "@/contexts/BookingContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailsPage from "./pages/ServiceDetailsPage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BookingProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/:id" element={<ServiceDetailsPage />} />
                  <Route path="/booking" element={<BookingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/my-bookings" element={<MyBookingsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </BookingProvider>
        </AuthProvider>
      </QueryClientProvider>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
