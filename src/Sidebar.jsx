import "./Sidebar.css";

import {
  MdGridView,
  MdMenuBook,
  MdEventNote,
  MdCreditCard,
  MdMailOutline,
  MdSettings,
  MdLogout,
} from "react-icons/md";


const menu = [

  { id: 1, title: "داشبورد", icon: <MdGridView /> },

  { id: 2, title: "دوره‌های من", icon: <MdMenuBook /> },

  { id: 3, title: "برنامه کلاس", icon: <MdEventNote /> },

  { id: 4, title: "پرداخت‌ها", icon: <MdCreditCard /> },

  { id: 5, title: "پیام‌ها", icon: <MdMailOutline /> },

  { id: 6, title: "تنظیمات", icon: <MdSettings /> },

];


const Sidebar = ({ activeId = 1 }) => {

  return (

    <aside className="sidebar">

      <div className="brand">

        <span className="brandMark">P</span>

        <span className="brandName">پینو سایت</span>

      </div>


      <nav className="menu">

        {menu.map((item) => (

          <button
            key={item.id}
            type="button"
            className={item.id === activeId ? "menuItem isActive" : "menuItem"}
          >

            <span className="menuIcon">{item.icon}</span>

            <span>{item.title}</span>

          </button>

        ))}

      </nav>


      <button type="button" className="menuItem logout">

        <span className="menuIcon">
          <MdLogout />
        </span>

        <span>خروج</span>

      </button>

    </aside>

  );

};


export default Sidebar;
