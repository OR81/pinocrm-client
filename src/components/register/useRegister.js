import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { COURSES } from '../../data/site'

/**
 * منطق صفحه ثبت‌نام — پورت مستقیم app.js
 *  ۱. همگام‌سازی انتخاب دوره بین کارت‌ها و فرم
 *  ۲. محاسبه زنده خلاصه سفارش
 *  ۳. شمارش معکوس تا شروع دوره
 *  ۴. اعتبارسنجی سمت کاربر
 */

export const INSTALLMENTS = 3

const FA = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
export const toFa = (v) => String(v).replace(/\d/g, (d) => FA[+d])
export const money = (n) => toFa(Number(n).toLocaleString('en-US'))

/** پاک‌سازی شماره موبایل: ارقام فارسی/عربی، پیش‌شماره ۰۰۹۸ و ۹۸ */
export function normalizeMobile(raw) {
  let d = String(raw ?? '')
    .replace(/[۰-۹]/g, (ch) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(ch)))
    .replace(/[٠-٩]/g, (ch) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(ch)))
    .replace(/\D+/g, '')

  if (d.indexOf('0098') === 0) d = d.slice(4)
  else if (d.indexOf('98') === 0 && d.length === 12) d = d.slice(2)
  if (d.length === 10 && d.charAt(0) === '9') d = '0' + d

  return d
}

/* ── شمارش معکوس ───────────────────────────────────── */

export function useCountdown(targetSeconds) {
  const calc = useCallback(() => {
    const diff = Math.max(0, targetSeconds * 1000 - Date.now())
    const s = Math.floor(diff / 1000)
    return {
      d: Math.floor(s / 86400),
      h: Math.floor((s % 86400) / 3600),
      m: Math.floor((s % 3600) / 60),
      s: s % 60,
      over: s === 0,
    }
  }, [targetSeconds])

  const [parts, setParts] = useState(calc)

  useEffect(() => {
    setParts(calc())
    const id = setInterval(() => setParts(calc()), 1000)
    return () => clearInterval(id)
  }, [calc])

  return parts
}

/* ── وضعیت فرم ثبت‌نام ─────────────────────────────── */

export function useRegister({ initialCourses = [] } = {}) {
  const [selected, setSelected] = useState(initialCourses)
  const [values, setValues] = useState({ full_name: '', mobile: '', email: '', agree: false })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const formRef = useRef(null)

  const toggleCourse = useCallback((slug) => {
    setSelected((cur) => (cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug]))
    setErrors((e) => {
      const { courses, ...rest } = e
      return rest
    })
  }, [])

  const setField = useCallback((name, value) => {
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((e) => {
      const { [name]: _drop, ...rest } = e
      return rest
    })
  }, [])

  /** موبایل هنگام خروج از فیلد نرمال می‌شود */
  const normalizeOnBlur = useCallback(() => {
    setValues((v) => {
      const n = normalizeMobile(v.mobile)
      return n ? { ...v, mobile: n } : v
    })
  }, [])

  /* خلاصه سفارش */
  const summary = useMemo(() => {
    const items = COURSES.filter((c) => selected.includes(c.slug)).map((c) => ({
      slug: c.slug,
      title: c.title,
      price: c.tuition,
      first: Math.floor(c.tuition / INSTALLMENTS),
    }))
    const total = items.reduce((s, i) => s + i.price, 0)
    const first = items.reduce((s, i) => s + i.first, 0)
    return { items, total, first, rest: total - first, count: items.length }
  }, [selected])

  function validate() {
    const e = {}
    if (selected.length === 0) e.courses = 'حداقل یک دوره انتخاب کنید.'
    if ((values.full_name || '').trim().length < 3) e.full_name = 'نام و نام خانوادگی را کامل وارد کنید.'
    const mob = normalizeMobile(values.mobile)
    if (!/^09\d{9}$/.test(mob)) e.mobile = 'شماره موبایل معتبر نیست. مثال: ۰۹۱۲۳۴۵۶۷۸۹'
    const email = (values.email || '').trim()
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) e.email = 'ایمیل وارد شده معتبر نیست.'
    if (!values.agree) e.agree = 'برای ادامه، قوانین را بپذیرید.'
    setErrors(e)
    return { ok: Object.keys(e).length === 0, mobile: mob }
  }

  const submit = useCallback(
    (ev, onSuccess) => {
      ev.preventDefault()
      const { ok, mobile } = validate()

      if (!ok) {
        // اسکرول به اولین خطا — مثل رفتار app.js
        requestAnimationFrame(() => {
          const el = formRef.current?.querySelector('[data-error]')
          el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        })
        return
      }

      setValues((v) => ({ ...v, mobile }))
      setSubmitting(true)
      // TODO: POST /enrollments  → { paymentUrl }  سپس redirect به درگاه
      setTimeout(() => {
        setSubmitting(false)
        onSuccess?.({ ...values, mobile, courses: selected, amount: summary.first })
      }, 900)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [values, selected, summary.first],
  )

  return {
    selected,
    toggleCourse,
    values,
    setField,
    normalizeOnBlur,
    errors,
    submitting,
    submit,
    summary,
    formRef,
  }
}
