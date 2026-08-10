import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../Icon'
import { Chip } from '../ui'
import { COURSES, SITE } from '../../data/site'
import { useRegister, useCountdown, toFa, money, INSTALLMENTS } from './useRegister'

/** تاریخ شروع دوره برای شمارش معکوس — ۱۴۰۵/۰۶/۰۸ */
const START_TS = Math.floor(new Date('2026-08-30T13:30:00Z').getTime() / 1000)

/* ── پیام خطا ── */
function ErrorMsg({ children }) {
  if (!children) return null
  return (
    <p data-error className="mt-2 flex items-center gap-1.5 text-xs text-rose-600">
      <Icon name="alert" className="h-3.5 w-3.5 shrink-0" />
      {children}
    </p>
  )
}

/* ── شمارش معکوس ── */
export function Countdown({ tone = 'light' }) {
  const { d, h, m, s, over } = useCountdown(START_TS)
  const cell = tone === 'light' ? 'bg-white/10 text-white' : 'bg-surface-3 text-fg'
  const label = tone === 'light' ? 'text-ink-400' : 'text-fg-subtle'

  if (over) return null

  return (
    <div className="flex items-center gap-2" dir="ltr">
      {[
        ['s', s, 'ثانیه'],
        ['m', m, 'دقیقه'],
        ['h', h, 'ساعت'],
        ['d', d, 'روز'],
      ].map(([k, v, t]) => (
        <div key={k} className="text-center">
          <div className={`min-w-12 rounded-xl px-2.5 py-2 text-lg font-extrabold tnum ${cell}`}>
            {toFa(String(v).padStart(2, '0'))}
          </div>
          <div className={`mt-1.5 text-[10px] ${label}`}>{t}</div>
        </div>
      ))}
    </div>
  )
}

