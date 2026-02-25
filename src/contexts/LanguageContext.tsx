import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "ar" | "en";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    isRTL: boolean;
    formatCurrency: (amount: number) => string;
    formatNumber: (num: number) => string;
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
        registerDesc: "سجّل الآن واستمتع بخدماتنا",
        fullName: "الاسم الكامل",
        phone: "رقم الهاتف",
        confirmPassword: "تأكيد كلمة المرور",
        alreadyHaveAccount: "لديك حساب بالفعل؟",
        registerBtn: "إنشاء الحساب",
        registerSuccess: "تم إنشاء الحساب بنجاح!",
        passwordMismatch: "كلمتا المرور غير متطابقتين",
        passwordMin: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
        emailRegistered: "البريد الإلكتروني مسجل بالفعل",
        registerError: "حصل خطأ أثناء إنشاء الحساب",
        creatingAccount: "جاري الإنشاء...",
        enterName: "أدخل اسمك",
        minChars: "6 أحرف على الأقل",

        // Index Page (Hero)
        heroTitle: "خدمات منزلية",
        heroTitleHighlight: "احترافية",
        heroTitleEnd: "بين يديك",
        heroDesc: "احجز خدمات التنظيف والصيانة والسباكة وغيرها بسهولة. فنيين محترفين وأسعار تنافسية بالجنيه المصري.",
        browseServices: "تصفح الخدمات",
        bookNowBtn: "احجز الآن",
        ourServices: "خدماتنا",
        bookService: "احجز خدمة",

        // Stats
        happyClients: "عميل سعيد",
        completedServices: "خدمة مكتملة",
        generalRating: "تقييم عام",
        continuousSupport: "دعم متواصل",

        // Features
        featuredServices: "خدماتنا المميزة",
        featuredServicesDesc: "اختر من بين مجموعة واسعة من الخدمات المنزلية والشخصية",
        viewAllServices: "عرض جميع الخدمات",
        whyUs: "لماذا أخدماتي؟",
        qualityGuarantee: "ضمان الجودة",
        qualityGuaranteeDesc: "نضمن لك جودة الخدمة أو استرداد المبلغ",
        professionalTechnicians: "فنيين محترفين",
        professionalTechniciansDesc: "جميع مقدمي الخدمات معتمدين ومدربين",
        support24: "دعم على مدار الساعة",
        support24Desc: "فريق خدمة العملاء متاح ٢٤ ساعة",

        // Testimonials
        customerReviews: "آراء عملائنا",
        customerReviewsDesc: "اكتشف تجارب عملائنا مع خدماتنا",

        // CTA
        readyToBook: "جاهز تحجز خدمتك؟",
        ctaDesc: "سجّل الآن واحجز أي خدمة منزلية بسهولة. أسعار تبدأ من",
        ctaDescEnd: "فقط!",

        // Services
        cleaning: "تنظيف",
        plumbing: "سباكة",
        electrical: "كهرباء",
        painting: "دهانات",
        maintenance: "صيانة",

        // Services Page
        allServices: "جميع الخدمات",
        allServicesDesc: "اختر الخدمة المناسبة من بين",
        availableService: "خدمة متاحة",
        searchService: "ابحث عن خدمة...",
        noResults: "لا توجد نتائج مطابقة لبحثك",
        all: "الكل",

        // Service Details
        serviceNotFound: "الخدمة غير موجودة",
        backToServices: "العودة للخدمات",
        review: "تقييم",
        certifiedProvider: "مقدم الخدمة المعتمد",
        priceIncluded: "السعر يشمل المواد والعمالة",
        bookThisService: "احجز هذه الخدمة",
        serviceGuarantee: "ضمان جودة الخدمة",
        certifiedTechs: "فنيين معتمدين",
        freeCancellation: "إمكانية الإلغاء المجاني",
        similarServices: "خدمات مشابهة",
        details: "التفاصيل",

        // Booking
        bookingTitle: "احجز خدمتك الآن",
        bookingDesc: "املأ البيانات التالية لإتمام الحجز",
        bookingData: "بيانات الحجز",
        selectService: "اختر الخدمة",
        selectDate: "اختر التاريخ",
        selectTime: "اختر الوقت",
        notes: "ملاحظات",
        submitBooking: "تأكيد الحجز",
        bookingSuccess: "تم الحجز بنجاح!",
        bookingSuccessMsg: "تم إرسال طلب الحجز بنجاح! سيتم مراجعته من الإدارة",
        bookingError: "حدث خطأ أثناء إرسال الحجز. تأكد من تسجيل الدخول",
        serviceLabel: "الخدمة",
        dateLabel: "التاريخ",
        timeLabel: "الوقت",
        enterFullName: "أدخل اسمك",
        phoneLabel: "رقم الهاتف",
        emailLabel: "البريد الإلكتروني",
        notesPlaceholder: "أضف أي تفاصيل أو ملاحظات...",
        bookingSummary: "ملخص الحجز",
        expectedDuration: "المدة المتوقعة",
        total: "الإجمالي",
        chooseService: "اختر خدمة",
        chooseDate: "اختر تاريخ",
        chooseTime: "اختر وقت",
        enterValidName: "أدخل الاسم",
        enterValidPhone: "أدخل رقم هاتف صحيح (11 رقم)",
        enterValidEmail: "أدخل بريد إلكتروني صحيح",
        bookingSuccessTitle: "تم الحجز بنجاح!",
        bookedServiceOn: "تم حجز خدمة",
        onDate: "بتاريخ",
        atTime: "الساعة",
        willContactYou: "سيتم التواصل معك لتأكيد الموعد.",
        homePage: "الرئيسية",
        required: "*",

        // Footer
        footerRights: "جميع الحقوق محفوظة",
        footerTagline: "نربطك بأفضل مزودي الخدمات",
        footerBrand: "أخدماتي",
        footerBrandLetter: "أ",
        footerDesc: "منصة متكاملة لحجز وإدارة الخدمات المنزلية والشخصية في مصر.",
        quickLinks: "روابط سريعة",
        popularServices: "الخدمات الشائعة",
        contactUs: "تواصل معنا",
        houseCleaning: "تنظيف منازل",
        acMaintenance: "صيانة تكييفات",
        plumbingService: "سباكة",
        location: "القاهرة، مصر",

        // Dashboard
        adminDashboard: "لوحة التحكم",
        welcomeDashboard: "مرحباً بك في لوحة إدارة أخدماتي",
        manageBookings: "إدارة الحجوزات",
        approve: "موافقة",
        reject: "رفض",
        pending: "قيد الانتظار",
        confirmed: "مؤكد",
        rejected: "مرفوض",
        status: "الحالة",
        totalRevenue: "إجمالي الإيرادات",
        totalBookings: "إجمالي الحجوزات",
        completedBookings: "حجوزات مكتملة",
        pendingBookings: "حجوزات قيد الانتظار",
        pendingBookingsManage: "إدارة الحجوزات المعلقة",
        loadingBookings: "جاري التحميل...",
        noPendingBookings: "لا توجد حجوزات معلقة حالياً",
        allBookingsLabel: "جميع الحجوزات",
        monthlyBookings: "الحجوزات الشهرية",
        bookingsStatus: "حالة الحجوزات",
        acceptBooking: "قبول",
        rejectBooking: "رفض",
        bookingAccepted: "تم قبول الحجز بنجاح ✅",
        bookingRejected: "تم رفض الحجز ❌",
        bookingUpdateError: "حدث خطأ أثناء تحديث الحجز",
        myProfile: "الملف الشخصي",
        january: "يناير",
        february: "فبراير",
        march: "مارس",

        // My Bookings
        myBookingsTitle: "حجوزاتي",
        trackOrders: "متابعة حالة طلباتك",
        loadingMyBookings: "جاري تحميل الحجوزات...",
        noBookings: "لا توجد حجوزات",
        pendingReview: "طلبك قيد المراجعة من قِبل الإدارة",
        bookingConfirmedMsg: "تم قبول طلبك! سيتواصل معك مقدم الخدمة قريباً",
        bookingRejectedMsg: "تم رفض طلبك",
        completed: "مكتمل",
        canceled: "ملغي",

        // Profile
        profileTitle: "الملف الشخصي",
        nameLabel: "الاسم",
        phoneNumber: "رقم الهاتف",
        saveChanges: "حفظ التغييرات",
        unknown: "غير معروف",
        profileSaved: "تم حفظ البيانات بنجاح",

        // Service Card
        categoryClean: "تنظيف",
        categoryMaintenance: "صيانة",
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
        registerDesc: "Sign up now and enjoy our services",
        fullName: "Full Name",
        phone: "Phone Number",
        confirmPassword: "Confirm Password",
        alreadyHaveAccount: "Already have an account?",
        registerBtn: "Create Account",
        registerSuccess: "Account created successfully!",
        passwordMismatch: "Passwords do not match",
        passwordMin: "Password must be at least 6 characters",
        emailRegistered: "Email is already registered",
        registerError: "An error occurred while creating the account",
        creatingAccount: "Creating...",
        enterName: "Enter your name",
        minChars: "At least 6 characters",

        // Index Page (Hero)
        heroTitle: "Professional",
        heroTitleHighlight: "Home Services",
        heroTitleEnd: "At Your Fingertips",
        heroDesc: "Book cleaning, maintenance, plumbing and more services easily. Professional technicians and competitive prices.",
        browseServices: "Browse Services",
        bookNowBtn: "Book Now",
        ourServices: "Our Services",
        bookService: "Book a Service",

        // Stats
        happyClients: "Happy Clients",
        completedServices: "Completed Services",
        generalRating: "General Rating",
        continuousSupport: "24/7 Support",

        // Features
        featuredServices: "Featured Services",
        featuredServicesDesc: "Choose from a wide range of home and personal services",
        viewAllServices: "View All Services",
        whyUs: "Why AAKhadanaty?",
        qualityGuarantee: "Quality Guarantee",
        qualityGuaranteeDesc: "We guarantee service quality or money back",
        professionalTechnicians: "Professional Technicians",
        professionalTechniciansDesc: "All service providers are certified and trained",
        support24: "24/7 Support",
        support24Desc: "Customer service team available 24 hours",

        // Testimonials
        customerReviews: "Customer Reviews",
        customerReviewsDesc: "Discover our customers' experiences with our services",

        // CTA
        readyToBook: "Ready to book your service?",
        ctaDesc: "Sign up now and book any home service easily. Prices start from",
        ctaDescEnd: "only!",

        // Services
        cleaning: "Cleaning",
        plumbing: "Plumbing",
        electrical: "Electrical",
        painting: "Painting",
        maintenance: "Maintenance",

        // Services Page
        allServices: "All Services",
        allServicesDesc: "Choose the right service from",
        availableService: "available services",
        searchService: "Search for a service...",
        noResults: "No results matching your search",
        all: "All",

        // Service Details
        serviceNotFound: "Service not found",
        backToServices: "Back to Services",
        review: "reviews",
        certifiedProvider: "Certified Service Provider",
        priceIncluded: "Price includes materials and labor",
        bookThisService: "Book This Service",
        serviceGuarantee: "Service quality guarantee",
        certifiedTechs: "Certified technicians",
        freeCancellation: "Free cancellation available",
        similarServices: "Similar Services",
        details: "Details",

        // Booking
        bookingTitle: "Book Your Service Now",
        bookingDesc: "Fill in the following details to complete your booking",
        bookingData: "Booking Details",
        selectService: "Select Service",
        selectDate: "Select Date",
        selectTime: "Select Time",
        notes: "Notes",
        submitBooking: "Confirm Booking",
        bookingSuccess: "Booked successfully!",
        bookingSuccessMsg: "Booking request sent successfully! It will be reviewed by management",
        bookingError: "An error occurred while submitting the booking. Make sure you're logged in",
        serviceLabel: "Service",
        dateLabel: "Date",
        timeLabel: "Time",
        enterFullName: "Enter your name",
        phoneLabel: "Phone Number",
        emailLabel: "Email",
        notesPlaceholder: "Add any details or notes...",
        bookingSummary: "Booking Summary",
        expectedDuration: "Expected Duration",
        total: "Total",
        chooseService: "Choose a service",
        chooseDate: "Choose a date",
        chooseTime: "Choose a time",
        enterValidName: "Enter your name",
        enterValidPhone: "Enter a valid phone number (11 digits)",
        enterValidEmail: "Enter a valid email address",
        bookingSuccessTitle: "Booking Successful!",
        bookedServiceOn: "Service booked:",
        onDate: "on",
        atTime: "at",
        willContactYou: "We will contact you to confirm the appointment.",
        homePage: "Home",
        required: "*",

        // Footer
        footerRights: "All rights reserved",
        footerTagline: "Connecting you with the best service providers",
        footerBrand: "AAKhadanaty",
        footerBrandLetter: "A",
        footerDesc: "A comprehensive platform for booking and managing home and personal services in Egypt.",
        quickLinks: "Quick Links",
        popularServices: "Popular Services",
        contactUs: "Contact Us",
        houseCleaning: "House Cleaning",
        acMaintenance: "AC Maintenance",
        plumbingService: "Plumbing",
        location: "Cairo, Egypt",

        // Dashboard
        adminDashboard: "Admin Dashboard",
        welcomeDashboard: "Welcome to AAKhadanaty Dashboard",
        manageBookings: "Manage Bookings",
        approve: "Approve",
        reject: "Reject",
        pending: "Pending",
        confirmed: "Confirmed",
        rejected: "Rejected",
        status: "Status",
        totalRevenue: "Total Revenue",
        totalBookings: "Total Bookings",
        completedBookings: "Completed Bookings",
        pendingBookings: "Pending Bookings",
        pendingBookingsManage: "Manage Pending Bookings",
        loadingBookings: "Loading...",
        noPendingBookings: "No pending bookings at the moment",
        allBookingsLabel: "All Bookings",
        monthlyBookings: "Monthly Bookings",
        bookingsStatus: "Bookings Status",
        acceptBooking: "Accept",
        rejectBooking: "Reject",
        bookingAccepted: "Booking accepted successfully ✅",
        bookingRejected: "Booking rejected ❌",
        bookingUpdateError: "An error occurred while updating the booking",
        myProfile: "Profile",
        january: "January",
        february: "February",
        march: "March",

        // My Bookings
        myBookingsTitle: "My Bookings",
        trackOrders: "Track your orders status",
        loadingMyBookings: "Loading bookings...",
        noBookings: "No bookings found",
        pendingReview: "Your request is under review by management",
        bookingConfirmedMsg: "Your request has been accepted! The service provider will contact you soon",
        bookingRejectedMsg: "Your request has been rejected",
        completed: "Completed",
        canceled: "Canceled",

        // Profile
        profileTitle: "Profile",
        nameLabel: "Name",
        phoneNumber: "Phone Number",
        saveChanges: "Save Changes",
        unknown: "Unknown",
        profileSaved: "Data saved successfully",

        // Service Card
        categoryClean: "Cleaning",
        categoryMaintenance: "Maintenance",
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

    const formatCurrency = (amount: number): string => {
        if (language === "ar") {
            return `${amount} ج.م`;
        }
        return `EGP ${amount}`;
    };

    const formatNumber = (num: number): string => {
        const locale = language === "ar" ? "ar-EG" : "en-US";
        return new Intl.NumberFormat(locale).format(num);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, isRTL, formatCurrency, formatNumber }}>
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
