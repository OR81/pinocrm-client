# سایت پینو سایت

وب‌سایت کامل پینو سایت — لندینگ، خدمات، کلاس‌ها، احراز هویت و دو داشبورد (دانشجو و استاد).

ساخته‌شده با **React 19 + Vite + Tailwind CSS v4**، راست‌چین، با پالت برند و لوگوی خودتان.

---

## اجرا

```bash
npm install
npm run dev            # http://localhost:5174
```

## بیلد

```bash
npm run build          # dist/  → روی هاست
npm run build:single   # dist-single/index.html → یک فایل مستقل برای دمو
```

---

## صفحات

| مسیر | صفحه |
|---|---|
| `/` | لندینگ: هیرو، چرا ما، **بخش ثبت‌نام** (`#register`)، خدمات، استاد، نظرات، سوالات، CTA |
| `/services` | خدمات — هر سرویس با «دقیقاً چه کاری می‌کند»، مشکل رایج و نتیجه |
| `/courses` | لیست کلاس‌ها + جدول مقایسه + تقویم یکشنبه‌ها |
| `/courses/n8n` | صفحه اختصاصی دوره اتوماسیون با n8n |
| `/courses/python` | صفحه اختصاصی دوره برنامه‌نویسی پایتون |
| `/about` | درباره ما و تماس |
| `/login` | ورود (با سوییچ نقش دانشجو/استاد برای دمو) |
| `/register` | ثبت‌نام — همان فرم و منطق `app.js` (انتخاب دوره، خلاصه سفارش، شمارش معکوس، درگاه) |
| `/forgot-password` | بازیابی رمز در سه مرحله (موبایل → کد → رمز جدید) |
| `/dashboard/student` | داشبورد دانشجو |
| `/dashboard/instructor` | داشبورد استاد |

مسیریابی با `HashRouter` است تا روی هر هاستی بدون تنظیم rewrite کار کند.

---

## تم روشن و تیره

هر دو تم پشتیبانی می‌شود. کلید تعویض در هدر سایت، هدر داشبوردها و بالای صفحات ورود/بازیابی رمز است.

- انتخاب کاربر در `localStorage` با کلید `pino.theme` ذخیره می‌شود.
- اگر کاربر چیزی انتخاب نکرده باشد، از تنظیم سیستم‌عامل (`prefers-color-scheme`) پیروی می‌کند.
- تم روی `<html data-theme="light|dark">` اعمال می‌شود.

پیاده‌سازی بر پایه **توکن‌های معنایی** است، نه کلاس‌های `dark:` پراکنده:

```
--color-page  --color-surface  --color-surface-2  --color-surface-3
--color-line  --color-line-soft
--color-fg    --color-fg2      --color-fg-muted   --color-fg-subtle
```

کامپوننت‌ها از `bg-surface`، `text-fg`، `border-line` و … استفاده می‌کنند؛ در بلوک `[data-theme='dark']` فقط
مقدار همین متغیرها عوض می‌شود و کل سایت تیره می‌شود. تینت‌های brand و رنگ‌های وضعیت (emerald/amber/rose)
هم برای پس‌زمینه تیره بازتعریف شده‌اند.

بخش‌های هیرو و پنل خلاصه سفارش عمداً در هر دو تم تیره می‌مانند — بخشی از هویت بصری برند هستند.

---

## صفحه ثبت‌نام

منطق صفحه ثبت‌نام دقیقاً از `app.js` شما پورت شده است:

| رفتار در `app.js` | معادل در React |
|---|---|
| همگام‌سازی کارت‌های دوره با فرم | `useRegister()` — یک state واحد برای انتخاب دوره |
| محاسبه زنده خلاصه سفارش | `summary` (جمع کل، قسط اول، مانده) |
| شمارش معکوس تا شروع دوره | `useCountdown()` + کامپوننت `Countdown` |
| نوار چسبان پایین موبایل | `MobileBar` — با همان منطق «فرم در دید هست یا نه» |
| نرمال‌سازی موبایل (۰۰۹۸، ۹۸، ارقام فارسی) | `normalizeMobile()` — کد یکسان |
| اعتبارسنجی و اسکرول به اولین خطا | `validate()` + `scrollIntoView` |
| قفل دکمه و «در حال انتقال به درگاه…» | حالت `submitting` |

فایل‌ها: `src/components/register/useRegister.js` و `RegisterSection.jsx`

این بخش هم در صفحه اصلی (`#register`) و هم در صفحه `/register` استفاده می‌شود — یک منبع، دو محل نمایش.

نقطه اتصال به بک‌اند در `useRegister.js` با `// TODO` مشخص شده:
`POST /enrollments` → `{ paymentUrl }` و سپس ریدایرکت به درگاه.

