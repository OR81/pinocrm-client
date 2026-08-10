import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LogoWordmark } from './Logo'
import Icon from './Icon'
import { ThemeToggle } from './theme'

const LINKS = [
  { to: '/', label: 'خانه', end: true },
  { to: '/courses', label: 'کلاس‌ها' },
  { to: '/services', label: 'خدمات' },
  { to: '/about', label: 'درباره ما' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled ? 'border-line/70 bg-surface/90 backdrop-blur' : 'border-transparent bg-surface'
      }`}
    >
      <div className="container-x flex h-16 items-center gap-6">
        <Link to="/" aria-label="پینو سایت">
          <LogoWordmark markClass="h-9 w-9 text-brand-600" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive ? 'bg-surface-2 font-semibold text-fg' : 'text-fg-muted hover:text-fg'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="ms-auto hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link to="/login" className="btn btn-ghost">
            ورود
          </Link>
          <Link to="/register" className="btn btn-primary">
            ثبت‌نام در دوره
            <Icon name="arrowLeft" className="h-4 w-4" />
          </Link>
        </div>

        <div className="ms-auto flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-line text-fg2"
            onClick={() => setOpen((v) => !v)}
            aria-label="منو"
          >
            <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line-soft bg-surface md:hidden">
          <div className="container-x flex flex-col gap-1 py-3">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm ${isActive ? 'bg-surface-2 font-semibold' : 'text-fg-muted'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link to="/login" className="btn btn-ghost">
                ورود
              </Link>
              <Link to="/register" className="btn btn-primary">
                ثبت‌نام
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
