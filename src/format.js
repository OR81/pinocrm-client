/* ---------------------------------------------------------------
   همه‌ی تبدیل‌های نمایشی اینجاست.
   قاعده: بک‌اند تاریخ را میلادی و عدد را لاتین می‌فرستد،
   تبدیل به شمسی و فارسی کار همین فایل است.
--------------------------------------------------------------- */

const TIME_ZONE = "Asia/Tehran";


/* ۴۵۲ ← 452 */

export const faNumber = (value) =>
  typeof value === "number" ? value.toLocaleString("fa-IR") : value;


/* ۱۱:۰۰ ← 2026-05-06T11:00:00+03:30 */

const timeFormatter = new Intl.DateTimeFormat("fa-IR", {

  hour: "2-digit",

  minute: "2-digit",

  hourCycle: "h23",

  timeZone: TIME_ZONE,

});

export const faTime = (iso) => timeFormatter.format(new Date(iso));


/* چهارشنبه ← 2026-05-06 */

const weekdayFormatter = new Intl.DateTimeFormat("fa-IR", {

  weekday: "long",

  timeZone: TIME_ZONE,

});

export const faWeekday = (iso) => weekdayFormatter.format(new Date(iso));


/* ۱۶ ← 2026-05-06 */

const dayFormatter = new Intl.DateTimeFormat("fa-IR", {

  day: "numeric",

  timeZone: TIME_ZONE,

});

export const faDay = (iso) => dayFormatter.format(new Date(iso));


/* چهارشنبه ۱۶ اردیبهشت ← 2026-05-06 */

const fullDateFormatter = new Intl.DateTimeFormat("fa-IR", {

  weekday: "long",

  day: "numeric",

  month: "long",

  timeZone: TIME_ZONE,

});

export const faFullDate = (iso) => fullDateFormatter.format(new Date(iso));


/* ۴۰۱۱۲۳۴۵ ← "40112345"  (رشته‌هایی مثل شماره دانشجویی) */

export const faDigits = (text) =>
  String(text).replace(/[0-9]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);


/* ۸:۰۰ ← 8 */

export const faHourLabel = (hour) => `${faNumber(hour)}:۰۰`;


/* ۶۶۰ ← 2026-05-06T11:00:00+03:30   (دقیقه از نیمه‌شب، به وقت تهران)
   برای محاسبه‌ی جای بلوک در تقویم لازم است. */

const clockFormatter = new Intl.DateTimeFormat("en-US", {

  hour: "2-digit",

  minute: "2-digit",

  hourCycle: "h23",

  timeZone: TIME_ZONE,

});

export const minutesOfDay = (iso) => {

  const [hour, minute] = clockFormatter.format(new Date(iso)).split(":");

  return Number(hour) * 60 + Number(minute);

};


/* رنگ هر دوره از روی id ساخته می‌شود تا در همه‌ی بخش‌ها یکسان بماند
   و بک‌اند لازم نباشد فیلد رنگ بفرستد. */

const COURSE_COLORS = ["#2078ff", "#7c3aed", "#059669", "#d97706"];

export const courseColor = (id) =>
  COURSE_COLORS[(id - 1) % COURSE_COLORS.length];