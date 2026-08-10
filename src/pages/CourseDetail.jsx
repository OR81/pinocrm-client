import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import Icon from '../components/Icon'
import Logo from '../components/Logo'
import { Chip, SectionHead, CheckList, Accordion, Bar, money, num, toFa } from '../components/ui'
import { courseBySlug, COURSES, INSTRUCTOR, SITE } from '../data/site'

export default function CourseDetail() {
  const { slug } = useParams()
  const course = courseBySlug(slug)
  const [showAll, setShowAll] = useState(false)

  if (!course) return <Navigate to="/courses" replace />

  const other = COURSES.find((c) => c.slug !== slug)
  const remaining = course.capacity - course.enrolled
  const visible = showAll ? course.syllabus : course.syllabus.slice(0, 8)

  return (
    <>
      {/* ── هیرو ── */}
      <section className="relative overflow-hidden bg-ink-950">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div className="container-x relative py-16 sm:py-20">
          <nav className="mb-8 flex items-center gap-2 text-xs text-fg-subtle">
            <Link to="/" className="hover:text-white">
              خانه
            </Link>
            <Icon name="chevronLeft" className="h-3 w-3" />
            <Link to="/courses" className="hover:text-white">
              کلاس‌ها
            </Link>
            <Icon name="chevronLeft" className="h-3 w-3" />
            <span className="text-ink-200">{course.title}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <Chip tone="light">{course.code}</Chip>
                <Chip tone="light" icon="calendar">
                  {course.weekday}‌ها {toFa(course.time)}
                </Chip>
                <Chip tone="light">{course.level}</Chip>
              </div>

              <h1 className="mt-6 text-3xl font-extrabold leading-[1.35] tracking-tight text-white sm:text-4xl">
                {course.title}
              </h1>
              <p className="mt-3 text-lg text-brand-300">{course.short}</p>
              <p className="mt-6 max-w-2xl leading-8 text-ink-300">{course.intro}</p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/register" className="btn btn-primary px-6 py-3.5">
                  ثبت‌نام در دوره
                  <Icon name="arrowLeft" className="h-4 w-4" />
                </Link>
                <a href="#syllabus" className="btn btn-outline-light px-6 py-3.5">
                  دیدن سرفصل‌ها
                </a>
              </div>
            </div>

            {/* کارت شهریه */}
            <div className="lg:col-span-5">
              <div className="card p-7">
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <div className="text-xs text-fg-subtle">شهریه کل دوره</div>
                    <div className="mt-1.5 text-2xl font-extrabold text-fg tnum">
                      {money(course.tuition)}
                    </div>
                  </div>
                  <Chip tone="emerald">جلسه اول رایگان</Chip>
                </div>

                <div className="mt-5 rounded-2xl bg-surface-2 p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-fg-muted">
                    <Icon name="wallet" className="h-3.5 w-3.5" />
                    پرداخت قسطی
                  </div>
                  <p className="mt-2 text-sm text-fg-muted">
                    <span className="tnum font-bold text-fg">{toFa(course.installment)}</span> قسط{' '}
                    <span className="tnum font-bold text-fg">
                      {num(Math.round(course.tuition / course.installment))}
                    </span>{' '}
                    تومانی، بدون بهره
                  </p>
                </div>

                <dl className="mt-6 space-y-3.5 text-sm">
                  {[
                    ['شروع دوره', course.startJalali, 'calendar'],
                    ['تعداد جلسات', `${toFa(course.sessions)} جلسه · ${toFa(course.hours)} ساعت`, 'clock'],
                    ['نحوه برگزاری', course.mode, 'play'],
                    ['محل برگزاری', course.room, 'pin'],
                    ['مدرس', INSTRUCTOR.name, 'user'],
                  ].map(([k, v, icon]) => (
                    <div key={k} className="flex items-center gap-2.5">
                      <Icon name={icon} className="h-4 w-4 shrink-0 text-ink-300" />
                      <dt className="text-fg-muted">{k}</dt>
                      <dd className="ms-auto font-semibold text-fg tnum">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 border-t border-line-soft pt-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-fg-muted">ظرفیت تکمیل‌شده</span>
                    <span className="font-bold text-fg tnum">
                      {toFa(course.enrolled)} از {toFa(course.capacity)}
                    </span>
                  </div>
                  <Bar value={course.enrolled} max={course.capacity} className="mt-2.5" />
                  <p className="mt-2.5 text-xs text-rose-600">
                    تنها <span className="tnum font-bold">{toFa(remaining)}</span> صندلی باقی مانده است
                  </p>
                </div>

                <Link to="/register" className="btn btn-primary mt-6 w-full py-3.5">
                  رزرو صندلی
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── دستاوردها ── */}
      <section className="container-x py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead
              center={false}
              eyebrow="بعد از دوره"
              title="چه کاری می‌توانید انجام دهید"
              sub="این‌ها نتیجه‌های مشخصی است که در پایان دوره از شما انتظار می‌رود."
            />
          </div>
          <div className="lg:col-span-7">
            <div className="card p-8">
              <CheckList items={course.outcomes} />
            </div>
          </div>
        </div>
      </section>

      {/* ── مخاطب و پیش‌نیاز ── */}
      <section className="bg-surface-2 py-20">
        <div className="container-x grid gap-5 lg:grid-cols-2">
          <div className="card p-8">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-600">
              <Icon name="users" className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-lg font-extrabold text-fg">این دوره برای چه کسی است؟</h3>
            <div className="mt-6">
              <CheckList items={course.audience} />
            </div>
          </div>

          <div className="card p-8">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-surface-3 text-fg2">
              <Icon name="shield" className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-lg font-extrabold text-fg">پیش‌نیازها</h3>
            <div className="mt-6">
              <CheckList items={course.prereq} />
            </div>
            <p className="mt-7 rounded-2xl bg-brand-50 p-4 text-sm leading-7 text-brand-900">
              مطمئن نیستید سطحتان مناسب است؟ جلسه اول رایگان است — بیایید و بعد تصمیم بگیرید.
            </p>
          </div>
        </div>
      </section>

      {/* ── سرفصل ── */}
      <section id="syllabus" className="container-x scroll-mt-24 py-20">
        <SectionHead
          eyebrow="سرفصل"
          title={`${toFa(course.sessions)} جلسه، هفته‌ای یک جلسه`}
          sub={`همه جلسات ${course.weekday}‌ها ساعت ${toFa(course.time)} برگزار می‌شود.`}
        />

        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-line bg-surface">
          {visible.map((s, i) => (
            <div
              key={s.n}
              className={`flex gap-5 p-5 transition-colors hover:bg-surface-2/60 ${
                i > 0 ? 'border-t border-line-soft' : ''
              }`}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl tile text-xs font-bold tnum">
                {toFa(s.n)}
              </span>
              <div className="min-w-0">
                <h3 className="font-bold text-fg">{s.t}</h3>
                <p className="mt-1.5 text-sm leading-7 text-fg-muted">{s.d}</p>
              </div>
            </div>
          ))}

          {!showAll && course.syllabus.length > 8 && (
            <button
              onClick={() => setShowAll(true)}
              className="flex w-full items-center justify-center gap-2 border-t border-line-soft bg-surface-2/60 p-4 text-sm font-semibold text-brand-600 transition-colors hover:bg-surface-2"
            >
              نمایش {toFa(course.syllabus.length - 8)} جلسه باقی‌مانده
              <Icon name="chevronDown" className="h-4 w-4" />
            </button>
          )}
        </div>
      </section>

      {/* ── استاد ── */}
      <section className="container-x pb-20">
        <div className="card overflow-hidden">
          <div className="grid lg:grid-cols-5">
            <div className="relative flex flex-col justify-center bg-ink-950 p-10 lg:col-span-2">
              <div className="grid-bg absolute inset-0" aria-hidden="true" />
              <div className="relative">
                <Logo className="h-12 w-12 text-brand-500" />
                <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-white">{INSTRUCTOR.name}</h3>
                <p className="mt-1.5 text-sm text-fg-subtle">{INSTRUCTOR.role}</p>
                <dl className="mt-8 grid grid-cols-2 gap-5">
                  {INSTRUCTOR.stats.map((s) => (
                    <div key={s.label}>
                      <dd dir="auto" className="text-xl font-extrabold text-white tnum">{s.value}</dd>
                      <dt className="mt-0.5 text-[11px] text-fg-subtle">{s.label}</dt>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="p-10 lg:col-span-3">
              <h4 className="text-lg font-extrabold text-fg">مدرس دوره</h4>
              <p className="mt-4 text-sm leading-8 text-fg-muted">{INSTRUCTOR.bio}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {INSTRUCTOR.skills.map((s) => (
                  <span key={s} className="chip bg-surface-3 text-fg2">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── سوالات ── */}
      <section className="bg-surface-2 py-20">
        <div className="container-x mx-auto max-w-3xl">
          <SectionHead eyebrow="سوالات متداول" title={`درباره دوره ${course.title}`} />
          <div className="mt-10">
            <Accordion items={course.faq} defaultOpen={0} />
          </div>
        </div>
      </section>

      {/* ── دوره دیگر ── */}
      <section className="container-x py-20">
        <div className="card flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
          <div>
            <div className="text-xs text-fg-subtle">دوره دیگر ما</div>
            <h3 className="mt-2 text-xl font-extrabold text-fg">{other.title}</h3>
            <p className="mt-1.5 text-sm text-fg-muted">
              {other.short} · {other.weekday}‌ها {toFa(other.time)}
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Link to={`/courses/${other.slug}`} className="btn btn-ghost">
              مشاهده دوره
            </Link>
            <Link to="/register" className="btn btn-primary">
              ثبت‌نام هر دو با ۱۵٪ تخفیف
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="container-x pb-4">
        <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-8 py-14 text-center sm:px-14">
          <div className="grid-bg absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-white">
              فقط <span className="tnum text-brand-400">{toFa(remaining)}</span> صندلی باقی مانده
            </h2>
            <p className="mt-4 leading-8 text-ink-300">
              جلسه اول رایگان است. اگر ادامه ندادید، هیچ هزینه‌ای پرداخت نمی‌کنید.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/register" className="btn btn-light px-6 py-3.5">
                ثبت‌نام در {course.title}
              </Link>
              <a href={`tel:${SITE.phone}`} className="btn btn-outline-light px-6 py-3.5">
                <Icon name="phone" className="h-4 w-4" />
                مشاوره رایگان
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
