/* ---------------------------------------------------------------
   تنها لایه‌ای که با بک‌اند حرف می‌زند.
   آدرس API را در فایل .env بگذار:
   REACT_APP_API_URL=http://localhost:8000/api/v1

   تا وقتی این متغیر خالی باشد، داده‌ی نمونه‌ی data.js برگردانده
   می‌شود تا صفحه بدون بک‌اند هم بالا بیاید.
--------------------------------------------------------------- */

import { mockDashboard } from "./data";


const BASE_URL = process.env.REACT_APP_API_URL;


export const getToken = () => localStorage.getItem("token");


/* بک‌اند snake_case می‌دهد، فرانت camelCase می‌خواهد */

const toCamel = (value) => {

  if (Array.isArray(value)) return value.map(toCamel);

  if (value === null || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      key.replace(/_([a-z])/g, (match, char) => char.toUpperCase()),
      toCamel(item),
    ])
  );

};


const request = async (path) => {

  const response = await fetch(BASE_URL + path, {

    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },

  });


  if (response.status === 401) {

    localStorage.removeItem("token");

    throw new Error("نشست شما منقضی شده است. دوباره وارد شوید.");

  }


  const body = await response.json().catch(() => null);


  if (!response.ok) {

    throw new Error(body?.error?.message || "خطا در ارتباط با سرور");

  }


  return toCamel(body);

};


export const getDashboard = () => {

  if (!BASE_URL) return Promise.resolve(mockDashboard);

  return request("/dashboard");

};
