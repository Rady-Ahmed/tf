@echo off
chcp 65001 >nul
title رفع منصة آل راضي إلى GitHub
cls
echo ========================================================
echo   🌟 رفع منصة عائلة آل راضي إلى GitHub و Vercel
echo ========================================================
echo.
echo المستودع المحلي جاهز ومُثبّت ومُعتمد (Git Committed).
echo.
echo الخطوات المتبقية:
echo 1. افتح حسابك على https://github.com
echo 2. اضغط على زر "New Repository" (مستودع جديد)
echo 3. سمّه مثلاً: al-rady-legacy واجعله Public أو Private
echo 4. انسخ رابط المستودع (مثال: https://github.com/username/al-rady-legacy.git)
echo.
set /p REPO_URL="الصق رابط مستودع GitHub هنا واضغط Enter: "

if "%REPO_URL%"=="" (
    echo.
    echo لم يتم إدخال رابط. تم إلغاء العملية.
    pause
    exit /b
)

echo.
echo جارٍ ربط المستودع ورفع الملفات...
git branch -M main
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git push -u origin main

echo.
if %errorlevel% equ 0 (
    echo ========================================================
    echo ✅ تم رفع المشروع بنجاح إلى GitHub!
    echo.
    echo الآن لنشره على Vercel في 30 ثانية:
    echo 1. افتح https://vercel.com وسجل الدخول بحساب GitHub
    echo 2. اضغط "Add New..." ثم "Project"
    echo 3. اختر مستودع al-rady-legacy واضغط "Deploy"
    echo ========================================================
) else (
    echo ❌ حدث خطأ أثناء الرفع. تأكد من صحة الرابط وصلاحيات حسابك على GitHub.
)
echo.
pause
