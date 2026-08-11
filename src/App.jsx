import { useEffect } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Logo from './components/Logo'

import Home from './pages/Home'
import Services from './pages/Services'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import StudentDashboard from './pages/students/Dashboard'
import InstructorDashboard from './pages/Instructor/Dashboard'
 import { RequireRole } from './auth'
/** صفحاتی که هدر و فوتر عمومی ندارند */
const BARE = ['/login', '/forgot-password', '/dashboard']

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function NotFound() {
  return (
    <div className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <Logo className="h-14 w-14 text-brand-600" />
      <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-ink-900">صفحه پیدا نشد</h1>
      <p className="mt-3 leading-8 text-ink-500">
        آدرسی که دنبالش بودید وجود ندارد یا جابه‌جا شده است.
      </p>
      <Link to="/" className="btn btn-primary mt-8 px-6 py-3.5">
        بازگشت به صفحه اصلی
      </Link>
    </div>
  )
}

export default function App() {
  const { pathname } = useLocation()
  const bare = BARE.some((p) => pathname.startsWith(p))

  return (
    <>
      <ScrollToTop />
      {!bare && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/instructor" element={<InstructorDashboard />} />

<Route
  path="/dashboard/student"
  element={<RequireRole role="student"><StudentDashboard /></RequireRole>}
/>
<Route
  path="/dashboard/instructor"
  element={<RequireRole role="instructor"><InstructorDashboard /></RequireRole>}
/>

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!bare && <Footer />}
    </>
  )
}
