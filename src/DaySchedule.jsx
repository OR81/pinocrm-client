import "./DaySchedule.css";

import { faTime, faWeekday, faHourLabel, minutesOfDay, courseColor } from "./format";


/* بازه‌ی ساعت‌ها از روی خود کلاس‌ها حساب می‌شود */

const HOUR_HEIGHT = 38;


const DaySchedule = ({ day, courses }) => {

  const starts = courses.map((item) => minutesOfDay(item.startsAt));

  const ends = courses.map((item) => minutesOfDay(item.endsAt));

  const startHour = courses.length ? Math.floor(Math.min(...starts) / 60) - 1 : 8;

  const endHour = courses.length ? Math.ceil(Math.max(...ends) / 60) + 1 : 18;

  const gridHeight = (endHour - startHour) * HOUR_HEIGHT;


  const hours = [];

  for (let hour = startHour; hour <= endHour; hour += 1) {

    hours.push(hour);

  }


  const toTop = (iso) => ((minutesOfDay(iso) - startHour * 60) / 60) * HOUR_HEIGHT;


  return (

    <div className="box schedule">

      <div className="boxHead">

        <h4>برنامه {faWeekday(day)}</h4>

        <span className="note">هر هفته</span>

      </div>


      <div className="dayGrid">

        <div className="dayColumn" style={{ height: gridHeight }}>

          {hours.map((hour) => (

            <div
              className="dayLine"
              key={hour}
              style={{ top: (hour - startHour) * HOUR_HEIGHT }}
            />

          ))}


          {courses.length === 0 && <p className="empty">کلاسی ثبت نشده است.</p>}


          {courses.map((item) => (

            <div
              className="dayEvent"
              key={item.id}
              style={{
                "--course": courseColor(item.id),
                top: toTop(item.startsAt),
                height: toTop(item.endsAt) - toTop(item.startsAt),
              }}
            >

              <div>

                <h5>{item.title}</h5>

                <span>{item.teacher} — {item.room}</span>

              </div>

              <span className="timeValue">
                {faTime(item.startsAt)} تا {faTime(item.endsAt)}
              </span>

            </div>

          ))}

        </div>


        <div className="dayAxis" style={{ height: gridHeight }}>

          {hours.map((hour) => (

            <span
              className="axisLabel"
              key={hour}
              style={{ top: (hour - startHour) * HOUR_HEIGHT }}
            >
              {faHourLabel(hour)}
            </span>

          ))}

        </div>

      </div>

    </div>

  );

};


export default DaySchedule;