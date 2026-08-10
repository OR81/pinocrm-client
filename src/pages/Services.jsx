import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { Chip, SectionHead, CheckList } from '../components/ui'
import { SERVICES, SITE } from '../data/site'

export default function Services() {
  return (
    <>
      {/* ── سربرگ ── */}
      <section className="relative overflow-hidden bg-ink-950">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div className="container-x relative py-16 sm:py-20">
          <div className="max-w-3xl">
            <Chip tone="light" icon="bolt">
              خدمات کسب‌وکار
            </Chip>
            <h1 className="mt-6 text-3xl font-extrabold leading-[1.35] tracking-tight text-white sm:text-4xl">
              سیستم‌هایی می‌سازیم که کار تکراری را از دوش تیم شما برمی‌دارند
            </h1>
            <p className="mt-5 max-w-2xl leading-8 text-ink-300">
              هر پروژه با یک جلسه رایگان بررسی فرآیند شروع می‌شود: می‌نشینیم، کارهای روزمره‌تان را می‌بینیم و
              مشخص می‌کنیم کدام‌ها ارزش خودکار شدن دارند و کدام‌ها نه.
            </p>
          </div>

          <nav className="mt-10 flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <a key={s.slug} href={`#${s.slug}`} className="chip bg-white/10 text-ink-200 hover:bg-white/20">
                <Icon name={s.icon} className="h-3.5 w-3.5" />
                {s.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ── فهرست خدمات ── */}
      <div className="container-x space-y-20 py-20">
        {SERVICES.map((s, idx) => (
          <section key={s.slug} id={s.slug} className="scroll-mt-24">
            <div className="grid gap-10 lg:grid-cols-12">
              {/* ستون معرفی */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl tile">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold text-fg-subtle tnum">
                    خدمت {String(idx + 1).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d])}
                  </span>
                </div>

                <h2 className="section-title !text-2xl mt-6 sm:!text-3xl">{s.title}</h2>
                <p className="mt-2 text-sm font-semibold text-brand-600">{s.tagline}</p>
                <p className="mt-5 text-sm leading-8 text-fg-muted">{s.what}</p>

                <div className="mt-7 space-y-3">
                  <div className="rounded-2xl border border-rose-200/70 bg-rose-50/60 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-rose-700">
                      <Icon name="alert" className="h-3.5 w-3.5" />
                      مشکل رایج
                    </div>
                    <p className="mt-2 text-sm leading-7 text-rose-900/80">{s.problem}</p>
                  </div>
                  <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/60 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                      <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.6} />
                      بعد از اجرا
                    </div>
                    <p className="mt-2 text-sm leading-7 text-emerald-900/80">{s.result}</p>
                  </div>
                </div>
              </div>

              {/* ستون قابلیت‌ها */}
              <div className="lg:col-span-7">
                <div className="card h-full p-8">
                  <h3 className="text-sm font-bold text-fg">دقیقاً چه کاری انجام می‌دهد؟</h3>
                  <div className="mt-6">
                    <CheckList items={s.does} />
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line-soft pt-6">
                    <Link to="/register" className="btn btn-primary">
                      درخواست جلسه رایگان
                      <Icon name="arrowLeft" className="h-4 w-4" />
                    </Link>
                    <a href={`tel:${SITE.phone}`} className="btn btn-ghost">
                      <Icon name="phone" className="h-4 w-4" />
                      <span className="tnum">{SITE.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ── فرآیند همکاری ── */}
      <section className="bg-surface-2 py-20">
        <div className="container-x">
          <SectionHead
            eyebrow="فرآیند همکاری"
            title="از تماس اول تا تحویل"
            sub="هیچ پروژه‌ای بدون فاز بررسی شروع نمی‌شود. اگر به این نتیجه برسیم که پروژه به‌صرفه نیست، همان اول می‌گوییم."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-4">
            {[
              { n: '۱', t: 'جلسه بررسی رایگان', d: 'فرآیند فعلی‌تان را می‌بینیم و نقاط قابل خودکارسازی را مشخص می‌کنیم.' },
              { n: '۲', t: 'پیشنهاد فنی و قیمت', d: 'دامنه کار، زمان‌بندی و هزینه به‌صورت شفاف و مکتوب.' },
              { n: '۳', t: 'اجرا در بازه‌های کوتاه', d: 'هر دو هفته یک تحویل قابل استفاده، نه یک تحویل بزرگ در پایان.' },
              { n: '۴', t: 'تحویل، آموزش و پشتیبانی', d: 'مستندسازی کامل و آموزش تیم داخلی تا وابسته نمانید.' },
            ].map((st) => (
              <div key={st.n} className="card p-6">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-sm font-bold text-white">
                  {st.n}
                </span>
                <h3 className="mt-5 font-bold text-fg">{st.t}</h3>
                <p className="mt-2 text-sm leading-7 text-fg-muted">{st.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="container-x py-20">
        <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-8 py-14 sm:px-14">
          <div className="grid-bg absolute inset-0" aria-hidden="true" />
          <div className="relative flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-right">
            <div className="max-w-xl">
              <h2 className="text-2xl font-extrabold tracking-tight text-white">
                نمی‌دانید کدام خدمت به دردتان می‌خورد؟
              </h2>
              <p className="mt-3 leading-8 text-ink-300">
                یک تماس کوتاه بگیرید. اگر مسئله‌تان با یک ورک‌فلوی ساده حل شود، همان را می‌گوییم — لازم نیست
                پروژه بزرگ تعریف کنیم.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap justify-center gap-3">
              <a href={`tel:${SITE.phone}`} className="btn btn-light px-6 py-3.5">
                <Icon name="phone" className="h-4 w-4" />
                تماس با ما
              </a>
              <a href={`https://t.me/${SITE.telegram}`} className="btn btn-outline-light px-6 py-3.5">
                <Icon name="send" className="h-4 w-4" />
                تلگرام
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
