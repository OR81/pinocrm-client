import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Logo from '../components/Logo'
import { Chip, SectionHead, CheckList, Accordion, Avatar, toFa } from '../components/ui'
import RegisterSection from '../components/register/RegisterSection'
import { COURSES, SERVICES, TESTIMONIALS, GENERAL_FAQ, INSTRUCTOR, SITE } from '../data/site'

export default function Home() {
  return (
    <>
      {/* ── هیرو ── */}
      <section className="relative overflow-hidden bg-ink-950">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div
          className="absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="container-x relative py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Chip tone="light" icon="calendar">
              ثبت‌نام ترم {SITE.term} باز است — شروع {toFa('۱۴۰۵/۰۶/۰۸')}
            </Chip>

            <h1 className="mt-6 text-3xl font-extrabold leading-[1.35] tracking-tight text-white sm:text-5xl sm:leading-[1.3]">
              برنامه‌نویسی و اتوماسیون را
              <br className="hidden sm:block" />{' '}
              <span className="text-brand-400">روی پروژه واقعی</span> یاد بگیرید
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-ink-300">
              دو دوره حضوری و آنلاین، یکشنبه‌ها با امید رجبی. کنارش برای کسب‌وکارها CRM اختصاصی می‌سازیم و
              فرآیندهای تکراری را خودکار می‌کنیم.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a href="#register" className="btn btn-primary px-6 py-3.5">
                ثبت‌نام در دوره
                <Icon name="arrowLeft" className="h-4 w-4" />
              </a>
              <Link to="/courses" className="btn btn-outline-light px-6 py-3.5">
                مشاهده کلاس‌ها
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
              {INSTRUCTOR.stats.map((s) => (
                <div key={s.label}>
                  <div dir="auto" className="text-2xl font-extrabold text-white tnum sm:text-3xl">{s.value}</div>
                  <div className="mt-1 text-xs text-fg-subtle">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── چرا پینو ── */}
      <section className="container-x py-20">
        <SectionHead
          eyebrow="چرا پینو سایت"
          title="کلاسی که خروجی‌اش یک پروژه است، نه یک جزوه"
          sub="هر دو دوره پروژه‌محورند: جلسه پانزدهم چیزی می‌سازید که می‌توانید به کارفرما نشان بدهید."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: 'users',
              t: 'کلاس کوچک، حداکثر ۳۰ نفر',
              d: 'استاد فرصت دارد کد تک‌تک دانشجوها را ببیند. اگر جایی گیر کردید، همان جلسه حل می‌شود نه هفته بعد.',
            },
            {
              icon: 'code',
              t: 'تمرین با بازخورد فردی',
              d: 'یک جلسه در میان تمرین می‌دهیم و تصحیح‌شده با توضیح برمی‌گردانیم. نمره تنها عدد نیست، توضیح دارد.',
            },
            {
              icon: 'play',
              t: 'ویدیوی همه جلسات',
              d: 'تا شش ماه بعد از دوره در پنل خودتان. جلسه‌ای را از دست دادید؟ همان شب می‌بینید.',
            },
            {
              icon: 'shield',
              t: 'جلسه اول رایگان',
              d: 'بیایید ببینید سبک تدریس به شما می‌خورد یا نه. اگر ادامه ندادید، هیچ هزینه‌ای نمی‌دهید.',
            },
            {
              icon: 'send',
              t: 'پشتیبانی بین جلسات',
              d: 'گروه اختصاصی هر دوره که خود استاد جواب می‌دهد، به‌علاوه یک جلسه رفع اشکال در نیمه دوره.',
            },
            {
              icon: 'wallet',
              t: 'پرداخت تا ۳ قسط',
              d: 'شهریه بدون بهره تقسیم می‌شود. ثبت‌نام هم‌زمان در هر دو دوره ۱۵٪ تخفیف دارد.',
            },
          ].map((f) => (
            <div key={f.t} className="card p-6">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <Icon name={f.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-bold text-fg">{f.t}</h3>
              <p className="mt-2.5 text-sm leading-7 text-fg-muted">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── دوره‌ها + ثبت‌نام ── */}
      <section id="register" className="scroll-mt-20 bg-surface-2 py-20">
        <div className="container-x">
          <SectionHead
            eyebrow="ثبت‌نام ترم تابستان"
            title="دو دوره، هر دو یکشنبه‌ها"
            sub="پایتون بعدازظهر و n8n عصر — پشت سر هم، تا با یک بار آمدن هر دو را برداری."
          />

          <div className="mt-14">
            <RegisterSection initialCourses={['n8n']} />
          </div>
        </div>
      </section>

      {/* ── خدمات ── */}
      <section className="container-x py-20">
        <SectionHead
          eyebrow="برای کسب‌وکارها"
          title="فقط آموزش نمی‌دهیم؛ خودمان هم می‌سازیم"
          sub="CRM اختصاصی، اتوماسیون فرآیند، یکپارچه‌سازی سیستم‌ها و ایجنت هوش مصنوعی."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              to={`/services#${s.slug}`}
              className="card group p-6 transition-colors hover:border-brand-300"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl tile transition-colors group-hover:bg-brand-600">
                <Icon name={s.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-bold text-fg">{s.title}</h3>
              <p className="mt-2 text-sm text-fg-subtle">{s.tagline}</p>
              <p className="mt-3 text-sm leading-7 text-fg-muted">{s.what.slice(0, 95)}…</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                بیشتر بخوانید
                <Icon name="arrowLeft" className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── استاد ── */}
      <section className="container-x pb-20">
        <div className="card overflow-hidden">
          <div className="grid lg:grid-cols-5">
            <div className="relative flex flex-col justify-center bg-ink-950 p-10 lg:col-span-2">
              <div className="grid-bg absolute inset-0" aria-hidden="true" />
              <div className="relative">
                <Logo className="h-12 w-12 text-brand-500" />
                <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-white">{INSTRUCTOR.name}</h3>
                <p className="mt-1.5 text-sm text-fg-subtle">{INSTRUCTOR.role}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {INSTRUCTOR.skills.map((s) => (
                    <span key={s} className="chip bg-white/10 text-ink-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-10 lg:col-span-3">
              <h4 className="section-title !text-2xl">استادی که خودش هر روز همین کارها را می‌کند</h4>
              <p className="mt-5 text-sm leading-8 text-fg-muted">{INSTRUCTOR.bio}</p>
              <div className="mt-8">
                <CheckList
                  items={[
                    'تدریس بر پایه پروژه‌های واقعی مشتریان، نه مثال‌های کتابی',
                    'پاسخگویی مستقیم خود استاد در گروه پشتیبانی دوره',
                    'بازخورد فردی روی کد و تمرین هر دانشجو',
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── نظرات ── */}
      <section className="bg-surface-2 py-20">
        <div className="container-x">
          <SectionHead eyebrow="نظر دانشجویان" title="چه چیزی تغییر کرد" />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="card flex flex-col p-6">
                <div className="flex gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="star" className="h-4 w-4 fill-current" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-8 text-fg-muted">«{t.text}»</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line-soft pt-5">
                  <Avatar name={t.name} />
                  <div>
                    <div className="text-sm font-bold text-fg">{t.name}</div>
                    <div className="text-xs text-fg-subtle">
                      {t.role} · {t.course}
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── سوالات ── */}
      <section className="container-x py-20">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <SectionHead
              center={false}
              eyebrow="سوالات متداول"
              title="چیزهایی که معمولاً می‌پرسند"
              sub="جوابش را اینجا پیدا نکردید؟ زنگ بزنید یا در تلگرام بپرسید."
            />
            <a href={`tel:${SITE.phone}`} className="btn btn-ghost mt-7">
              <Icon name="phone" className="h-4 w-4" />
              <span className="tnum">{SITE.phone}</span>
            </a>
          </div>
          <div className="lg:col-span-2">
            <Accordion items={GENERAL_FAQ} defaultOpen={0} />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="container-x pb-4">
        <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-8 py-16 text-center sm:px-16">
          <div className="grid-bg absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              جلسه اول رایگان است — بیایید ببینید
            </h2>
            <p className="mt-4 leading-8 text-ink-300">
              ظرفیت هر کلاس ۳۰ نفر است و ترم {SITE.term} تقریباً پر شده. اگر شک دارید، فقط برای جلسه اول ثبت‌نام
              کنید.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/register" className="btn btn-light px-6 py-3.5">
                ثبت‌نام در دوره
              </Link>
              <Link to="/courses" className="btn btn-outline-light px-6 py-3.5">
                مقایسه دوره‌ها
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
