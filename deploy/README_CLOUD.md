نشر سحابي مبسّط: Vercel (فرونت) + Render (باكند)

ملاحظات سريعة:
- ربط الريبو مباشرة أسهل (GitHub/GitLab/Bitbucket).
- جهّز القيم السرية في صفحات إعدادات كل خدمة (MONGODB_URI, JWT_SECRET).

Front-end (Vite) على Vercel:
1. سجّل في Vercel ووصّل حساب Git.
2. اختر المشروع (المجلد الجذر يحتوي على `package.json`).
3. إعدادات البناء:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. اضف أي متغيّرات بيئة إن احتاجت الواجهة الوصول إلى API (مثال `VITE_API_BASE_URL=https://example.com/api`).
5. نشر وسيحصل على نطاق Vercel افتراضي؛ ابدّل إلى نطاقك الشخصي إن أردت.

Back-end على Render (مُماثل على Railway):
1. أنشئ Web Service جديد على Render.
2. اختر الربط بالريبو وادخل مسار المجلد `backend` إن طلب.
3. أوامر البناء/التشغيل:
   - Build Command: (لا حاجة غالباً) اترك فارغاً أو `npm install`
   - Start Command: `npm start` (server.js يستخدم `process.env.PORT`)
4. أضف متغيرات البيئة في واجهة Render:
   - `MONGODB_URI` — سلسلة الاتصال
   - `JWT_SECRET`
   - `NODE_ENV=production`
5. اختر خطة وفوراً بعد التشغيل سيجعل الباكند متاحاً على نطاق Render.

نقاط مهمة:
- إن استُخدمت Vercel للفرونت وRender للباكند، ضبّط `VITE_API_BASE_URL` في إعدادات Vercel ليشير إلى رابط الخدمة على Render.
- تحقق من سياسات CORS في الباكند (ملف `backend/server.js` يستخدم `cors()` بدون قيود؛ إن أردت تقييدها عيّن `origin`).
- إن أردت أجهز ملفات CI/CD أو إعداد Render `render.yaml` تلقائياً بعد حصولي على رابط الريبو.

أخبرني برابط الريبو أو صلاحية SSH وسأكمل نشر الفرونت على Vercel والباكند على Render (أو أنفّذ نشراً يدوياً إن وفّرت بيانات الدخول للخادم).

إعداد النشر الأوتوماتيكي عبر GitHub Actions
1. أضف الأسرار التالية في صفحة GitHub repo → Settings → Secrets and variables → Actions:
   - `VERCEL_TOKEN` — توكن وصول Vercel (Account Settings → Tokens)
   - `VERCEL_ORG_ID` — Organization ID من إعدادات Vercel للمشروع
   - `VERCEL_PROJECT_ID` — Project ID من إعدادات Vercel
   - `RENDER_API_KEY` — API Key من Render (Account → API Keys)
   - `RENDER_SERVICE_ID` — Service ID للباكند على Render

2. عند الدفع إلى `main`، سير العمل `.github/workflows/deploy.yml` سيبني الفرونت ويستخدم `vercel/action` لنشره، ثم سيستدعي API Render لبدء نشر الباكند.

ملاحظات: لو تفضّل سأرشدك خطوة بخطوة للحصول على هذه القيم أو أمدّك بأوامر جاهزة للحصول عليها بعد تسجيل الدخول لكل خدمة.
