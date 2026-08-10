import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout, { Field } from '../components/AuthLayout'
import Icon from '../components/Icon'
import { toFa } from '../components/ui'

export default function Login() {
  const nav = useNavigate()
  const [form, setForm] = useState({ identifier: '', password: '', remember: true })
  const [errors, setErrors] = useState({})
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState('student')

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  function validate() {
    const e = {}
    if (!form.identifier.trim()) e.identifier = 'شماره موبایل یا ایمیل را وارد کنید'
    else if (!/^(09\d{9}|[^@\s]+@[^@\s]+\.[^@\s]+)$/.test(form.identifier.trim()))
      e.identifier = 'شماره موبایل باید با ۰۹ شروع شود یا ایمیل معتبر وارد کنید'
    if (!form.password) e.password = 'رمز عبور را وارد کنید'
    else if (form.password.length < 6) e.password = 'رمز عبور حداقل ۶ کاراکتر است'
    setErrors(e)
    return !Object.keys(e).length
  }

  function submit(ev) {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    // TODO: POST /auth/login  → { token, user }
    setTimeout(() => {
      setLoading(false)
      nav(role === 'instructor' ? '/dashboard/instructor' : '/dashboard/student')
    }, 700)
  }

  return (
    <AuthLayout
      title="ورود به پنل"
      sub="با شماره موبایلی که با آن ثبت‌نام کرده‌اید وارد شوید."
      footer="© ۱۴۰۵ پینو سایت"
    >
      <form onSubmit={submit} noValidate className="space-y-5">
        {/* انتخاب نقش — برای دموی پنل‌ها */}
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-surface-2 p-1.5">
          {[
            { v: 'student', l: 'دانشجو' },
            { v: 'instructor', l: 'استاد' },
          ].map((r) => (
            <button
              key={r.v}
              type="button"
              onClick={() => setRole(r.v)}
              className={`rounded-xl py-2.5 text-sm font-semibold transition-colors ${
                role === r.v ? 'bg-surface text-fg' : 'text-fg-muted hover:text-fg2'
              }`}
            >
              {r.l}
            </button>
          ))}
        </div>

        <Field label="موبایل یا ایمیل" id="identifier" error={errors.identifier}>
          <input
            id="identifier"
            className={`field ${errors.identifier ? 'field-error' : ''}`}
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            dir="ltr"
            value={form.identifier}
            onChange={set('identifier')}
            autoComplete="username"
          />
        </Field>

        <Field label="رمز عبور" id="password" error={errors.password}>
          <div className="relative">
            <input
              id="password"
              type={showPass ? 'text' : 'password'}
              className={`field pe-14 ${errors.password ? 'field-error' : ''}`}
              placeholder="••••••••"
              dir="ltr"
              value={form.password}
              onChange={set('password')}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute inset-y-0 end-3 grid place-items-center text-fg-subtle hover:text-fg2"
              aria-label={showPass ? 'پنهان کردن رمز' : 'نمایش رمز'}
            >
              <Icon name={showPass ? 'eyeOff' : 'eye'} className="h-4.5 w-4.5" />
            </button>
          </div>
        </Field>

        <div className="flex items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-fg-muted">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={set('remember')}
              className="h-4 w-4 rounded border-fg-subtle accent-brand-600"
            />
            مرا به خاطر بسپار
          </label>
          <Link to="/forgot-password" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            رمز عبور را فراموش کرده‌اید؟
          </Link>
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary w-full py-3.5 disabled:opacity-60">
          {loading ? 'در حال ورود…' : 'ورود'}
          {!loading && <Icon name="arrowLeft" className="h-4 w-4" />}
        </button>

        <p className="text-center text-sm text-fg-muted">
          هنوز ثبت‌نام نکرده‌اید؟{' '}
          <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">
            ایجاد حساب کاربری
          </Link>
        </p>

        <div className="rounded-2xl border border-line bg-surface-2 p-4 text-xs leading-6 text-fg-muted">
          <span className="font-semibold text-fg2">حساب نمایشی:</span> موبایل{' '}
          <span className="tnum">{toFa('09123456789')}</span> — رمز <span dir="ltr">demo1234</span>
        </div>
      </form>
    </AuthLayout>
  )
}
