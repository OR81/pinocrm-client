import { useState, useEffect } from "react";

import "./App.css";

import Sidebar from "./Sidebar";

import Header from "./Header";

import Dashboard from "./Dashboard";

import { getDashboard } from "./api";


const App = () => {

  const [data, setData] = useState(null);

  const [error, setError] = useState("");


  useEffect(() => {

    getDashboard()
      .then(setData)
      .catch((problem) => setError(problem.message));

  }, []);


  return (

    <div className="app" dir="rtl">

      <Sidebar activeId={1} />

      <main className="main">

        {error && <p className="state isError">{error}</p>}

        {!error && !data && <p className="state">در حال بارگذاری...</p>}

        {data && (

          <>

            <Header student={data.student} unread={data.unread} />

            <Dashboard
              term={data.term}
              classDay={data.classDay}
              courses={data.courses}
              serverTime={data.serverTime}
            />

          </>

        )}

      </main>

    </div>

  );

};


export default App;
