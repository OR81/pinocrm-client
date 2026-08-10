import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LogoWordmark } from './Logo'
import Icon from './Icon'
import { Avatar } from './ui'
import { ThemeToggle } from './theme'

/**
 * پوسته مشترک داشبوردها: سایدبار + هدر.
 * تب‌ها به‌صورت state داخلی مدیریت می‌شوند تا صفحه ساده بماند.
 */
export default function DashboardShell({ nav, active, onNavigate, user, children, title, sub }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-surface-2">
      {open && (
        <div className="fixed inset-0 z-40 bg-ink-950/40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* سایدبار */}
      <aside
        className={`fixed inset-y-0 end-0 z-50 flex w-[262px] shrink-0 flex-col border-s border-line bg-surface transition-transform lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center border-b border-line-soft px-5">
          <Link to="/">
            <LogoWordmark markClass="h-9 w-9 text-brand-600" sub={false} />
          </Link>
          <button
            className="ms-auto grid h-9 w-9 place-items-center rounded-lg text-fg-subtle lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="بستن"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {nav.map((group) => (
            <div key={group.label} className="mb-5">
              <div className="px-3 pb-2 text-[11px] font-semibold text-ink-300">{group.label}</div>
              {group.items.map((it) => (
                <button
                  key={it.key}
                  onClick={() => {
                    onNavigate(it.key)
                    setOpen(false)
                  }}
                  className={`mb-0.5 flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    active === it.key
                      ? 'bg-brand-50 font-semibold text-brand-700'
                      : 'text-fg-muted hover:bg-surface-2'
                  }`}
                >
                  <Icon name={it.icon} className="h-4 w-4 shrink-0" />
                  <span>{it.label}</span>
                  {it.badge != null && (
                    <span
                      className={`ms-auto rounded-full px-2 py-0.5 text-[11px] tnum ${
                        active === it.key ? 'bg-brand-100 text-brand-700' : 'bg-surface-3 text-fg-muted'
                      }`}
                    >
                      {it.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="border-t border-line-soft p-4">
          <div className="flex items-center gap-2.5">
            <Avatar name={user.name} className="h-9 w-9 text-[11px]" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-fg">{user.name}</div>
              <div className="truncate text-[11px] text-fg-subtle">{user.role}</div>
            </div>
            <Link
              to="/login"
              className="grid h-8 w-8 place-items-center rounded-lg text-fg-subtle hover:bg-surface-2 hover:text-fg2"
              title="خروج"
            >
              <Icon name="logout" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* محتوا */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-surface px-5">
          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-line text-fg2 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="منو"
          >
            <Icon name="menu" className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            <h1 className="truncate text-base font-extrabold tracking-tight text-fg">{title}</h1>
            {sub && <p className="truncate text-xs text-fg-subtle">{sub}</p>}
          </div>

          <div className="ms-auto flex items-center gap-2">
            <span className="hidden text-xs text-fg-subtle sm:inline">
              کلاس‌ها یکشنبه‌ها · امروز <span className="tnum">۱۴۰۵/۰۵/۱۷</span>
            </span>
            <ThemeToggle />
            <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-line text-fg-muted">
              <Icon name="bell" className="h-4 w-4" />
              <span className="absolute end-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
            </button>
            <Avatar name={user.name} className="h-10 w-10 text-[11px]" />
          </div>
        </header>

        <main className="flex-1 p-5 sm:p-7">{children}</main>
      </div>
    </div>
  )
}