> صفحه ورود طبق درخواست شما دست‌نخورده مانده؛ فقط رنگ‌هایش به توکن‌های معنایی تبدیل شده تا در تم تیره هم درست دیده شود.

---

## سیستم طراحی

توکن‌ها دقیقاً از `app.css` پروژه خودتان استخراج شده و در `src/app.css` داخل `@theme` تعریف شده‌اند:

```
brand-500  #3a86ff      ink-900  #141a27
brand-600  #2078ff      ink-950  #0a0e18
brand-700  #1462db      ink-200  #d5d9e2
```

کلاس‌های کامپوننتی موجود در پروژه شما هم عیناً بازتعریف شده‌اند تا کدهای قبلی سازگار بمانند:

`.container-x` · `.card` · `.chip` · `.field` · `.field-error` · `.label` · `.section-title` · `.section-sub` · `.grid-bg` · `.course-card[data-selected]`

به‌علاوه چند کلاس دکمه اضافه شده: `.btn` · `.btn-primary` · `.btn-ghost` · `.btn-light` · `.btn-outline-light`

**فونت:** Vazirmatn variable، به‌صورت لوکال باندل شده (`src/assets/vazirmatn-var.woff2`) — بدون CDN.

**لوگو:** فایل PNG شما به SVG برداری تبدیل شده و در `src/components/Logo.jsx` قرار دارد. با `currentColor` رنگ می‌گیرد:

```jsx
<Logo className="h-10 w-10 text-brand-600" />   // روی پس‌زمینه روشن
<Logo className="h-12 w-12 text-brand-500" />   // روی پس‌زمینه تیره
<LogoWordmark markClass="h-9 w-9 text-brand-600" />  // لوگو + نام برند
```

---

## ساختار

```
src/
├── app.css                    ← توکن‌های برند و کلاس‌های کامپوننتی
├── data/site.js               ← ★ تمام محتوای سایت (دوره‌ها، خدمات، نظرات، FAQ)
├── components/
│   ├── Logo.jsx               ← لوگوی برداری + ورد‌مارک
│   ├── Icon.jsx               ← آیکون‌های خطی، بدون کتابخانه خارجی
│   ├── ui.jsx                 ← Chip، SectionHead، CheckList، Accordion، StatCard، Bar…
│   ├── Navbar.jsx / Footer.jsx
│   ├── AuthLayout.jsx         ← پوسته دوستونه صفحات ورود/ثبت‌نام
│   └── DashboardShell.jsx     ← سایدبار + هدر مشترک دو داشبورد
└── pages/                     ← ۱۱ صفحه
```

### ویرایش محتوا

تقریباً همه متن‌ها در `src/data/site.js` هستند: مشخصات دوره‌ها، سرفصل ۱۶ جلسه هرکدام، سوالات متداول، خدمات، نظرات و اطلاعات تماس. برای تغییر شهریه، ساعت کلاس یا اضافه کردن دوره سوم فقط همین فایل را ویرایش کنید — صفحات خودشان به‌روز می‌شوند.

---

## اتصال به API

فرم‌ها فعلاً شبیه‌سازی‌شده‌اند. نقاط اتصال با کامنت `// TODO` مشخص شده‌اند:

| فایل | endpoint پیشنهادی |
|---|---|
| `pages/Login.jsx` | `POST /auth/login` → `{ token, user }` |
| `pages/Register.jsx` | `POST /auth/register` → `{ token, user }` |
| `pages/ForgotPassword.jsx` | `POST /auth/forgot-password` · `POST /auth/verify-code` · `POST /auth/reset-password` |
| `pages/StudentDashboard.jsx` | `GET /me/courses` · `GET /me/sessions` · `GET /me/assignments` · `GET /me/payments` |
| `pages/InstructorDashboard.jsx` | `GET /teach/classes` · `GET /attendance` · `PUT /attendance` · `GET /submissions` |

> پنل مدیریت (ادمین) پروژه جداگانه‌ای است که لایه API کاملش در فایل `API.md` همان پروژه مستند شده.

---

## نکات فنی

- تمام اعداد با `toFa()` در `components/ui.jsx` به فارسی تبدیل می‌شوند (جداکننده `٬`، ممیز `٫`).
- کلاس `tnum` روی ستون‌های عددی، اعداد را هم‌عرض می‌کند تا جدول‌ها نلرزند.
- برای اعداد ترکیبی مثل `۴۸۰+` از `dir="auto"` استفاده شده تا ترتیب دوجهته درست بماند.
- صفحات احراز هویت و داشبوردها هدر و فوتر عمومی ندارند (آرایه `BARE` در `App.jsx`).
