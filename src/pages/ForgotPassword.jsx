import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout, { Field } from '../components/AuthLayout'
import Icon from '../components/Icon'
import { toFa } from '../components/ui'

/** سه مرحله: وارد کردن موبایل → کد تأیید → رمز جدید */
export default function ForgotPassword() {
  const [step, setStep] = useState(1)
  const [mobile, setMobile] = useState('')
  const [code, setCode] = useState(['', '', '', '', ''])
  const [pass, setPass] = useState({ a: '', b: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const boxes = useRef([])

  useEffect(() => {
    if (seconds <= 0) return
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [seconds])

  function sendCode(ev) {
    ev.preventDefault()
    if (!/^09\d{9}$/.test(mobile.trim())) {
      setErrors({ mobile: 'شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود' })
      return
    }
    setErrors({})
    setLoading(true)
    // TODO: POST /auth/forgot-password { mobile }
    setTimeout(() => {
      setLoading(false)
      setStep(2)
      setSeconds(120)
      setTimeout(() => boxes.current[0]?.focus(), 60)
    }, 700)
  }

  function onCodeChange(i, v) {
    const digit = v.replace(/\D/g, '').slice(-1)
    const next = [...code]
    next[i] = digit
    setCode(next)
    if (digit && i < 4) boxes.current[i + 1]?.focus()
  }

  function onCodeKey(i, e) {
    if (e.key === 'Backspace' && !code[i] && i > 0) boxes.current[i - 1]?.focus()
  }

  function verify(ev) {
    ev.preventDefault()
    if (code.some((c) => !c)) {
      setErrors({ code: 'کد ۵ رقمی را کامل وارد کنید' })
      return
    }
    setErrors({})
    setLoading(true)
    // TODO: POST /auth/verify-code { mobile, code }
    setTimeout(() => {
      setLoading(false)
      setStep(3)
    }, 600)
  }

  function reset(ev) {
    ev.preventDefault()
    const e = {}
    if (pass.a.length < 8) e.a = 'رمز عبور حداقل ۸ کاراکتر باشد'
    if (pass.a !== pass.b) e.b = 'تکرار رمز عبور مطابقت ندارد'
    setErrors(e)
    if (Object.keys(e).length) return
    setLoading(true)
    // TODO: POST /auth/reset-password { mobile, code, password }
    setTimeout(() => {
      setLoading(false)
      setStep(4)
    }, 700)
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  const titles = {
    1: 'بازیابی رمز عبور',
    2: 'کد تأیید را وارد کنید',
    3: 'رمز عبور جدید',
    4: 'رمز عبور تغییر کرد',
  }
  const subs = {
    1: 'شماره موبایلی که با آن ثبت‌نام کرده‌اید را وارد کنید تا کد تأیید برایتان ارسال شود.',
    2: `کد ۵ رقمی به شماره ${toFa(mobile)} پیامک شد.`,
    3: 'یک رمز عبور جدید و امن انتخاب کنید.',
    4: null,
  }

  return (
    <AuthLayout
      title={titles[step]}
      sub={subs[step]}
      footer="© ۱۴۰۵ پینو سایت"
      side={{
        title: 'دسترسی‌تان را برمی‌گردانیم',
        text: 'بازیابی رمز در سه مرحله انجام می‌شود و کمتر از یک دقیقه طول می‌کشد.',
        items: [
          'ارسال کد تأیید به شماره موبایل ثبت‌شده',
          'اعتبار کد: دو دقیقه',
          'در صورت بروز مشکل با پشتیبانی تماس بگیرید',
        ],
      }}
    >
      {/* نوار مرحله */}
      {step < 4 && (
        <div className="mb-8 flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors ${
                  s <= step ? 'bg-brand-600 text-white' : 'bg-surface-3 text-fg-subtle'
                }`}
              >
                {toFa(s)}
              </span>
              {s < 3 && <span className={`h-0.5 flex-1 rounded ${s < step ? 'bg-brand-600' : 'bg-surface-3'}`} />}
            </div>
          ))}
        </div>
      )}

      {step === 1 && (
        <form onSubmit={sendCode} noValidate className="space-y-5">
          <Field label="شماره موبایل" id="mobile" error={errors.mobile}>
            <input
              id="mobile"
              className={`field ${errors.mobile ? 'field-error' : ''}`}
              placeholder="09123456789"
              dir="ltr"
              inputMode="numeric"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </Field>
          <button type="submit" disabled={loading} className="btn btn-primary w-full py-3.5 disabled:opacity-60">
            {loading ? 'در حال ارسال…' : 'ارسال کد تأیید'}
          </button>
          <p className="text-center text-sm text-fg-muted">
            رمزتان را به یاد آوردید؟{' '}
            <Link to="/login" className="font-semibold text-brand-600">
              بازگشت به ورود
            </Link>
          </p>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={verify} noValidate className="space-y-5">
          <div>
            <span className="label">کد ۵ رقمی</span>
            <div className="flex justify-between gap-2" dir="ltr">
              {code.map((c, i) => (
                <input
                  key={i}
                  ref={(el) => (boxes.current[i] = el)}
                  value={c}
                  onChange={(e) => onCodeChange(i, e.target.value)}
                  onKeyDown={(e) => onCodeKey(i, e)}
                  inputMode="numeric"
                  maxLength={1}
                  className={`field h-14 flex-1 text-center text-xl font-bold tnum ${
                    errors.code ? 'field-error' : ''
                  }`}
                />
              ))}
            </div>
            {errors.code && (
              <p className="mt-2 flex items-center gap-1.5 text-xs text-rose-600">
                <Icon name="alert" className="h-3.5 w-3.5" />
                {errors.code}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-fg-muted">
              {seconds > 0 ? (
                <>
                  ارسال مجدد تا <span className="tnum font-semibold text-fg2">{toFa(`${mm}:${ss}`)}</span>
                </>
              ) : (
                'کد را دریافت نکردید؟'
              )}
            </span>
            <button
              type="button"
              disabled={seconds > 0}
              onClick={() => setSeconds(120)}
              className="font-semibold text-brand-600 disabled:text-ink-300"
            >
              ارسال دوباره
            </button>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary w-full py-3.5 disabled:opacity-60">
            {loading ? 'در حال بررسی…' : 'تأیید کد'}
          </button>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="btn btn-ghost w-full py-3"
          >
            تغییر شماره موبایل
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={reset} noValidate className="space-y-5">
          <Field label="رمز عبور جدید" id="p1" error={errors.a} hint="حداقل ۸ کاراکتر، ترکیبی از حرف و عدد">
            <input
              id="p1"
              type="password"
              dir="ltr"
              className={`field ${errors.a ? 'field-error' : ''}`}
              value={pass.a}
              onChange={(e) => setPass((p) => ({ ...p, a: e.target.value }))}
            />
          </Field>
          <Field label="تکرار رمز عبور" id="p2" error={errors.b}>
            <input
              id="p2"
              type="password"
              dir="ltr"
              className={`field ${errors.b ? 'field-error' : ''}`}
              value={pass.b}
              onChange={(e) => setPass((p) => ({ ...p, b: e.target.value }))}
            />
          </Field>
          <button type="submit" disabled={loading} className="btn btn-primary w-full py-3.5 disabled:opacity-60">
            {loading ? 'در حال ذخیره…' : 'تغییر رمز عبور'}
          </button>
        </form>
      )}

      {step === 4 && (
        <div className="text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
            <Icon name="check" className="h-7 w-7" strokeWidth={2.4} />
          </span>
          <p className="mt-6 leading-8 text-fg-muted">
            رمز عبور شما با موفقیت تغییر کرد. حالا می‌توانید با رمز جدید وارد پنل شوید.
          </p>
          <Link to="/login" className="btn btn-primary mt-8 w-full py-3.5">
            ورود به پنل
            <Icon name="arrowLeft" className="h-4 w-4" />
          </Link>
        </div>
      )}
    </AuthLayout>
  )
}
