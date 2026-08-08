/* ---------------------------------------------------------------
   داده‌ی نمونه — دقیقاً هم‌شکل پاسخ GET /api/v1/dashboard
   وقتی REACT_APP_API_URL ست شود، دیگر استفاده نمی‌شود.
--------------------------------------------------------------- */

export const mockDashboard = {

  serverTime: "2026-05-03T09:20:00+03:30",

  student: {

    id: 1042,

    fullName: "آیلین ",

    studentNumber: "40412087",

    avatar: null,

  },

  term: {

    id: 3,

    title: "دوره‌ی زمستان ۱۴۰۴",

    startDate: "2026-01-04",

    endDate: "2026-06-21",

  },

  classDay: "2026-05-03",

  unread: {

    notifications: 2,

    messages: 1,

  },

  courses: [

    {
      id: 1,
      title: "پایتون",
      subtitle: "برنامه‌نویسی پایتون از پایه",
      teacher: "امید رجبی",
      room: "کلاس ۲۰۲",
      weekday: 1,
      startsAt: "2026-05-03T10:00:00+03:30",
      endsAt: "2026-05-03T12:00:00+03:30",
      totalSessions: 16,
      heldSessions: 9,
    },

    {
      id: 2,
      title: "n8n",
      subtitle: "اتوماسیون فرایندها با n8n",
      teacher: "امید رجبی",
      room: "کلاس ۳۰۱",
      weekday: 1,
      startsAt: "2026-05-03T14:00:00+03:30",
      endsAt: "2026-05-03T16:00:00+03:30",
      totalSessions: 12,
      heldSessions: 4,
    },

  ],

};
