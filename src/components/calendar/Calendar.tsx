import React, { useEffect, useState } from "react"
import moment from "moment"
import { ICalendarProps } from "./ICalendar"
import MonthList from "./MonthList"
import YearList from "./YearList"

import { weekDaysNames } from "./config"

import buildCalendar, {
  currMonth,
  currYear,
  prevMonth,
  nextMonth,
  dayStyles,
} from "./functions"

const Calendar: React.FC<ICalendarProps> = ({
  currValue,
  setCurrValue,
  config = {},
}) => {
  const [calendar, setCalendar] = useState([])
  const [selectedDay, setSelectedDay] = useState(moment())
  const [inputValue, setInputValue] = useState("")
  const [showCalendar, setShowCalendar] = useState(false)
  const [showDays, setShowDays] = useState(false)
  const [showMonthList, setShowMonthList] = useState(false)
  const [showYearList, setShowYearList] = useState(false)

  function handleOutsideClick(e) {
    for (let i = 0; i < e.path.length; i++) {
      if (
        e.path[i].classList &&
        e.path[i].classList.contains("__mwd-calendar-wrapper")
      ) {
        return
      }
    }

    console.log(setShowCalendar(false))
  }

  useEffect(() => {
    setCalendar(buildCalendar(currValue))

    document.addEventListener("click", handleOutsideClick)

    return () => {
      document.removeEventListener("click", handleOutsideClick)
    }
  }, [currValue])

  return (
    <div className="__mwd-calendar-wrapper">
      <input
        className={config.inputClassName || "__mwd-input-basic"}
        value={inputValue}
        placeholder={config.placeholder ? config.placeholder : ""}
        onChange={e => {
          console.log(e.target.value)
        }}
        onFocus={() => {
          if (!showMonthList && !showYearList) {
            setShowCalendar(true)
            setShowDays(true)
          }
        }}
        type="text"
      />
      {showCalendar && (
        <div className="__mwd-calendar">
          <div className="__mwd-calendar-header">
            <div
              className="arrow-prev"
              onClick={() => setCurrValue(prevMonth(currValue))}
            ></div>
            <div
              className="month-year-names"
              onClick={() => {
                setShowDays(false)
                setShowYearList(true)
              }}
            >
              {currMonth(currValue)}, {currYear(currValue)}
            </div>
            <div
              className="arrow-next"
              onClick={() => setCurrValue(nextMonth(currValue))}
            ></div>
          </div>

          {showDays && (
            <>
              <div className="__mwd-weeknames">
                {weekDaysNames.map((name, idx) => {
                  return (
                    <div key={idx} className="mwd-weekname">
                      {name}
                    </div>
                  )
                })}
              </div>
              <div className="__mwd-calendar-month">
                {calendar.map((day: moment.Moment, idx: number) => (
                  <div
                    className={
                      "__mwd-calendar-day " +
                      dayStyles(day, currValue, selectedDay)
                    }
                    key={idx}
                    onClick={() => {
                      setSelectedDay(day)
                      setCurrValue(day)
                      setInputValue(day.format("DD/MM/YYYY"))
                      setShowDays(false)
                      setShowCalendar(false)
                    }}
                  >
                    {day.format("DD")}
                  </div>
                ))}
              </div>
            </>
          )}

          {showMonthList && (
            <MonthList
              onSelectMonth={(val: moment.Moment) => {
                setCurrValue(val)
                setInputValue(val.format("DD/MM/YYYY"))
                setShowMonthList(false)
                setShowDays(true)
              }}
              selectedDay={currValue}
            />
          )}
          {showYearList && (
            <YearList
              onSelectYear={(val: moment.Moment) => {
                setCurrValue(val)
                setInputValue(val.format("DD/MM/YYYY"))
                setShowYearList(false)
                setShowMonthList(true)
              }}
              selectedDay={currValue}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Calendar
