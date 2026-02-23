#!/usr/bin/env bash
# سكربت سريع لإعداد الريموت ودفع الكود إلى GitHub (SSH)


set -e

REPO="git@github.com:kandil565/AAKhadanaty_App-master.git"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "يرجى تشغيل هذا السكربت من جذر المشروع حيث يوجد .git/ (أو أنشئ مستودعًا محليًا باستخدام 'git init')"
  exit 1
fi

# فحص اتصال SSH بـ GitHub
echo "اختبار اتصال SSH إلى GitHub..."
if ssh -o BatchMode=yes -T git@github.com 2>&1 | grep -iq "success\|authenticated\|Hi"; then
  echo "اتصال SSH ناجح. متابعة الدفع..."
else
  echo "فشل اختبار SSH. تأكد من إعداد مفتاح SSH وإضافته إلى حساب GitHub." >&2
  echo "راجع deploy/README_DEPLOY.md للخطوات أو استخدم HTTPS remote بدلاً من SSH." >&2
  exit 2
fi

# احصل على الفرع الحالي وادفعه
BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo "استخدام الفرع الحالي: $BRANCH"

git remote remove origin 2>/dev/null || true
git remote add origin "$REPO"

# تأكد أن backend/.env غير متتبّع
if git ls-files --error-unmatch backend/.env >/dev/null 2>&1; then
  echo "backend/.env متتبّع حاليًا في Git — إزالته من الفهرس للحفاظ على السرية..."
  git rm --cached backend/.env || true
fi

git add -A
git commit -m "chore: update/initial project import" || true
git push -u origin $BRANCH

echo "تم الدفع إلى $REPO على الفرع $BRANCH"
