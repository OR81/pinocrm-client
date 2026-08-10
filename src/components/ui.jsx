import { useState } from 'react'
import Icon from './Icon'

/* اعداد فارسی */
const FA = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
export const toFa = (v) =>
  String(v ?? '')
    .replace(/\d/g, (d) => FA[Number(d)])
    .replace(/(?<=[۰-۹])\.(?=[۰-۹])/g, '٫')
export const num = (n) => toFa(Number(n ?? 0).toLocaleString('en-US')).replace(/,/g, '٬')
export const money = (n) => `${num(n)} تومان`

/* نشان کوچک */
export function Chip({ tone = 'brand', children, icon }) {
  const tones = {
    brand: 'bg-brand-50 text-brand-700',
    ink: 'bg-surface-3 text-fg2',
    emerald: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    rose: 'bg-rose-50 text-rose-700',
    light: 'bg-white/10 text-white',
  }
  return (
    <span className={`chip ${tones[tone]}`}>
      {icon && <Icon name={icon} className="h-3.5 w-3.5" />}
      {children}
    </span>
  )
}

/* عنوان بخش */
export function SectionHead({ eyebrow, title, sub, center = true, tone = 'dark' }) {
  return (
    <div className={`${center ? 'mx-auto max-w-2xl text-center' : ''}`}>
      {eyebrow && (
        <span
          className={`chip ${tone === 'light' ? 'bg-white/10 text-brand-200' : 'bg-brand-50 text-brand-700'}`}
        >
          {eyebrow}
        </span>
      )}
      <h2 className={`section-title mt-4 ${tone === 'light' ? '!text-white' : ''}`}>{title}</h2>
      {sub && <p className={`section-sub ${tone === 'light' ? '!text-ink-300' : ''}`}>{sub}</p>}
    </div>
  )
}

/* لیست تیک‌دار */
export function CheckList({ items, className = '', tone = 'brand' }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((t, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md ${
              tone === 'light' ? 'bg-white/10 text-brand-300' : 'bg-brand-50 text-brand-600'
            }`}
          >
            <Icon name="check" className="h-3 w-3" strokeWidth={2.6} />
          </span>
          <span className={`text-sm leading-7 ${tone === 'light' ? 'text-ink-300' : 'text-fg-muted'}`}>{t}</span>
        </li>
      ))}
    </ul>
  )
}

/* آکاردئون */
export function Accordion({ items, defaultOpen = -1 }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="divide-y divide-line-soft overflow-hidden rounded-3xl border border-line bg-surface">
      {items.map((it, i) => (
        <div key={i}>
          <button
            className="flex w-full items-center gap-4 px-5 py-4 text-right transition-colors hover:bg-surface-2/60"
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
          >
            <span className="flex-1 text-sm font-semibold text-fg">{it.q}</span>
            <Icon
              name="chevronDown"
              className={`h-4 w-4 shrink-0 text-fg-subtle transition-transform ${open === i ? 'rotate-180' : ''}`}
            />
          </button>
          {open === i && <div className="px-5 pb-5 text-sm leading-8 text-fg-muted">{it.a}</div>}
        </div>
      ))}
    </div>
  )
}

/* آواتار حروف اول */
export function Avatar({ name = '', className = 'h-10 w-10 text-xs' }) {
  const parts = name.trim().split(/\s+/)
  const ini = (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full bg-surface-3 font-bold text-fg-muted ${className}`}
    >
      {ini}
    </span>
  )
}

/* نوار پیشرفت */
export function Bar({ value = 0, max = 100, tone = 'brand', className = '' }) {
  const w = Math.min(100, Math.round((value / (max || 1)) * 100))
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-surface-3 ${className}`}>
      <div
        className={`h-full rounded-full ${tone === 'brand' ? 'bg-brand-600' : 'bg-fg'}`}
        style={{ width: `${w}%` }}
      />
    </div>
  )
}

/* کارت آمار داشبورد */
export function StatCard({ icon, label, value, unit, foot, tone = 'brand' }) {
  const tones = {
    brand: 'bg-brand-50 text-brand-600',
    ink: 'bg-surface-3 text-fg2',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-700',
  }
  return (
    <div className="card p-5">
      <div className="flex items-center gap-2.5">
        <span className={`grid h-8 w-8 place-items-center rounded-xl ${tones[tone]}`}>
          <Icon name={icon} className="h-4 w-4" />
        </span>
        <span className="text-sm text-fg-muted">{label}</span>
      </div>
      <div className="mt-4 text-2xl font-extrabold tracking-tight text-fg tnum">
        {value}
        {unit && <span className="ms-1 text-sm font-medium text-fg-subtle">{unit}</span>}
      </div>
      {foot && <div className="mt-1.5 text-xs text-fg-subtle">{foot}</div>}
    </div>
  )
}
