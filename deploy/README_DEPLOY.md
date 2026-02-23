ملف إرشادات للنشر على خادم Ubuntu (VPS)

متطلبات أساسية على الخادم:
- Ubuntu 20.04+، Node.js (v18+)، nginx، git
- الوصول إلى MongoDB (Atlas أو mongod محلي)

خطوات سريعة:

1. استنساخ المشروع:

```bash
git clone <repo-url> aakhadanaty && cd aakhadanaty
```

إذا أردت دفع هذا المشروع إلى الريبو الذي زودتني به (`git@github.com:kandil565/AAKhadanaty_App-master.git`)، يمكنك تشغيل السكربت التالي محلياً من جذر المشروع بعد التأكّد من إعداد مفتاح SSH:

```bash
chmod +x deploy/push_to_github.sh
./deploy/push_to_github.sh
```


2. تثبيت تبعيات الفرونت والباكند:

```bash
# من جذر المشروع
npm install
cd backend
npm install
```

3. تجهيز متغيرات البيئة في الخادم:

```bash
# أنشئ ملف backend/.env واكتب القيم الحقيقية
cp backend/.env.example backend/.env
# ثم عدّل backend/.env بالقيم الحقيقية (MONGODB_URI, JWT_SECRET)
```

4. بناء الفرونتند:

```bash
# من جذر المشروع
npm run build
# سيُنتج مجلد dist
```

5. نسخ ملفات البناء لموقع الويب (مثال مسار):

```bash
sudo mkdir -p /var/www/aakhadanaty
sudo cp -r dist/* /var/www/aakhadanaty/
sudo chown -R www-data:www-data /var/www/aakhadanaty
```

6. إعداد Nginx: انسخ `deploy/nginx.conf` إلى `/etc/nginx/sites-available/aakhadanaty` ثم فعّله:

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/aakhadanaty
sudo ln -s /etc/nginx/sites-available/aakhadanaty /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

7. تشغيل الباكند بواسطة PM2:

```bash
# تثبيت pm2 إن لم يكن مثبتاً
sudo npm install -g pm2
# من جذر المشروع
pm2 start deploy/pm2.config.js
pm2 save
pm2 status
```

8. إعداد HTTPS (مقترح):

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d example.com
```

نصائح:
- غيّر `server_name` في `deploy/nginx.conf` إلى اسم نطاقك.
- استخدم MongoDB Atlas إن أردت قاعدة بيانات مُدارة واملأ `MONGODB_URI` بقيمة الاتصال.
- لمراقبة السجلات:
  - `pm2 logs aakhadanaty-backend`
  - `sudo journalctl -u nginx --since "1 hour ago"`
