import { useState } from 'react'
import DashboardShell from '../../components/DashboardShell'
import Icon from '../../components/Icon'
import { Chip, StatCard, Bar, Avatar, money, num, toFa } from '../../components/ui'
import { COURSES, INSTRUCTOR } from '../../data/site'
const NAV = [
  {
    label: 'تدریس',
    items: [
      { key: 'home', label: 'خانه', icon: 'grid' },
      { key: 'classes', label: 'کلاس‌های من', icon: 'book', badge: toFa(2) },
      { key: 'attendance', label: 'حضور و غیاب', icon: 'check' },
      { key: 'grading', label: 'تصحیح تکالیف', icon: 'file', badge: toFa(7) },
    ],
  },
  {
    label: 'دانشجویان',
    items: [
      { key: 'students', label: 'فهرست دانشجویان', icon: 'users', badge: toFa(58) },
      { key: 'atrisk', label: 'نیازمند پیگیری', icon: 'alert', badge: toFa(4) },
    ],
  },
]

const CLASSES = [
  { slug: 'n8n', students: 29, held: 9, total: 16, attendance: 89.7, avgScore: 17.6 },
  { slug: 'python', students: 29, held: 10, total: 16, attendance: 84.6, avgScore: 17.1 },
]

const ROSTER = [
  { name: 'وحید محبی', course: 'هر دو دوره', att: 84, score: 17.8, due: 5300000, status: 'ok' },
  { name: 'زهرا حسینی', course: 'اتوماسیون با n8n', att: 96, score: 18.9, due: 0, status: 'ok' },
  { name: 'میلاد طاهری', course: 'برنامه‌نویسی پایتون', att: 91, score: 18.2, due: 0, status: 'ok' },
  { name: 'سینا گودرزی', course: 'اتوماسیون با n8n', att: 54, score: 12.5, due: 6166666, status: 'risk' },
  { name: 'نگار قاسمی', course: 'هر دو دوره', att: 88, score: 17.4, due: 0, status: 'ok' },
  { name: 'آیدا موسوی', course: 'برنامه‌نویسی پایتون', att: 61, score: 14.0, due: 5300000, status: 'risk' },
  { name: 'کامران صادقی', course: 'اتوماسیون با n8n', att: 72, score: 15.8, due: 9250000, status: 'risk' },
  { name: 'سمانه ولی‌زاده', course: 'برنامه‌نویسی پایتون', att: 93, score: 18.5, due: 0, status: 'ok' },
]

const ATT_SESSION = [
  { name: 'کامران صادقی', s: 'absent' },
  { name: 'پریسا عطایی', s: 'present' },
  { name: 'وحید محبی', s: 'present' },
  { name: 'نیلوفر کریمی', s: 'online' },
  { name: 'بهاره صالحی', s: 'present' },
  { name: 'سمانه محبی', s: 'present' },
  { name: 'علی هدایتی', s: 'late' },
  { name: 'سینا گودرزی', s: 'absent' },
  { name: 'محمدرضا احمدی', s: 'present' },
  { name: 'سعید عطایی', s: 'present' },
]

const STATES = [
  ['present', 'حاضر'],
  ['online', 'آنلاین'],
  ['late', 'تأخیر'],
  ['absent', 'غایب'],
]

const SUBMISSIONS = [
  { name: 'زهرا حسینی', title: 'تمرین جلسه ۱۰ — ربات تلگرام', course: 'n8n', sent: '۱۴۰۵/۰۵/۱۴' },
  { name: 'وحید محبی', title: 'تمرین جلسه ۱۰ — ربات تلگرام', course: 'n8n', sent: '۱۴۰۵/۰۵/۱۵' },
  { name: 'میلاد طاهری', title: 'تمرین جلسه ۱۰ — API آب‌وهوا', course: 'پایتون', sent: '۱۴۰۵/۰۵/۱۵' },
  { name: 'نگار قاسمی', title: 'تمرین جلسه ۱۰ — ربات تلگرام', course: 'n8n', sent: '۱۴۰۵/۰۵/۱۶' },
  { name: 'کیمیا باقری', title: 'تمرین جلسه ۱۰ — API آب‌وهوا', course: 'پایتون', sent: '۱۴۰۵/۰۵/۱۶' },
  { name: 'سمانه ولی‌زاده', title: 'تمرین جلسه ۱۰ — API آب‌وهوا', course: 'پایتون', sent: '۱۴۰۵/۰۵/۱۶' },
  { name: 'ایمان هاشمی', title: 'تمرین جلسه ۱۰ — ربات تلگرام', course: 'n8n', sent: '۱۴۰۵/۰۵/۱۷' },
]

