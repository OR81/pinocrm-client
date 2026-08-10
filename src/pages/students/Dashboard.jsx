import { useState } from 'react'
import DashboardShell from '../../components/DashboardShell'
import Icon from '../../components/Icon'
import { Chip, StatCard, Bar, Avatar, money, num, toFa } from '../../components/ui'
import { COURSES, INSTRUCTOR } from '../../data/site'
const NAV = [
  {
    label: 'یادگیری',
    items: [
      { key: 'home', label: 'خانه', icon: 'grid' },
      { key: 'courses', label: 'کلاس‌های من', icon: 'book', badge: toFa(2) },
      { key: 'sessions', label: 'جلسات و ویدیوها', icon: 'play', badge: toFa(19) },
      { key: 'assignments', label: 'تکالیف', icon: 'file', badge: toFa(2) },
    ],
  },
  {
    label: 'حساب من',
    items: [
      { key: 'payments', label: 'شهریه و اقساط', icon: 'wallet' },
      { key: 'profile', label: 'پروفایل', icon: 'user' },
    ],
  },
]

const MY_COURSES = [
  { slug: 'n8n', held: 9, total: 16, attendance: 89, next: 'جلسه ۱۱ — ادغام با OpenAI', nextDate: '۱۴۰۵/۰۵/۱۸' },
  { slug: 'python', held: 10, total: 16, attendance: 84, next: 'جلسه ۱۱ — pandas بخش اول', nextDate: '۱۴۰۵/۰۵/۱۸' },
]

const RECORDINGS = [
  { n: 10, course: 'اتوماسیون با n8n', title: 'اتصال به تلگرام، ایمیل و پیامک', date: '۱۴۰۵/۰۵/۱۱', dur: '۲:۲۴' },
  { n: 10, course: 'برنامه‌نویسی پایتون', title: 'کتابخانه requests و کار با API', date: '۱۴۰۵/۰۵/۱۱', dur: '۲:۳۱' },
  { n: 9, course: 'اتوماسیون با n8n', title: 'خطایابی، Error Workflow و Retry', date: '۱۴۰۵/۰۵/۰۴', dur: '۲:۱۸' },
  { n: 9, course: 'برنامه‌نویسی پایتون', title: 'وراثت، متد جادویی و دکوراتور', date: '۱۴۰۵/۰۵/۰۴', dur: '۲:۲۹' },
]

const ASSIGNMENTS = [
  { title: 'تمرین جلسه ۱۰ — ساخت ربات اطلاع‌رسان تلگرام', course: 'اتوماسیون با n8n', due: '۱۴۰۵/۰۵/۱۷', status: 'open' },
  { title: 'تمرین جلسه ۱۰ — گرفتن داده از API آب‌وهوا', course: 'برنامه‌نویسی پایتون', due: '۱۴۰۵/۰۵/۱۷', status: 'open' },
  { title: 'تمرین جلسه ۸ — همگام‌سازی با PostgreSQL', course: 'اتوماسیون با n8n', due: '۱۴۰۵/۰۵/۰۳', status: 'graded', score: 18.5 },
  { title: 'تمرین جلسه ۸ — کلاس و آبجکت', course: 'برنامه‌نویسی پایتون', due: '۱۴۰۵/۰۵/۰۳', status: 'graded', score: 17 },
]

const INVOICES = [
  { no: 'PN-1405-5008', course: 'اتوماسیون با n8n', inst: '۲ از ۳', amount: 6166666, status: 'paid', date: '۱۴۰۵/۰۵/۰۷' },
  { no: 'PN-1405-5011', course: 'برنامه‌نویسی پایتون', inst: '۲ از ۳', amount: 5300000, status: 'pending', date: '۱۴۰۵/۰۵/۲۵' },
  { no: 'PN-1405-5002', course: 'اتوماسیون با n8n', inst: '۱ از ۳', amount: 6166667, status: 'paid', date: '۱۴۰۵/۰۴/۰۷' },
]

const PAY_TONE = { paid: ['emerald', 'پرداخت شده'], pending: ['amber', 'در انتظار'], overdue: ['rose', 'معوق'] }

