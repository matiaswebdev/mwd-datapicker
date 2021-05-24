import React from "react"
import { IMonthList } from "./ICalendar"
import { monthNames } from "./config"

const MonthList: React.FC<IMonthList> = ({ selectedDay, onSelectMonth }) => {
  return (
    <div className="__mwd-month-list">
      {monthNames.map((month, idx) => {
        return (
          <div
            key={idx}
            className="mth"
            onClick={() => {
              const date = selectedDay.clone().set("month", idx)
              onSelectMonth(date)
            }}
          >
            {month}
          </div>
        )
      })}
    </div>
  )
}

export default MonthList
