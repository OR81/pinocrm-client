import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Logo from '../components/Logo'
import { Chip, SectionHead, CheckList, toFa } from '../components/ui'
import { INSTRUCTOR, SITE } from '../data/site'

export default function About() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink-950">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div className="container-x relative py-16 sm:py-20">
          <div className="max-w-3xl">
            <Chip tone="light">درباره ما</Chip>
            <h1 className="mt-6 text-3xl font-extrabold leading-[1.35] tracking-tight text-white sm:text-4xl">
              یک آموزشگاه کوچک که خودش هم پروژه اجرا می‌کند
            </h1>
            <p className="mt-5 max-w-2xl leading-8 text-ink-300">
              پینو سایت از دل کار عملی درآمده است. چیزی را درس می‌دهیم که همان هفته برای مشتری‌هایمان
              پیاده‌سازی کرده‌ایم — برای همین مثال‌های کلاس واقعی‌اند، نه ساختگی.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead
              center={false}
              eyebrow="فلسفه ما"
              title="کم اما عمیق"
              sub="ترجیح می‌دهیم دو دوره را درست برگزار کنیم تا ده دوره را سطحی."
            />
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: 'users', t: 'ظرفیت محدود', d: 'حداکثر ۳۰ نفر در هر کلاس تا استاد فرصت داشته باشد کد همه را ببیند.' },
                { icon: 'code', t: 'پروژه‌محور', d: 'خروجی هر دوره یک چیز قابل نمایش است، نه یک گواهی خالی.' },
                { icon: 'calendar', t: 'یک روز در هفته', d: 'یکشنبه‌ها، تا شاغل‌ها هم بتوانند بدون فشار شرکت کنند.' },
                { icon: 'shield', t: 'بدون وعده اغراق‌آمیز', d: 'نمی‌گوییم دو ماهه استخدام می‌شوید؛ می‌گوییم دقیقاً چه چیزی یاد می‌گیرید.' },
              ].map((f) => (
                <div key={f.t} className="card p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                    <Icon name={f.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-bold text-fg">{f.t}</h3>
                  <p className="mt-2 text-sm leading-7 text-fg-muted">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-x pb-20">
        <div className="card overflow-hidden">
          <div className="grid lg:grid-cols-5">
            <div className="relative flex flex-col justify-center bg-ink-950 p-10 lg:col-span-2">
              <div className="grid-bg absolute inset-0" aria-hidden="true" />
              <div className="relative">
                <Logo className="h-12 w-12 text-brand-500" />
                <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-white">{INSTRUCTOR.name}</h3>
                <p className="mt-1.5 text-sm text-fg-subtle">{INSTRUCTOR.role}</p>
                <dl className="mt-8 grid grid-cols-2 gap-5">
                  {INSTRUCTOR.stats.map((s) => (
                    <div key={s.label}>
                      <dd dir="auto" className="text-xl font-extrabold text-white tnum">{s.value}</dd>
                      <dt className="mt-0.5 text-[11px] text-fg-subtle">{s.label}</dt>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="p-10 lg:col-span-3">
              <h4 className="text-lg font-extrabold text-fg">مدرس دوره‌ها</h4>
              <p className="mt-4 text-sm leading-8 text-fg-muted">{INSTRUCTOR.bio}</p>
              <div className="mt-7">
                <CheckList
                  items={[
                    'هر دو دوره را شخصاً تدریس می‌کند؛ دستیار جای استاد نمی‌آید',
                    'در گروه پشتیبانی خودش جواب می‌دهد',
                    'تمرین‌ها را خودش تصحیح و بازخورد می‌دهد',
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-2 py-20">
        <div className="container-x">
          <SectionHead eyebrow="تماس" title="کجا پیدایمان کنید" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { icon: 'pin', t: 'آدرس', v: SITE.address },
              { icon: 'phone', t: 'تلفن', v: `${SITE.phone} · ${SITE.mobile}` },
              { icon: 'mail', t: 'ایمیل', v: SITE.email },
            ].map((c) => (
              <div key={c.t} className="card p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl tile">
                  <Icon name={c.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-bold text-fg">{c.t}</h3>
                <p className="mt-2 text-sm leading-7 text-fg-muted tnum">{c.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-brand-200 bg-brand-50 p-6 text-center">
            <p className="text-sm leading-8 text-brand-900">
              ساعت کاری دفتر: شنبه تا چهارشنبه <span className="tnum font-bold">{toFa('۹:۰۰ تا ۱۷:۰۰')}</span> ·
              کلاس‌ها یکشنبه‌ها از <span className="tnum font-bold">{toFa('۱۴:۰۰')}</span>
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-8 py-14 text-center sm:px-14">
          <div className="grid-bg absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-white">بیایید جلسه اول را ببینید</h2>
            <p className="mt-4 leading-8 text-ink-300">رایگان است و هیچ تعهدی ایجاد نمی‌کند.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/register" className="btn btn-light px-6 py-3.5">
                ثبت‌نام
              </Link>
              <Link to="/courses" className="btn btn-outline-light px-6 py-3.5">
                دیدن کلاس‌ها
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