export default function StudentDashboard() {
  const [tab, setTab] = useState('home')
  const user = { name: 'وحید محبی', role: 'دانشجو · دو دوره فعال' }

  const titles = {
    home: ['خانه', 'خلاصه وضعیت تحصیلی شما'],
    courses: ['کلاس‌های من', 'پیشرفت و حضور در دوره‌ها'],
    sessions: ['جلسات و ویدیوها', 'ویدیوی ضبط‌شده و فایل‌های جلسات'],
    assignments: ['تکالیف', 'تمرین‌های ارسالی و نمره‌ها'],
    payments: ['شهریه و اقساط', 'فاکتورها و وضعیت پرداخت'],
    profile: ['پروفایل', 'اطلاعات حساب کاربری'],
  }

  return (
    <DashboardShell
      nav={NAV}
      active={tab}
      onNavigate={setTab}
      user={user}
      title={titles[tab][0]}
      sub={titles[tab][1]}
    >
      {tab === 'home' && <Home onTab={setTab} />}
      {tab === 'courses' && <MyCourses />}
      {tab === 'sessions' && <Sessions />}
      {tab === 'assignments' && <Assignments />}
      {tab === 'payments' && <Payments />}
      {tab === 'profile' && <Profile user={user} />}
    </DashboardShell>
  )
}