export default function InstructorDashboard() {
  const [tab, setTab] = useState('home')
  const user = { name: INSTRUCTOR.name, role: 'مدرس · ۲ کلاس فعال' }

  const titles = {
    home: ['خانه', 'خلاصه وضعیت کلاس‌ها و دانشجویان'],
    classes: ['کلاس‌های من', 'وضعیت پیشرفت هر دوره'],
    attendance: ['حضور و غیاب', 'ثبت حضور دانشجویان در جلسه'],
    grading: ['تصحیح تکالیف', 'پاسخ‌های ارسال‌شده در انتظار نمره'],
    students: ['فهرست دانشجویان', 'عملکرد تحصیلی و وضعیت مالی'],
    atrisk: ['نیازمند پیگیری', 'دانشجویانی که حضور یا نمره‌شان افت کرده'],
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
      {tab === 'classes' && <Classes />}
      {tab === 'attendance' && <Attendance />}
      {tab === 'grading' && <Grading />}
      {tab === 'students' && <Students rows={ROSTER} />}
      {tab === 'atrisk' && <Students rows={ROSTER.filter((r) => r.status === 'risk')} risk />}
    </DashboardShell>
  )
}

/* ── خانه ── */
function Home({ onTab }) {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-ink-950 p-7">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Chip tone="light" icon="calendar">
              یکشنبه {toFa('۱۴۰۵/۰۵/۱۸')} — فردا
            </Chip>
            <h2 className="mt-4 text-xl font-extrabold text-white">برنامه فردای شما</h2>
            <p className="mt-2 text-sm leading-7 text-ink-300">
              {toFa('۱۴:۰۰')} — پایتون، جلسه {toFa(11)}: pandas بخش اول · {toFa(29)} دانشجو
              <br />
              {toFa('۱۷:۰۰')} — n8n، جلسه {toFa(11)}: ادغام با OpenAI · {toFa(29)} دانشجو
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button onClick={() => onTab('attendance')} className="btn btn-light">
              <Icon name="check" className="h-4 w-4" />
              ثبت حضور
            </button>
            <button className="btn btn-outline-light">
              <Icon name="play" className="h-4 w-4" />
              شروع کلاس آنلاین
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon="users" label="کل دانشجویان" value={toFa(58)} unit="نفر" foot="در دو کلاس" />
        <StatCard icon="check" label="میانگین حضور" value="۸۷٫۱٪" foot="۱۹ جلسه برگزارشده" tone="emerald" />
        <StatCard icon="file" label="در انتظار تصحیح" value={toFa(7)} unit="تمرین" foot="مهلت تا یکشنبه" tone="amber" />
        <StatCard icon="alert" label="نیازمند پیگیری" value={toFa(4)} unit="دانشجو" foot="افت حضور یا نمره" tone="ink" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-line-soft p-5">
            <h3 className="font-bold text-fg">وضعیت کلاس‌ها</h3>
            <button onClick={() => onTab('classes')} className="text-sm font-semibold text-brand-600">
              جزئیات
            </button>
          </div>
          <div className="divide-y divide-line-soft">
            {CLASSES.map((cl) => {
              const c = COURSES.find((x) => x.slug === cl.slug)
              return (
                <div key={cl.slug} className="p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="font-bold text-fg">{c.title}</div>
                      <div className="mt-0.5 text-xs text-fg-subtle">
                        {c.weekday}‌ها {toFa(c.time)} · {c.room}
                      </div>
                    </div>
                    <div className="flex gap-6 text-center">
                      <div>
                        <div className="text-[11px] text-fg-subtle">دانشجو</div>
                        <div className="font-bold text-fg tnum">{toFa(cl.students)}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-fg-subtle">حضور</div>
                        <div className="font-bold text-fg tnum">{toFa(cl.attendance)}٪</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-fg-subtle">میانگین نمره</div>
                        <div className="font-bold text-fg tnum">{toFa(cl.avgScore)}</div>
                      </div>
                    </div>
                  </div>
                  <Bar value={cl.held} max={cl.total} className="mt-4" />
                  <div className="mt-2 text-xs text-fg-subtle tnum">
                    {toFa(cl.held)} از {toFa(cl.total)} جلسه برگزار شده
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between border-b border-line-soft p-5">
            <h3 className="font-bold text-fg">نیازمند پیگیری</h3>
            <button onClick={() => onTab('atrisk')} className="text-sm font-semibold text-brand-600">
              همه
            </button>
          </div>
          <ul className="divide-y divide-line-soft">
            {ROSTER.filter((r) => r.status === 'risk').map((r) => (
              <li key={r.name} className="flex items-center gap-3 p-4">
                <Avatar name={r.name} className="h-9 w-9 text-[11px]" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-fg">{r.name}</div>
                  <div className="text-[11px] text-fg-subtle">
                    حضور <span className="tnum">{toFa(r.att)}٪</span> · نمره{' '}
                    <span className="tnum">{toFa(r.score)}</span>
                  </div>
                </div>
                <button className="grid h-8 w-8 place-items-center rounded-lg text-fg-subtle hover:bg-surface-2 hover:text-brand-600">
                  <Icon name="send" className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between border-b border-line-soft p-5">
          <h3 className="font-bold text-fg">آخرین تمرین‌های ارسالی</h3>
          <button onClick={() => onTab('grading')} className="text-sm font-semibold text-brand-600">
            رفتن به تصحیح
          </button>
        </div>
        <ul className="divide-y divide-line-soft">
          {SUBMISSIONS.slice(0, 4).map((s, i) => (
            <li key={i} className="flex flex-wrap items-center gap-3 p-4">
              <Avatar name={s.name} className="h-9 w-9 text-[11px]" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-fg">{s.name}</div>
                <div className="text-[11px] text-fg-subtle">
                  {s.title} · {s.course}
                </div>
              </div>
              <span className="text-xs text-fg-subtle tnum">{toFa(s.sent)}</span>
              <button className="btn btn-ghost px-4 py-2">تصحیح</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ── کلاس‌ها ── */
function Classes() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {CLASSES.map((cl) => {
        const c = COURSES.find((x) => x.slug === cl.slug)
        return (
          <div key={cl.slug} className="card p-7">
            <div className="flex items-center gap-2">
              <Chip tone="ink">{c.code}</Chip>
              <Chip tone="brand">
                {c.weekday}‌ها {toFa(c.time)}
              </Chip>
            </div>
            <h3 className="mt-4 text-lg font-extrabold text-fg">{c.title}</h3>
            <p className="mt-1.5 text-sm text-fg-subtle">{c.room}</p>

            <dl className="mt-6 grid grid-cols-3 gap-3 rounded-2xl bg-surface-2 p-4 text-center">
              {[
                ['دانشجو', toFa(cl.students)],
                ['نرخ حضور', `${toFa(cl.attendance)}٪`],
                ['میانگین نمره', toFa(cl.avgScore)],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[11px] text-fg-subtle">{k}</dt>
                  <dd className="mt-1 font-extrabold text-fg tnum">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6">
              <div className="flex justify-between text-xs">
                <span className="text-fg-muted">پیشرفت دوره</span>
                <span className="font-bold text-fg tnum">
                  {toFa(cl.held)} از {toFa(cl.total)} جلسه
                </span>
              </div>
              <Bar value={cl.held} max={cl.total} className="mt-2" />
            </div>

            <div className="mt-6 rounded-2xl border border-line p-4">
              <div className="text-[11px] text-fg-subtle">جلسه بعدی</div>
              <div className="mt-1 text-sm font-semibold text-fg">
                جلسه {toFa(cl.held + 1)} — {c.syllabus[cl.held].t}
              </div>
              <div className="mt-0.5 text-xs text-fg-subtle tnum">یکشنبه {toFa('۱۴۰۵/۰۵/۱۸')}</div>
            </div>

            <div className="mt-6 flex gap-2">
              <button className="btn btn-ghost flex-1">لیست دانشجویان</button>
              <button className="btn btn-primary flex-1">
                <Icon name="check" className="h-4 w-4" />
                ثبت حضور
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── حضور و غیاب ── */
function Attendance() {
  const [rows, setRows] = useState(ATT_SESSION)
  const counts = rows.reduce((a, r) => ({ ...a, [r.s]: (a[r.s] ?? 0) + 1 }), {})
  const rate = Math.round((((counts.present ?? 0) + (counts.online ?? 0)) / rows.length) * 100)

  const set = (i, s) => setRows((rs) => rs.map((r, j) => (j === i ? { ...r, s } : r)))

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard icon="check" label="حاضر" value={toFa(counts.present ?? 0)} unit="نفر" tone="emerald" foot="حضور فیزیکی" />
        <StatCard icon="play" label="آنلاین" value={toFa(counts.online ?? 0)} unit="نفر" foot="از اسکای‌روم" />
        <StatCard icon="clock" label="تأخیر" value={toFa(counts.late ?? 0)} unit="نفر" tone="amber" foot="بیش از ۱۰ دقیقه" />
        <StatCard icon="alert" label="نرخ حضور جلسه" value={`${toFa(rate)}٪`} tone="ink" foot={`از ${toFa(rows.length)} نفر`} />
      </div>

      <div className="card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-soft p-5">
          <div>
            <h3 className="font-bold text-fg">جلسه ۱۰ — اتصال به تلگرام، ایمیل و پیامک</h3>
            <p className="mt-1 text-xs text-fg-subtle">
              اتوماسیون با n8n · یکشنبه <span className="tnum">{toFa('۱۴۰۵/۰۵/۱۱')}</span> ·{' '}
              <span className="tnum">{toFa('۱۷:۰۰ تا ۱۹:۳۰')}</span>
            </p>
          </div>
          <span className="text-xs text-fg-subtle">تغییرات خودکار ذخیره می‌شود</span>
        </div>

        <div className="divide-y divide-line-soft">
          {rows.map((r, i) => (
            <div key={r.name} className="flex flex-wrap items-center gap-4 p-4">
              <span className="w-6 shrink-0 text-xs text-fg-subtle tnum">{toFa(i + 1)}</span>
              <Avatar name={r.name} className="h-9 w-9 text-[11px]" />
              <span className="min-w-0 flex-1 text-sm font-semibold text-fg">{r.name}</span>
              <div className="flex overflow-hidden rounded-xl border border-line">
                {STATES.map(([v, l]) => (
                  <button
                    key={v}
                    onClick={() => set(i, v)}
                    className={`border-s border-line px-3 py-2 text-xs transition-colors first:border-s-0 ${
                      r.s === v ? 'bg-fg font-semibold text-surface' : 'text-fg-muted hover:bg-surface-2'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 border-t border-line-soft p-5">
          <button className="btn btn-ghost">
            <Icon name="download" className="h-4 w-4" />
            خروجی لیست
          </button>
          <button className="btn btn-primary">ثبت نهایی حضور</button>
        </div>
      </div>
    </div>
  )
}

/* ── تصحیح ── */
function Grading() {
  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-soft p-5">
        <div>
          <h3 className="font-bold text-fg">در انتظار تصحیح</h3>
          <p className="mt-1 text-xs text-fg-subtle">
            <span className="tnum">{toFa(SUBMISSIONS.length)}</span> پاسخ ارسال‌شده
          </p>
        </div>
        <button className="btn btn-ghost">
          <Icon name="download" className="h-4 w-4" />
          دانلود همه فایل‌ها
        </button>
      </div>

      <div className="divide-y divide-line-soft">
        {SUBMISSIONS.map((s, i) => (
          <div key={i} className="flex flex-wrap items-center gap-4 p-5">
            <Avatar name={s.name} className="h-10 w-10 text-[11px]" />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold text-fg">{s.name}</div>
              <div className="mt-0.5 text-xs text-fg-subtle">
                {s.title} · {s.course} · ارسال <span className="tnum">{toFa(s.sent)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="field w-24 py-2 text-center tnum"
                placeholder="نمره"
                inputMode="decimal"
                aria-label={`نمره ${s.name}`}
              />
              <button className="btn btn-ghost px-3 py-2" title="مشاهده فایل">
                <Icon name="file" className="h-4 w-4" />
              </button>
              <button className="btn btn-primary px-4 py-2">ثبت</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── دانشجویان ── */
function Students({ rows, risk = false }) {
  const [q, setQ] = useState('')
  const list = rows.filter((r) => r.name.includes(q.trim()))

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-soft p-5">
        <div>
          <h3 className="font-bold text-fg">{risk ? 'دانشجویان نیازمند پیگیری' : 'فهرست دانشجویان'}</h3>
          <p className="mt-1 text-xs text-fg-subtle">
            <span className="tnum">{toFa(list.length)}</span> نفر
            {risk && ' — حضور زیر ۷۵٪ یا نمره زیر ۱۶'}
          </p>
        </div>
        <input
          className="field max-w-xs py-2.5"
          placeholder="جستجوی نام دانشجو…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line-soft bg-surface-2/60 text-xs text-fg-muted">
              <th className="p-4 text-right font-semibold">دانشجو</th>
              <th className="p-4 text-right font-semibold">دوره</th>
              <th className="p-4 text-right font-semibold">حضور</th>
              <th className="p-4 text-right font-semibold">میانگین نمره</th>
              <th className="p-4 text-right font-semibold">مانده شهریه</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line-soft">
            {list.map((r) => (
              <tr key={r.name} className="transition-colors hover:bg-surface-2/50">
                <td className="p-4">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={r.name} className="h-9 w-9 text-[11px]" />
                    <span className="font-semibold text-fg">{r.name}</span>
                  </div>
                </td>
                <td className="p-4 text-fg-muted">{r.course}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Bar value={r.att} className="w-20" tone={r.att < 75 ? 'ink' : 'brand'} />
                    <span className={`tnum text-xs ${r.att < 75 ? 'font-bold text-rose-600' : 'text-fg-muted'}`}>
                      {toFa(r.att)}٪
                    </span>
                  </div>
                </td>
                <td className="p-4 font-bold text-fg tnum">{toFa(r.score)}</td>
                <td className="p-4 tnum">
                  {r.due ? <span className="font-bold text-rose-600">{num(r.due)}</span> : <span className="text-fg-subtle">تسویه</span>}
                </td>
                <td className="p-4">
                  <button className="btn btn-ghost px-3 py-2">
                    <Icon name="send" className="h-4 w-4" />
                    پیام
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
