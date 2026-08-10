import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import Icon from './Icon'

const KEY = 'pino.theme'
const ThemeCtx = createContext({ theme: 'light', setTheme: () => {}, toggle: () => {} })

function initial() {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    /* حالت private */
  }
  // اگر کاربر چیزی انتخاب نکرده، از تنظیم سیستم پیروی می‌کنیم
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initial)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.colorScheme = theme
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#080b12' : '#ffffff')
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      /* نادیده */
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])

  return <ThemeCtx.Provider value={{ theme, setTheme, toggle }}>{children}</ThemeCtx.Provider>
}

export const useTheme = () => useContext(ThemeCtx)

/** دکمه تعویض تم — روی پس‌زمینه روشن یا تیره */
export function ThemeToggle({ tone = 'default', className = '' }) {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'

  const base =
    tone === 'light'
      ? 'border-white/20 text-white hover:bg-white/10'
      : 'border-line text-fg-muted hover:bg-surface-2 hover:text-fg'

  return (
    <button
      type="button"
      onClick={toggle}
      className={`grid h-10 w-10 place-items-center rounded-xl border transition-colors ${base} ${className}`}
      title={dark ? 'تم روشن' : 'تم تیره'}
      aria-label={dark ? 'تغییر به تم روشن' : 'تغییر به تم تیره'}
    >
      <Icon name={dark ? 'sun' : 'moon'} className="h-4.5 w-4.5" />
    </button>
  )
}