/* ── خانه ── */
function Home({ onTab }) {
  return (
    <div className="space-y-6">
      {/* بنر جلسه بعدی */}
      <div className="relative overflow-hidden rounded-3xl bg-ink-950 p-7">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Chip tone="light" icon="calendar">
              یکشنبه {toFa('۱۴۰۵/۰۵/۱۸')} — فردا
            </Chip>
            <h2 className="mt-4 text-xl font-extrabold text-white">جلسه بعدی شما</h2>
            <p className="mt-2 text-sm leading-7 text-ink-300">
              ساعت {toFa('۱۴:۰۰')} پایتون — pandas بخش اول
              <br />
              ساعت {toFa('۱۷:۰۰')} n8n — ادغام با OpenAI و ساخت ایجنت هوشمند
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button className="btn btn-light">
              <Icon name="play" className="h-4 w-4" />
              ورود به کلاس آنلاین
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon="book" label="دوره‌های فعال" value={toFa(2)} unit="دوره" foot="n8n و پایتون" />
        <StatCard icon="check" label="میانگین حضور" value="۸۶٪" foot="از ۱۹ جلسه برگزارشده" tone="emerald" />
        <StatCard icon="file" label="میانگین نمره" value="۱۷٫۸" unit="از ۲۰" foot="۸ تمرین تصحیح‌شده" tone="ink" />
        <StatCard icon="wallet" label="مانده شهریه" value={num(5300000)} unit="تومان" foot="سررسید ۱۴۰۵/۰۵/۲۵" tone="amber" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between border-b border-line-soft p-5">
              <h3 className="font-bold text-fg">پیشرفت دوره‌ها</h3>
              <button onClick={() => onTab('courses')} className="text-sm font-semibold text-brand-600">
                جزئیات
              </button>
            </div>
            <div className="divide-y divide-line-soft">
              {MY_COURSES.map((mc) => {
                const c = COURSES.find((x) => x.slug === mc.slug)
                return (
                  <div key={mc.slug} className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate font-bold text-fg">{c.title}</div>
                        <div className="mt-0.5 text-xs text-fg-subtle">
                          {c.weekday}‌ها {toFa(c.time)} · {INSTRUCTOR.name}
                        </div>
                      </div>
                      <span className="shrink-0 text-sm font-bold text-fg tnum">
                        {toFa(mc.held)}/{toFa(mc.total)}
                      </span>
                    </div>
                    <Bar value={mc.held} max={mc.total} className="mt-3.5" />
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-fg-subtle">
                      <span>
                        حضور شما: <span className="font-bold text-fg2 tnum">{toFa(mc.attendance)}٪</span>
                      </span>
                      <span>
                        بعدی: <span className="text-fg2">{mc.next}</span>
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between border-b border-line-soft p-5">
            <h3 className="font-bold text-fg">تکالیف باز</h3>
            <button onClick={() => onTab('assignments')} className="text-sm font-semibold text-brand-600">
              همه
            </button>
          </div>
          <ul className="divide-y divide-line-soft">
            {ASSIGNMENTS.filter((a) => a.status === 'open').map((a) => (
              <li key={a.title} className="p-5">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-700">
                    <Icon name="file" className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold leading-6 text-fg">{a.title}</div>
                    <div className="mt-1 text-xs text-fg-subtle">
                      {a.course} · مهلت <span className="tnum">{toFa(a.due)}</span>
                    </div>
                  </div>
                </div>
                <button className="btn btn-ghost mt-4 w-full py-2.5">ارسال پاسخ</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between border-b border-line-soft p-5">
          <h3 className="font-bold text-fg">آخرین ویدیوها</h3>
          <button onClick={() => onTab('sessions')} className="text-sm font-semibold text-brand-600">
            آرشیو کامل
          </button>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-4">
          {RECORDINGS.map((r, i) => (
            <div key={i} className="group rounded-2xl border border-line p-4 transition-colors hover:border-brand-300">
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-xl tile transition-colors group-hover:bg-brand-600">
                  <Icon name="play" className="h-4 w-4" />
                </span>
                <span className="text-[11px] text-fg-subtle tnum">{r.dur}</span>
              </div>
              <div className="mt-4 text-sm font-semibold leading-6 text-fg">{r.title}</div>
              <div className="mt-1.5 text-[11px] text-fg-subtle">
                {r.course} · جلسه <span className="tnum">{toFa(r.n)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── کلاس‌های من ── */
function MyCourses() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {MY_COURSES.map((mc) => {
        const c = COURSES.find((x) => x.slug === mc.slug)
        return (
          <div key={mc.slug} className="card p-7">
            <div className="flex items-center gap-2">
              <Chip tone="ink">{c.code}</Chip>
              <Chip tone="brand">{c.weekday}‌ها {toFa(c.time)}</Chip>
            </div>
            <h3 className="mt-4 text-lg font-extrabold text-fg">{c.title}</h3>
            <p className="mt-1.5 text-sm text-fg-subtle">مدرس: {INSTRUCTOR.name} · {c.room}</p>

            <div className="mt-6 space-y-4">
              <div>
                <div className="flex justify-between text-xs">
                  <span className="text-fg-muted">پیشرفت دوره</span>
                  <span className="font-bold text-fg tnum">
                    {toFa(mc.held)} از {toFa(mc.total)} جلسه
                  </span>
                </div>
                <Bar value={mc.held} max={mc.total} className="mt-2" />
              </div>
              <div>
                <div className="flex justify-between text-xs">
                  <span className="text-fg-muted">حضور شما</span>
                  <span className="font-bold text-fg tnum">{toFa(mc.attendance)}٪</span>
                </div>
                <Bar value={mc.attendance} tone="ink" className="mt-2" />
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-surface-2 p-4">
              <div className="text-[11px] text-fg-subtle">جلسه بعدی</div>
              <div className="mt-1 text-sm font-semibold text-fg">{mc.next}</div>
              <div className="mt-0.5 text-xs text-fg-subtle tnum">{toFa(mc.nextDate)}</div>
            </div>

            <div className="mt-6 flex gap-2">
              <button className="btn btn-ghost flex-1">فایل‌های دوره</button>
              <button className="btn btn-primary flex-1">
                <Icon name="play" className="h-4 w-4" />
                ویدیوها
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── جلسات ── */
function Sessions() {
  return (
    <div className="card overflow-hidden">
      <div className="border-b border-line-soft p-5">
        <h3 className="font-bold text-fg">آرشیو جلسات</h3>
        <p className="mt-1 text-xs text-fg-subtle">ویدیوها تا شش ماه بعد از پایان دوره در دسترس است.</p>
      </div>
      <div className="divide-y divide-line-soft">
        {RECORDINGS.concat(RECORDINGS.map((r) => ({ ...r, n: r.n - 2 }))).map((r, i) => (
          <div key={i} className="flex flex-wrap items-center gap-4 p-5 transition-colors hover:bg-surface-2/60">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl tile">
              <Icon name="play" className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-fg">
                جلسه <span className="tnum">{toFa(r.n)}</span> — {r.title}
              </div>
              <div className="mt-0.5 text-xs text-fg-subtle">
                {r.course} · <span className="tnum">{toFa(r.date)}</span> · مدت{' '}
                <span className="tnum">{r.dur}</span>
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <button className="btn btn-ghost px-3 py-2" title="دانلود فایل‌ها">
                <Icon name="download" className="h-4 w-4" />
              </button>
              <button className="btn btn-primary px-4 py-2">تماشا</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── تکالیف ── */
function Assignments() {
  return (
    <div className="card overflow-hidden">
      <div className="border-b border-line-soft p-5">
        <h3 className="font-bold text-fg">تکالیف من</h3>
      </div>
      <div className="divide-y divide-line-soft">
        {ASSIGNMENTS.map((a, i) => (
          <div key={i} className="flex flex-wrap items-center gap-4 p-5">
            <span
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                a.status === 'open' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-600'
              }`}
            >
              <Icon name={a.status === 'open' ? 'file' : 'check'} className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-fg">{a.title}</div>
              <div className="mt-0.5 text-xs text-fg-subtle">
                {a.course} · مهلت <span className="tnum">{toFa(a.due)}</span>
              </div>
            </div>
            {a.status === 'graded' ? (
              <div className="flex items-center gap-3">
                <div className="text-end">
                  <div className="text-[11px] text-fg-subtle">نمره</div>
                  <div className="font-extrabold text-fg tnum">{toFa(a.score)}</div>
                </div>
                <Chip tone="emerald">تصحیح شده</Chip>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Chip tone="amber">در انتظار ارسال</Chip>
                <button className="btn btn-primary px-4 py-2">ارسال</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── پرداخت‌ها ── */
function Payments() {
  const paid = INVOICES.filter((i) => i.status === 'paid').reduce((s, i) => s + i.amount, 0)
  const due = INVOICES.filter((i) => i.status !== 'paid').reduce((s, i) => s + i.amount, 0)

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon="check" label="پرداخت‌شده" value={num(paid)} unit="تومان" tone="emerald" foot="۲ فاکتور" />
        <StatCard icon="clock" label="مانده" value={num(due)} unit="تومان" tone="amber" foot="سررسید ۱۴۰۵/۰۵/۲۵" />
        <StatCard icon="wallet" label="جمع کل" value={num(paid + due)} unit="تومان" foot="دو دوره" tone="ink" />
      </div>

      <div className="card overflow-hidden">
        <div className="border-b border-line-soft p-5">
          <h3 className="font-bold text-fg">فاکتورها</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line-soft bg-surface-2/60 text-xs text-fg-muted">
                <th className="p-4 text-right font-semibold">شماره فاکتور</th>
                <th className="p-4 text-right font-semibold">دوره</th>
                <th className="p-4 text-right font-semibold">قسط</th>
                <th className="p-4 text-right font-semibold">مبلغ</th>
                <th className="p-4 text-right font-semibold">سررسید</th>
                <th className="p-4 text-right font-semibold">وضعیت</th>
                <th className="p-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {INVOICES.map((inv) => {
                const [tone, label] = PAY_TONE[inv.status]
                return (
                  <tr key={inv.no}>
                    <td className="p-4 font-bold text-fg tnum" dir="ltr" style={{ textAlign: 'right' }}>
                      {inv.no}
                    </td>
                    <td className="p-4 text-fg-muted">{inv.course}</td>
                    <td className="p-4 text-fg-muted tnum">{inv.inst}</td>
                    <td className="p-4 font-bold text-fg tnum">{num(inv.amount)}</td>
                    <td className="p-4 text-fg-muted tnum">{toFa(inv.date)}</td>
                    <td className="p-4">
                      <Chip tone={tone}>{label}</Chip>
                    </td>
                    <td className="p-4">
                      {inv.status !== 'paid' && <button className="btn btn-primary px-4 py-2">پرداخت</button>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ── پروفایل ── */
function Profile({ user }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <div className="card p-7">
        <div className="flex items-center gap-4">
          <Avatar name={user.name} className="h-16 w-16 text-lg" />
          <div>
            <div className="text-lg font-extrabold text-fg">{user.name}</div>
            <div className="text-sm text-fg-subtle">کد دانشجویی: <span className="tnum">۱۰۰۴</span></div>
            <Chip tone="emerald">فعال</Chip>
          </div>
        </div>
        <dl className="mt-7 space-y-3.5 border-t border-line-soft pt-6 text-sm">
          {[
            ['موبایل', toFa('09281489325'), 'phone'],
            ['ایمیل', 'user1004@pinosite.ir', 'mail'],
            ['شهر', 'تبریز', 'pin'],
            ['تاریخ عضویت', toFa('۱۴۰۵/۰۴/۰۸'), 'calendar'],
          ].map(([k, v, icon]) => (
            <div key={k} className="flex items-center gap-2.5">
              <Icon name={icon} className="h-4 w-4 shrink-0 text-ink-300" />
              <dt className="text-fg-muted">{k}</dt>
              <dd className="ms-auto font-semibold text-fg">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="card p-7 lg:col-span-2">
        <h3 className="font-bold text-fg">ویرایش اطلاعات</h3>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label">نام</label>
            <input className="field" defaultValue="وحید" />
          </div>
          <div>
            <label className="label">نام خانوادگی</label>
            <input className="field" defaultValue="محبی" />
          </div>
          <div>
            <label className="label">موبایل</label>
            <input className="field tnum" dir="ltr" defaultValue="09281489325" />
          </div>
          <div>
            <label className="label">ایمیل</label>
            <input className="field" dir="ltr" defaultValue="user1004@pinosite.ir" />
          </div>
          <div className="sm:col-span-2">
            <label className="label">شهر</label>
            <input className="field" defaultValue="تبریز" />
          </div>
        </div>
        <div className="mt-7 flex gap-2 border-t border-line-soft pt-6">
          <button className="btn btn-primary">ذخیره تغییرات</button>
          <button className="btn btn-ghost">تغییر رمز عبور</button>
        </div>
      </div>
    </div>
  )
}
