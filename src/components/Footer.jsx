import { Link } from 'react-router-dom'
import { LogoWordmark } from './Logo'
import Icon from './Icon'
import { SITE, COURSES, SERVICES } from '../data/site'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line/70 bg-surface-2">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <LogoWordmark markClass="h-10 w-10 text-brand-600" />
          <p className="mt-4 text-sm leading-7 text-fg-muted">
            آموزش پایتون و اتوماسیون، طراحی CRM اختصاصی و خودکارسازی فرآیندهای کسب‌وکار.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href={`https://instagram.com/${SITE.instagram}`}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface text-fg-muted transition-colors hover:text-brand-600"
              aria-label="اینستاگرام"
            >
              <Icon name="spark" className="h-4 w-4" />
            </a>
            <a
              href={`https://t.me/${SITE.telegram}`}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface text-fg-muted transition-colors hover:text-brand-600"
              aria-label="تلگرام"
            >
              <Icon name="send" className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-fg">کلاس‌ها</h4>
          <ul className="mt-4 space-y-3 text-sm text-fg-muted">
            {COURSES.map((c) => (
              <li key={c.slug}>
                <Link to={`/courses/${c.slug}`} className="transition-colors hover:text-brand-600">
                  {c.title}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/courses" className="transition-colors hover:text-brand-600">
                تقویم و شهریه
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-fg">خدمات</h4>
          <ul className="mt-4 space-y-3 text-sm text-fg-muted">
            {SERVICES.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link to={`/services#${s.slug}`} className="transition-colors hover:text-brand-600">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-fg">تماس</h4>
          <ul className="mt-4 space-y-3 text-sm text-fg-muted">
            <li className="flex items-start gap-2">
              <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-fg-subtle" />
              <span className="leading-6">{SITE.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="phone" className="h-4 w-4 shrink-0 text-fg-subtle" />
              <span className="tnum">{SITE.phone}</span>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="mail" className="h-4 w-4 shrink-0 text-fg-subtle" />
              <span>{SITE.email}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line/70">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-fg-subtle sm:flex-row">
          <span>© ۱۴۰۵ پینو سایت — تمام حقوق محفوظ است.</span>
          <span className="flex items-center gap-4">
            <Link to="/services" className="hover:text-fg-muted">
              خدمات
            </Link>
            <Link to="/courses" className="hover:text-fg-muted">
              کلاس‌ها
            </Link>
            <Link to="/login" className="hover:text-fg-muted">
              ورود به پنل
            </Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
