import { Link } from 'react-router-dom'
import Logo, { LogoWordmark } from './Logo'
import Icon from './Icon'
import { CheckList } from './ui'
import { ThemeToggle } from './theme'
import { SITE } from '../data/site'

/** لایوت دوستونه صفحات احراز هویت */
export default function AuthLayout({ title, sub, children, footer, side }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* فرم */}
      <div className="flex flex-col px-5 py-8 sm:px-10">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex">
            <LogoWordmark markClass="h-9 w-9 text-brand-600" />
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-extrabold tracking-tight text-fg">{title}</h1>
            {sub && <p className="mt-2.5 text-sm leading-7 text-fg-muted">{sub}</p>}
            <div className="mt-8">{children}</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-fg-subtle">
          <span>{footer}</span>
          <Link to="/" className="inline-flex items-center gap-1.5 hover:text-fg-muted">
            <Icon name="arrowRight" className="h-3.5 w-3.5" />
            بازگشت به سایت
          </Link>
        </div>
      </div>

      {/* پنل برند */}
      <div className="relative hidden overflow-hidden bg-ink-950 lg:block">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div
          className="absolute -top-32 left-1/2 h-[420px] w-[560px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative flex h-full flex-col justify-center p-14">
          <Logo className="h-14 w-14 text-brand-500" />
          <h2 className="mt-8 text-3xl font-extrabold leading-[1.4] tracking-tight text-white">
            {side?.title ?? 'پنل آموزشی پینو سایت'}
          </h2>
          <p className="mt-5 max-w-md leading-8 text-ink-300">
            {side?.text ??
              'ویدیوی جلسات، تمرین‌ها، نمره‌ها و وضعیت شهریه — همه در یک پنل، از هر دستگاهی.'}
          </p>

          <div className="mt-10 max-w-md">
            <CheckList
              tone="light"
              items={
                side?.items ?? [
                  'ویدیوی ضبط‌شده همه جلسات تا شش ماه',
                  'تمرین‌ها با بازخورد فردی استاد',
                  'وضعیت حضور و غیاب و اقساط شهریه',
                  'دسترسی به گروه پشتیبانی دوره',
                ]
              }
            />
          </div>

          <div className="mt-14 border-t border-white/10 pt-7">
            <p className="text-sm text-fg-subtle">
              مشکلی در ورود دارید؟ با{' '}
              <span className="font-semibold text-white tnum">{SITE.phone}</span> تماس بگیرید.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── ورودی فرم با برچسب و خطا ── */
export function Field({ label, id, error, hint, children, optional }) {
  return (
    <div>
      <label className="label" htmlFor={id}>
        {label}
        {optional && <span className="ms-1.5 font-normal text-fg-subtle">(اختیاری)</span>}
      </label>
      {children}
      {error ? (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-rose-600">
          <Icon name="alert" className="h-3.5 w-3.5" />
          {error}
        </p>
      ) : hint ? (
        <p className="mt-2 text-xs text-fg-subtle">{hint}</p>
      ) : null}
    </div>
  )
}
