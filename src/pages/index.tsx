import React from "react"
import Head from "next/head"
import Calendar from "../components/calendar/Calendar"
import moment from "moment"

const Home: React.FC = () => {
  const [currValue, setCurrValue] = React.useState(moment())

  return (
    <div>
      <Head>
        <title>Home page</title>
      </Head>

      <div className="calendar-wrapper">
        <Calendar
          currValue={currValue}
          setCurrValue={setCurrValue}
          config={{ placeholder: "Check in" }}
        />
        <Calendar
          currValue={currValue.clone().add(1, "year")}
          setCurrValue={setCurrValue}
          config={{ placeholder: "Check in" }}
        />
      </div>
    </div>
  )
}

export default Home