/* ── کارت انتخاب دوره ── */
export function CourseChoiceCards({ selected, onToggle, error }) {
  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-2">
        {COURSES.map((c) => {
          const on = selected.includes(c.slug)
          return (
            <div
              key={c.slug}
              data-course={c.slug}
              data-price={c.tuition}
              data-selected={on}
              className="course-card card flex flex-col p-6 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Chip tone="ink">{c.code}</Chip>
                <Chip tone="brand" icon="calendar">
                  {c.weekday}‌ها {toFa(c.time)}
                </Chip>
              </div>

              <h3 className="mt-4 text-lg font-extrabold tracking-tight text-fg">{c.title}</h3>
              <p className="mt-1.5 text-sm text-fg-subtle">{c.short}</p>

              <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-line-soft pt-4 text-center">
                {[
                  ['جلسه', toFa(c.sessions)],
                  ['ساعت', toFa(c.hours)],
                  ['ظرفیت', toFa(c.capacity - c.enrolled)],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[11px] text-fg-subtle">{k}</dt>
                    <dd className="mt-0.5 font-bold text-fg tnum">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 flex items-end justify-between gap-3 border-t border-line-soft pt-4">
                <div>
                  <div className="text-[11px] text-fg-subtle">شهریه</div>
                  <div className="mt-0.5 font-extrabold text-fg tnum">{money(c.tuition)} تومان</div>
                  <div className="text-[11px] text-fg-subtle tnum">
                    قسط اول {money(Math.floor(c.tuition / INSTALLMENTS))} تومان
                  </div>
                </div>
                <Link to={`/courses/${c.slug}`} className="text-xs font-semibold text-brand-600">
                  سرفصل‌ها
                </Link>
              </div>

              <button
                type="button"
                data-toggle-course={c.slug}
                onClick={() => onToggle(c.slug)}
                className={`btn mt-5 w-full py-3 ${on ? 'btn-primary' : 'btn-ghost'}`}
              >
                {on ? (
                  <>
                    <Icon name="check" className="h-4 w-4" strokeWidth={2.6} />
                    انتخاب شد
                  </>
                ) : (
                  <>
                    <Icon name="plus" className="h-4 w-4" />
                    افزودن به ثبت‌نام
                  </>
                )}
              </button>
            </div>
          )
        })}
      </div>
      <ErrorMsg>{error}</ErrorMsg>
    </div>
  )
}

/* ── خلاصه سفارش (پنل تیره) ── */
export function OrderSummary({ summary }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-ink-950 p-7">
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-extrabold text-white">خلاصه سفارش</h3>
          <Chip tone="light">
            {toFa(INSTALLMENTS)} قسط بدون بهره
          </Chip>
        </div>

        <div data-summary-items className="mt-5 space-y-2.5">
          {summary.count === 0 ? (
            <p className="rounded-2xl border border-dashed border-white/15 p-4 text-center text-xs leading-7 text-ink-400">
              هنوز دوره‌ای انتخاب نکرده‌اید.
            </p>
          ) : (
            summary.items.map((i) => (
              <div key={i.slug} className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs font-bold leading-6 text-white">{i.title}</p>
                <p className="mt-1.5 flex items-center justify-between text-[11px] text-ink-400 tnum">
                  <span>قسط اول: {money(i.first)} ت</span>
                  <span>{money(i.price)} ت</span>
                </p>
              </div>
            ))
          )}
        </div>

        <dl className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-ink-400">جمع کل</dt>
            <dd data-summary-total className="font-bold text-white tnum">
              {money(summary.total)} تومان
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-ink-400">مانده در {toFa(INSTALLMENTS - 1)} قسط بعدی</dt>
            <dd data-summary-rest className="text-ink-200 tnum">
              {money(summary.rest)} تومان
            </dd>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 pt-3">
            <dt className="font-bold text-white">پرداخت امروز</dt>
            <dd data-summary-first className="text-lg font-extrabold text-brand-400 tnum">
              {money(summary.first)} تومان
            </dd>
          </div>
        </dl>

        <div className="mt-6 rounded-2xl bg-white/5 p-4">
          <div className="text-[11px] text-ink-400">شروع دوره — یکشنبه {toFa('۱۴۰۵/۰۶/۰۸')}</div>
          <div className="mt-3">
            <Countdown />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── نوار چسبان پایین صفحه (موبایل) ── */
function MobileBar({ summary, formRef }) {
  const [show, setShow] = useState(false)
  const barRef = useRef(null)

  useEffect(() => {
    const formInView = () => {
      const el = formRef.current
      if (!el) return false
      const r = el.getBoundingClientRect()
      return r.top < window.innerHeight - 80 && r.bottom > 120
    }
    const sync = () => setShow(summary.count > 0 && !formInView())
    sync()
    window.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      window.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [summary.count, formRef])

  // فضای خالی پایین صفحه تا نوار روی محتوا نیفتد
  useEffect(() => {
    document.body.style.paddingBottom = show ? `${barRef.current?.offsetHeight ?? 76}px` : ''
    return () => {
      document.body.style.paddingBottom = ''
    }
  }, [show])

  if (!show) return null

  return (
    <div
      ref={barRef}
      data-mobile-bar
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 p-3 backdrop-blur lg:hidden"
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-[11px] text-fg-subtle">
            {toFa(summary.count)} دوره · پرداخت امروز
          </div>
          <div className="font-extrabold text-fg tnum">{money(summary.first)} تومان</div>
        </div>
        <button
          type="button"
          onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
          className="btn btn-primary shrink-0"
        >
          تکمیل ثبت‌نام
          <Icon name="arrowLeft" className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

/* ── بخش کامل ثبت‌نام ── */
export default function RegisterSection({ initialCourses = ['n8n'], compact = false }) {
  const r = useRegister({ initialCourses })
  const [done, setDone] = useState(false)

  if (done) {
    return (
      <div className="card mx-auto max-w-lg p-10 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
          <Icon name="check" className="h-7 w-7" strokeWidth={2.4} />
        </span>
        <h3 className="mt-6 text-xl font-extrabold text-fg">ثبت‌نام شما ثبت شد</h3>
        <p className="mt-3 text-sm leading-8 text-fg-muted">
          کد پیگیری و لینک پرداخت به شماره{' '}
          <span className="font-bold text-fg tnum">{toFa(r.values.mobile)}</span> پیامک شد. اگر تا چند دقیقه
          دیگر نرسید با <span className="tnum">{SITE.phone}</span> تماس بگیرید.
        </p>
        <Link to="/dashboard/student" className="btn btn-primary mt-8 w-full py-3.5">
          ورود به پنل دانشجویی
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-12">
        {/* ستون راست: انتخاب دوره + فرم */}
        <div className="lg:col-span-7">
          {!compact && (
            <>
              <h3 className="text-lg font-extrabold text-fg">۱. دوره‌های خود را انتخاب کنید</h3>
              <p className="mt-1.5 text-sm text-fg-muted">
                با انتخاب هر دو دوره، ۱۵٪ تخفیف روی مجموع شهریه اعمال می‌شود.
              </p>
              <div className="mt-5">
                <CourseChoiceCards
                  selected={r.selected}
                  onToggle={r.toggleCourse}
                  error={r.errors.courses}
                />
              </div>
            </>
          )}

          <h3 className={`text-lg font-extrabold text-fg ${compact ? '' : 'mt-10'}`}>
            {compact ? 'اطلاعات شما' : '۲. اطلاعات خود را وارد کنید'}
          </h3>

          <form
            id="register-form"
            ref={r.formRef}
            onSubmit={(e) => r.submit(e, () => setDone(true))}
            noValidate
            className="card mt-5 space-y-5 p-6 sm:p-7"
          >
            {compact && (
              <div>
                <span className="label">دوره‌های انتخابی</span>
                <div className="space-y-2.5">
                  {COURSES.map((c) => {
                    const on = r.selected.includes(c.slug)
                    return (
                      <button
                        type="button"
                        key={c.slug}
                        data-course={c.slug}
                        data-price={c.tuition}
                        data-selected={on}
                        onClick={() => r.toggleCourse(c.slug)}
                        className="course-card flex w-full items-center gap-3 rounded-2xl border border-line bg-surface p-4 text-right transition-colors"
                      >
                        <span
                          className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors ${
                            on ? 'border-brand-600 bg-brand-600 text-white' : 'border-fg-subtle'
                          }`}
                        >
                          {on && <Icon name="check" className="h-3 w-3" strokeWidth={3} />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-bold text-fg">{c.title}</span>
                          <span className="block text-xs text-fg-subtle">
                            {c.weekday}‌ها {toFa(c.time)} · {toFa(c.sessions)} جلسه
                          </span>
                        </span>
                        <span className="shrink-0 text-sm font-bold text-fg tnum">
                          {money(c.tuition)} ت
                        </span>
                      </button>
                    )
                  })}
                </div>
                <ErrorMsg>{r.errors.courses}</ErrorMsg>
              </div>
            )}

            <div>
              <label className="label" htmlFor="full_name">
                نام و نام خانوادگی
              </label>
              <input
                id="full_name"
                name="full_name"
                className={`field ${r.errors.full_name ? 'field-error' : ''}`}
                placeholder="زهرا حسینی"
                value={r.values.full_name}
                onChange={(e) => r.setField('full_name', e.target.value)}
              />
              <ErrorMsg>{r.errors.full_name}</ErrorMsg>
            </div>

            <div>
              <label className="label" htmlFor="mobile">
                شماره موبایل
              </label>
              <input
                id="mobile"
                name="mobile"
                dir="ltr"
                inputMode="numeric"
                className={`field ${r.errors.mobile ? 'field-error' : ''}`}
                placeholder="09123456789"
                value={r.values.mobile}
                onChange={(e) => r.setField('mobile', e.target.value)}
                onBlur={r.normalizeOnBlur}
              />
              {r.errors.mobile ? (
                <ErrorMsg>{r.errors.mobile}</ErrorMsg>
              ) : (
                <p className="mt-2 text-xs text-fg-subtle">
                  لینک پرداخت و اطلاعات ورود به پنل به همین شماره ارسال می‌شود.
                </p>
              )}
            </div>

            <div>
              <label className="label" htmlFor="email">
                ایمیل <span className="font-normal text-fg-subtle">(اختیاری)</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                dir="ltr"
                className={`field ${r.errors.email ? 'field-error' : ''}`}
                placeholder="you@example.com"
                value={r.values.email}
                onChange={(e) => r.setField('email', e.target.value)}
              />
              <ErrorMsg>{r.errors.email}</ErrorMsg>
            </div>

            <div>
              <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-7 text-fg-muted">
                <input
                  type="checkbox"
                  name="agree"
                  checked={r.values.agree}
                  onChange={(e) => r.setField('agree', e.target.checked)}
                  className="mt-1.5 h-4 w-4 shrink-0 rounded border-fg-subtle accent-brand-600"
                />
                <span>
                  <Link to="/" className="font-semibold text-brand-600">
                    قوانین و شرایط
                  </Link>{' '}
                  و سیاست حریم خصوصی پینو سایت را می‌پذیرم.
                </span>
              </label>
              <ErrorMsg>{r.errors.agree}</ErrorMsg>
            </div>

            <button
              type="submit"
              data-submit
              disabled={r.submitting}
              className="btn btn-primary w-full py-3.5 disabled:opacity-60"
            >
              <span>{r.submitting ? 'در حال انتقال به درگاه…' : 'ثبت‌نام و پرداخت قسط اول'}</span>
              {!r.submitting && <Icon name="arrowLeft" className="h-4 w-4" />}
            </button>

            <p className="text-center text-xs leading-6 text-fg-subtle">
              جلسه اول رایگان است؛ در صورت انصراف بعد از جلسه اول، مبلغ پرداختی کامل بازگردانده می‌شود.
            </p>
          </form>
        </div>

        {/* ستون چپ: خلاصه سفارش */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <OrderSummary summary={r.summary} />
          </div>
        </div>
      </div>

      <MobileBar summary={r.summary} formRef={r.formRef} />
    </>
  )
}
