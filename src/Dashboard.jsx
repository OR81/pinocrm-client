import "./Dashboard.css";

import {
  MdArrowBack,
  MdMenuBook,
  MdAccessTime,
  MdEventAvailable,
  MdPlaylistAddCheck,
} from "react-icons/md";

import DaySchedule from "./DaySchedule";

import { faNumber, faTime, faWeekday, faFullDate, courseColor } from "./format";


const Dashboard = ({ term, classDay, courses, serverTime }) => {

  /* همه‌ی عددها از روی خود دوره‌ها حساب می‌شوند، هیچ‌کدام دستی نیست */

  const totalSessions = courses.reduce((sum, item) => sum + item.totalSessions, 0);

  const heldSessions = courses.reduce((sum, item) => sum + item.heldSessions, 0);


  /* اولین کلاسی که هنوز شروع نشده — با ساعت سرور، نه ساعت کاربر */

  const now = new Date(serverTime);

  const nextCourse =
    courses.find((item) => new Date(item.startsAt) > now) || courses[0];


  /* روزهای مانده تا پایان دوره */

  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(term.endDate) - now) / 86400000)
  );


  const stats = [

    {
      id: 1,
      label: "دوره‌های من",
      value: faNumber(courses.length),
      hint: term.title,
      icon: <MdMenuBook />,
    },

    {
      id: 2,
      label: "کلاس بعدی",
      value: nextCourse ? faTime(nextCourse.startsAt) : "—",
      hint: nextCourse ? `${faWeekday(classDay)} — ${nextCourse.title}` : "کلاسی ثبت نشده",
      icon: <MdAccessTime />,
    },

    {
      id: 3,
      label: "تا پایان دوره",
      value: `${faNumber(daysLeft)} روز`,
      hint: faFullDate(term.endDate),
      icon: <MdEventAvailable />,
    },

    {
      id: 4,
      label: "جلسات باقی‌مانده",
      value: faNumber(totalSessions - heldSessions),
      hint: `از مجموع ${faNumber(totalSessions)} جلسه`,
      icon: <MdPlaylistAddCheck />,
    },

  ];


  return (

    <div className="dashboard">

      <div className="pageHead">

        <h1>سلام، خوش آمدید</h1>

        <span>{faFullDate(classDay)}</span>

      </div>


      <div className="statsGrid">

        {stats.map((item) => (

          <div className="box stat" key={item.id}>

            <div className="statTop">

              <span className="statLabel">{item.label}</span>

              <span className="statIcon">{item.icon}</span>

            </div>

            <h2>{item.value}</h2>

            <span className="statHint">{item.hint}</span>

          </div>

        ))}

      </div>


      <div className="grid">

        <div className="box">

          <div className="boxHead">

            <h4>دوره‌های من</h4>

            <button type="button" className="link">

              <span>همه دوره‌ها</span>

              <MdArrowBack />

            </button>

          </div>


          <div className="courseList">

            {courses.length === 0 && (
              <p className="empty">هنوز در دوره‌ای ثبت‌نام نکرده‌اید.</p>
            )}

            {courses.map((item) => (

              <div
                className="course"
                key={item.id}
                style={{ "--course": courseColor(item.id) }}
              >

                <div className="courseTop">

                  <div>

                    <h5>{item.title}</h5>

                    <span className="courseMeta">{item.subtitle}</span>

                  </div>

                  <span className="tag">
                    {faWeekday(classDay)} {faTime(item.startsAt)}
                  </span>

                </div>


                <div className="progress">

                  <div
                    className="progressFill"
                    style={{ width: `${(item.heldSessions / item.totalSessions) * 100}%` }}
                  />

                </div>


                <div className="courseBottom">

                  <span>
                    جلسه {faNumber(item.heldSessions)} از {faNumber(item.totalSessions)}
                  </span>

                  <span>
                    {item.teacher} — {item.room}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>


        <DaySchedule day={classDay} courses={courses} />

      </div>

    </div>

  );

};


export default Dashboard;