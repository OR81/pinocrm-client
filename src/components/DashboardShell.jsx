import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogoWordmark } from './Logo'
import Icon from './Icon'
import { Avatar, toFa } from './ui'
import { ThemeToggle } from './theme'
import { useAuth } from '../auth'

/* اعلان‌های پیش‌فرض — بعداً از GET /me/notifications بیاید */
const DEFAULT_NOTIFS = [
  { id: 1, icon: 'calendar', title: 'یادآوری کلاس فردا', body: 'پایتون ساعت ۱۴:۰۰ و n8n ساعت ۱۷:۰۰', time: '۲ ساعت پیش', read: false },
  { id: 2, icon: 'file', title: 'تمرین جلسه ۱۰ تصحیح شد', body: 'نمره شما: ۱۸٫۵ از ۲۰', time: 'دیروز', read: false },
  { id: 3, icon: 'wallet', title: 'سررسید قسط سوم نزدیک است', body: 'تا ۱۴۰۵/۰۵/۲۵ فرصت دارید', time: '۳ روز پیش', read: true },
  { id: 4, icon: 'play', title: 'ویدیوی جلسه ۱۰ منتشر شد', body: 'اتصال به تلگرام، ایمیل و پیامک', time: '۵ روز پیش', read: true },
]

/**
 * پوسته مشترک داشبوردها: سایدبار + هدر.
 * فقط ستون محتوا اسکرول می‌شود تا سایدبار چسبیده به لبه بماند.
 */
export default function DashboardShell({ nav, active, onNavigate, user, children, title, sub, notifications }) {
  const [open, setOpen] = useState(false)
  const [bell, setBell] = useState(false)
  const [notifs, setNotifs] = useState(notifications ?? DEFAULT_NOTIFS)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const unread = notifs.filter((n) => !n.read).length

  const readAll = () => setNotifs((list) => list.map((n) => ({ ...n, read: true })))
  const readOne = (id) => setNotifs((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)))

  const signOut = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface-2">
      {open && <div className="fixed inset-0 z-40 bg-ink-950/40 lg:hidden" onClick={() => setOpen(false)} />}

      {/* سایدبار */}
      <aside
        className={`fixed inset-y-0 start-0 z-50 flex h-full w-[262px] shrink-0 flex-col border-e border-line bg-surface transition-transform lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-16 shrink-0 items-center border-b border-line-soft px-5">
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
              <div className="px-3 pb-2 text-[11px] font-semibold text-fg-subtle">{group.label}</div>
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

        {/* کاربر + خروج */}
        <div className="shrink-0 border-t border-line-soft p-3">
          <div className="flex items-center gap-2.5 px-2 pb-3">
            <Avatar name={user.name} className="h-9 w-9 text-[11px]" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-fg">{user.name}</div>
              <div className="truncate text-[11px] text-fg-subtle">{user.role}</div>
            </div>
          </div>

          <button
            onClick={signOut}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 py-2.5 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-100"
          >
            <Icon name="logout" className="h-4 w-4" />
            خروج از حساب
          </button>
        </div>
      </aside>

      {/* محتوا */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-line bg-surface px-5">
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

            {/* اعلان‌ها */}
            <div className="relative">
              <button
                onClick={() => setBell((v) => !v)}
                aria-label="اعلان‌ها"
                aria-expanded={bell}
                className={`relative grid h-10 w-10 place-items-center rounded-xl border transition-colors ${
                  bell ? 'border-brand-300 bg-brand-50 text-brand-700' : 'border-line text-fg-muted hover:bg-surface-2'
                }`}
              >
                <Icon name="bell" className="h-4 w-4" />
                {unread > 0 && (
                  <span className="absolute -end-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white tnum">
                    {toFa(unread)}
                  </span>
                )}
              </button>

              {bell && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setBell(false)} />
                  <div className="absolute end-0 top-12 z-50 w-[320px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-line bg-surface">
                    <div className="flex items-center justify-between border-b border-line-soft px-4 py-3">
                      <span className="text-sm font-bold text-fg">اعلان‌ها</span>
                      {unread > 0 && (
                        <button onClick={readAll} className="text-xs font-semibold text-brand-600 hover:text-brand-700">
                          همه را خوانده‌شده کن
                        </button>
                      )}
                    </div>

                    <div className="max-h-[380px] divide-y divide-line-soft overflow-y-auto">
                      {notifs.length === 0 && (
                        <div className="p-8 text-center text-sm text-fg-subtle">اعلان تازه‌ای ندارید</div>
                      )}
                      {notifs.map((n) => (
                        <button
                          key={n.id}
                          onClick={() => readOne(n.id)}
                          className={`flex w-full items-start gap-3 p-4 text-right transition-colors hover:bg-surface-2/60 ${
                            n.read ? '' : 'bg-brand-50/40'
                          }`}
                        >
                          <span
                            className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl ${
                              n.read ? 'bg-surface-3 text-fg-muted' : 'bg-brand-50 text-brand-600'
                            }`}
                          >
                            <Icon name={n.icon} className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold leading-6 text-fg">{n.title}</span>
                            <span className="mt-0.5 block text-xs leading-6 text-fg-muted">{n.body}</span>
                            <span className="mt-1 block text-[11px] text-fg-subtle">{n.time}</span>
                          </span>
                          {!n.read && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-600" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={signOut}
              className="hidden h-10 items-center gap-2 rounded-xl border border-line px-3 text-sm font-semibold text-fg-muted transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 sm:flex"
            >
              <Icon name="logout" className="h-4 w-4" />
              خروج
            </button>
            <Avatar name={user.name} className="h-10 w-10 text-[11px]" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-5 sm:p-7">{children}</main>
      </div>
    </div>
  )
}
