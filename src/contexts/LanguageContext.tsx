import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "ar" | "en";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
    ar: {
        // Navbar
        home: "الرئيسية",
        services: "الخدمات",
        bookNow: "احجز الآن",
        dashboard: "لوحة التحكم",
        profile: "الملف الشخصي",
        login: "تسجيل الدخول",
        register: "إنشاء حساب",
        logout: "خروج",
        myBookings: "حجوزاتي",
        appName: "أخدماتي",

        // Login Page
        loginTitle: "تسجيل الدخول",
        loginDesc: "ادخل بياناتك للوصول إلى حسابك",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        loading: "جاري التحميل...",
        noAccount: "ليس لديك حساب؟",
        createAccount: "إنشاء حساب",
        loginSuccess: "تم تسجيل الدخول بنجاح!",
        loginError: "بيانات الدخول غير صحيحة",
        fillAllFields: "يرجى ملء جميع الحقول",
        loginErrorGeneral: "حصل خطأ أثناء تسجيل الدخول",

        // Register Page
        registerTitle: "إنشاء حساب جديد",
        registerDesc: "أنشئ حساباً للوصول إلى جميع الخدمات",
        fullName: "الاسم الكامل",
        phone: "رقم الهاتف",
        confirmPassword: "تأكيد كلمة المرور",
        alreadyHaveAccount: "لديك حساب بالفعل؟",
        registerBtn: "إنشاء الحساب",
        registerSuccess: "تم إنشاء الحساب بنجاح!",
        passwordMismatch: "كلمتا المرور غير متطابقتين",

        // Index Page
        heroTitle: "خدمات منزلية موثوقة",
        heroSubtitle: "نربطك بأفضل مزودي الخدمات المنزلية",
        ourServices: "خدماتنا",
        bookService: "احجز خدمة",

        // Services
        cleaning: "تنظيف",
        plumbing: "سباكة",
        electrical: "كهرباء",
        painting: "دهانات",

        // Booking
        bookingTitle: "احجز خدمة",
        selectService: "اختر الخدمة",
        selectDate: "اختر التاريخ",
        selectTime: "اختر الوقت",
        notes: "ملاحظات",
        submitBooking: "تأكيد الحجز",
        bookingSuccess: "تم الحجز بنجاح!",

        // Footer
        footerRights: "جميع الحقوق محفوظة",
        footerTagline: "نربطك بأفضل مزودي الخدمات",

        // Dashboard
        adminDashboard: "لوحة التحكم",
        manageBookings: "إدارة الحجوزات",
        approve: "موافقة",
        reject: "رفض",
        pending: "قيد الانتظار",
        confirmed: "مؤكد",
        rejected: "مرفوض",
        status: "الحالة",
    },
    en: {
        // Navbar
        home: "Home",
        services: "Services",
        bookNow: "Book Now",
        dashboard: "Dashboard",
        profile: "Profile",
        login: "Login",
        register: "Sign Up",
        logout: "Logout",
        myBookings: "My Bookings",
        appName: "AAKhadanaty",

        // Login Page
        loginTitle: "Login",
        loginDesc: "Enter your credentials to access your account",
        email: "Email",
        password: "Password",
        loading: "Loading...",
        noAccount: "Don't have an account?",
        createAccount: "Create Account",
        loginSuccess: "Logged in successfully!",
        loginError: "Invalid credentials",
        fillAllFields: "Please fill all fields",
        loginErrorGeneral: "An error occurred while logging in",

        // Register Page
        registerTitle: "Create a New Account",
        registerDesc: "Create an account to access all services",
        fullName: "Full Name",
        phone: "Phone Number",
        confirmPassword: "Confirm Password",
        alreadyHaveAccount: "Already have an account?",
        registerBtn: "Create Account",
        registerSuccess: "Account created successfully!",
        passwordMismatch: "Passwords do not match",

        // Index Page
        heroTitle: "Reliable Home Services",
        heroSubtitle: "Connecting you with the best home service providers",
        ourServices: "Our Services",
        bookService: "Book a Service",

        // Services
        cleaning: "Cleaning",
        plumbing: "Plumbing",
        electrical: "Electrical",
        painting: "Painting",

        // Booking
        bookingTitle: "Book a Service",
        selectService: "Select Service",
        selectDate: "Select Date",
        selectTime: "Select Time",
        notes: "Notes",
        submitBooking: "Confirm Booking",
        bookingSuccess: "Booked successfully!",

        // Footer
        footerRights: "All rights reserved",
        footerTagline: "Connecting you with the best service providers",

        // Dashboard
        adminDashboard: "Admin Dashboard",
        manageBookings: "Manage Bookings",
        approve: "Approve",
        reject: "Reject",
        pending: "Pending",
        confirmed: "Confirmed",
        rejected: "Rejected",
        status: "Status",
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem("language") as Language | null;
        return saved || "ar";
    });

    const isRTL = language === "ar";

    useEffect(() => {
        const html = document.documentElement;
        html.setAttribute("lang", language);
        html.setAttribute("dir", isRTL ? "rtl" : "ltr");
        localStorage.setItem("language", language);
    }, [language, isRTL]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }
    return context;
};
