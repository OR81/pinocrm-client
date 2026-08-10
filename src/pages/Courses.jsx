import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { Chip, SectionHead, Accordion, money, toFa } from '../components/ui'
import { COURSES, GENERAL_FAQ, SITE } from '../data/site'

export default function Courses() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink-950">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div className="container-x relative py-16 sm:py-20">
          <div className="max-w-3xl">
            <Chip tone="light" icon="calendar">
              ترم {SITE.term} — شروع {toFa('۱۴۰۵/۰۶/۰۸')}
            </Chip>
            <h1 className="mt-6 text-3xl font-extrabold leading-[1.35] tracking-tight text-white sm:text-4xl">
              کلاس‌های پینو سایت
            </h1>
            <p className="mt-5 max-w-2xl leading-8 text-ink-300">
              هر دو دوره یکشنبه‌ها برگزار می‌شوند؛ پایتون بعدازظهر و n8n عصر. با یک بار آمدن می‌توانید هر دو را
              بردارید و ۱۵٪ تخفیف هم بگیرید.
            </p>
          </div>
        </div>
      </section>

      {/* ── کارت دوره‌ها ── */}
      <section className="container-x py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {COURSES.map((c) => (
            <div key={c.slug} className="card flex flex-col p-8">
              <div className="flex items-center gap-2">
                <Chip tone="ink">{c.code}</Chip>
                <Chip tone="brand">{c.level}</Chip>
              </div>

              <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-fg">{c.title}</h2>
              <p className="mt-2 text-sm text-fg-subtle">{c.short}</p>
              <p className="mt-5 flex-1 text-sm leading-8 text-fg-muted">{c.intro}</p>

              <dl className="mt-7 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-line-soft pt-6 sm:grid-cols-4">
                {[
                  ['روز و ساعت', `${c.weekday}‌ها`, toFa(c.time)],
                  ['تعداد جلسات', toFa(c.sessions), `${toFa(c.hours)} ساعت`],
                  ['نحوه برگزاری', 'حضوری + آنلاین', c.room],
                  ['ظرفیت باقی‌مانده', toFa(c.capacity - c.enrolled), `از ${toFa(c.capacity)} نفر`],
                ].map(([k, v, sub]) => (
                  <div key={k}>
                    <dt className="text-[11px] text-fg-subtle">{k}</dt>
                    <dd className="mt-1 text-sm font-bold text-fg">{v}</dd>
                    <dd className="text-[11px] text-fg-subtle tnum">{sub}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 flex flex-wrap items-end justify-between gap-4 border-t border-line-soft pt-6">
                <div>
                  <div className="text-[11px] text-fg-subtle">شهریه</div>
                  <div className="mt-1 text-lg font-extrabold text-fg tnum">{money(c.tuition)}</div>
                  <div className="text-[11px] text-fg-subtle">
                    یا {toFa(c.installment)} قسط {money(Math.round(c.tuition / c.installment))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/courses/${c.slug}`} className="btn btn-ghost">
                    سرفصل‌ها
                  </Link>
                  <Link to="/register" className="btn btn-primary">
                    ثبت‌نام
                    <Icon name="arrowLeft" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── مقایسه ── */}
      <section className="bg-surface-2 py-20">
        <div className="container-x">
          <SectionHead eyebrow="مقایسه" title="کدام دوره برای من مناسب است؟" />

          <div className="mt-12 overflow-hidden rounded-3xl border border-line bg-surface">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line-soft bg-surface-2/60">
                    <th className="p-4 text-right font-semibold text-fg-muted">ویژگی</th>
                    {COURSES.map((c) => (
                      <th key={c.slug} className="p-4 text-right font-bold text-fg">
                        {c.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line-soft">
                  {[
                    {
                      k: 'مناسب برای',
                      v: ['کسی که فرآیند کاری دارد و می‌خواهد خودکارش کند', 'کسی که می‌خواهد از صفر برنامه‌نویسی یاد بگیرد'],
                    },
                    { k: 'پیش‌نیاز کدنویسی', v: ['ندارد', 'ندارد'] },
                    { k: 'ساعت کلاس', v: COURSES.map((c) => toFa(c.time)) },
                    { k: 'خروجی نهایی', v: ['اتوماسیون کامل یک فرآیند CRM', 'یک API واقعی روی سرور'] },
                    { k: 'اولین نتیجه ملموس', v: ['از جلسه دوم چیزی می‌سازید', 'از جلسه دهم پروژه‌ای می‌شود'] },
                    { k: 'شهریه', v: COURSES.map((c) => money(c.tuition)) },
                  ].map((row) => (
                    <tr key={row.k}>
                      <td className="p-4 font-semibold text-fg-muted">{row.k}</td>
                      {row.v.map((v, i) => (
                        <td key={i} className="p-4 leading-7 text-fg2 tnum">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-brand-200 bg-brand-50 p-6 text-center">
            <p className="text-sm leading-8 text-brand-900">
              <strong className="font-extrabold">هر دو را با هم بردارید:</strong> چون پشت سر هم در یک روز
              برگزار می‌شوند، ثبت‌نام هم‌زمان{' '}
              <span className="font-extrabold tnum">۱۵٪</span> تخفیف دارد — یعنی{' '}
              <span className="font-extrabold tnum">
                {money(Math.round((COURSES[0].tuition + COURSES[1].tuition) * 0.85))}
              </span>{' '}
              به‌جای{' '}
              <span className="tnum line-through opacity-60">
                {money(COURSES[0].tuition + COURSES[1].tuition)}
              </span>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ── تقویم ── */}
      <section className="container-x py-20">
        <SectionHead
          eyebrow="برنامه هفتگی"
          title="یکشنبه‌ها در پینو سایت"
          sub="هر دو کلاس در یک روز، با یک ساعت فاصله برای استراحت و پرسش."
        />

        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl border border-line bg-surface">
          {[
            { t: '۱۴:۰۰ — ۱۶:۳۰', title: 'برنامه‌نویسی پایتون', room: 'کلاس ۱ / اسکای‌روم', slug: 'python' },
            { t: '۱۶:۳۰ — ۱۷:۰۰', title: 'استراحت و پرسش و پاسخ آزاد', room: 'لابی', slug: null },
            { t: '۱۷:۰۰ — ۱۹:۳۰', title: 'اتوماسیون فرآیندها با n8n', room: 'کلاس ۲ / اسکای‌روم', slug: 'n8n' },
          ].map((row, i) => (
            <div
              key={i}
              className={`flex flex-wrap items-center gap-4 p-5 ${i > 0 ? 'border-t border-line-soft' : ''} ${
                row.slug ? '' : 'bg-surface-2/60'
              }`}
            >
              <span className="w-28 shrink-0 text-sm font-bold text-fg tnum">{toFa(row.t)}</span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-fg">{row.title}</div>
                <div className="text-xs text-fg-subtle">{row.room}</div>
              </div>
              {row.slug && (
                <Link to={`/courses/${row.slug}`} className="text-sm font-semibold text-brand-600">
                  جزئیات
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── سوالات ── */}
      <section className="container-x pb-20">
        <div className="mx-auto max-w-3xl">
          <SectionHead eyebrow="سوالات متداول" title="قبل از ثبت‌نام بخوانید" />
          <div className="mt-10">
            <Accordion items={GENERAL_FAQ} defaultOpen={0} />
          </div>
        </div>
      </section>
    </>
  )
}
