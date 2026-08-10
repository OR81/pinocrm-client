import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { Chip, CheckList } from '../components/ui'
import RegisterSection, { Countdown } from '../components/register/RegisterSection'
import { SITE, INSTRUCTOR } from '../data/site'

/**
 * صفحه ثبت‌نام — همان فرم و منطق app.js
 * (انتخاب دوره، خلاصه سفارش زنده، شمارش معکوس، اعتبارسنجی و انتقال به درگاه)
 */
export default function Register() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink-950">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div className="container-x relative py-14 sm:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Chip tone="light" icon="calendar">
                ترم {SITE.term} — شروع یکشنبه ۱۴۰۵/۰۶/۰۸
              </Chip>
              <h1 className="mt-6 text-3xl font-extrabold leading-[1.35] tracking-tight text-white sm:text-4xl">
                ثبت‌نام در کلاس‌های پینو سایت
              </h1>
              <p className="mt-5 leading-8 text-ink-300">
                دوره‌ها را انتخاب کنید، اطلاعاتتان را وارد کنید و فقط قسط اول را پرداخت کنید. جلسه اول رایگان
                است و در صورت انصراف، مبلغ کامل برمی‌گردد.
              </p>
            </div>

            <div className="shrink-0">
              <div className="text-[11px] text-ink-400">تا شروع دوره</div>
              <div className="mt-3">
                <Countdown />
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
            {[
              { icon: 'shield', t: 'جلسه اول رایگان', d: 'بدون تعهد؛ نپسندیدید، هزینه برمی‌گردد.' },
              { icon: 'wallet', t: 'پرداخت در ۳ قسط', d: 'امروز فقط قسط اول را می‌پردازید.' },
              { icon: 'users', t: 'ظرفیت محدود', d: 'هر کلاس حداکثر ۳۰ نفر.' },
            ].map((f) => (
              <div key={f.t} className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-300">
                  <Icon name={f.icon} className="h-4.5 w-4.5" />
                </span>
                <div>
                  <div className="text-sm font-bold text-white">{f.t}</div>
                  <div className="mt-0.5 text-xs leading-6 text-ink-400">{f.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-14">
        <RegisterSection initialCourses={['n8n']} />
      </section>

      <section className="container-x pb-20">
        <div className="card grid gap-10 p-8 sm:p-10 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-extrabold text-fg">بعد از ثبت‌نام چه می‌شود؟</h3>
            <div className="mt-6">
              <CheckList
                items={[
                  'پیامک تأیید به همراه لینک پرداخت قسط اول',
                  'دسترسی فوری به پنل دانشجویی و گروه پشتیبانی دوره',
                  'یادآوری جلسه اول در روز یکشنبه',
                  'ویدیوی هر جلسه، حداکثر ۲۴ ساعت بعد در پنل شما',
                ]}
              />
            </div>
          </div>

          <div className="rounded-3xl bg-surface-2 p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl tile">
                <Icon name="phone" className="h-5 w-5" />
              </span>
              <div>
                <div className="font-bold text-fg">سوالی دارید؟</div>
                <div className="text-xs text-fg-subtle">قبل از ثبت‌نام با ما حرف بزنید</div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-8 text-fg-muted">
              اگر مطمئن نیستید کدام دوره مناسب شماست، یک تماس کوتاه بگیرید. {INSTRUCTOR.name} خودش راهنمایی
              می‌کند و اگر دوره به دردتان نخورد، همان را می‌گوید.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={`tel:${SITE.phone}`} className="btn btn-ghost">
                <Icon name="phone" className="h-4 w-4" />
                <span className="tnum">{SITE.phone}</span>
              </a>
              <a href={`https://t.me/${SITE.telegram}`} className="btn btn-ghost">
                <Icon name="send" className="h-4 w-4" />
                تلگرام
              </a>
            </div>
            <p className="mt-6 text-center text-sm text-fg-muted">
              قبلاً ثبت‌نام کرده‌اید؟{' '}
              <Link to="/login" className="font-semibold text-brand-600">
                وارد شوید
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
