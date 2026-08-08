import "./Header.css";

import { MdNotificationsNone, MdMailOutline } from "react-icons/md";

import { faNumber, faDigits } from "./format";


const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");


const Header = ({ student, unread }) => {

  return (

    <header className="header">

      <div className="headerUser">

        {student.avatar ? (
          <img className="avatar" src={student.avatar} alt="" />
        ) : (
          <span className="avatar">{initials(student.fullName)}</span>
        )}

        <div className="headerUserText">

          <h5>{student.fullName}</h5>

          <span>{faDigits(student.studentNumber)}</span>

        </div>

        <button type="button" className="iconButton" aria-label="پیام‌ها">

          <MdMailOutline />

          {unread.messages > 0 && <span className="dot">{faNumber(unread.messages)}</span>}

        </button>

        <button type="button" className="iconButton" aria-label="اعلان‌ها">

          <MdNotificationsNone />

          {unread.notifications > 0 && <span className="dot">{faNumber(unread.notifications)}</span>}

        </button>

      </div>


    </header>

  );

};


export default Header;
