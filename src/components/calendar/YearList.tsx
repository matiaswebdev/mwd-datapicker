import React from "react"
import { IYearList } from "./ICalendar"

const YearList: React.FC<IYearList> = ({ selectedDay, onSelectYear }) => {
  const [years, setYears] = React.useState([])
  const selectedYear = +selectedDay.clone().format("YYYY")

  function handleYears(year: number) {
    const date = selectedDay.clone().set("year", year)
    onSelectYear(date)
  }

  React.useEffect(() => {
    const temp = []

    for (let i = selectedYear - 4; i < selectedYear + 12; i++) {
      temp.push(i)
    }
    setYears(temp)
  }, [])

  return (
    <div className="__mwd-years-list">
      {years.map((year, idx) => {
        return (
          <div
            key={idx}
            className={"year " + selectedYear}
            onClick={() => {
              handleYears(+year)
            }}
          >
            {year}
          </div>
        )
      })}
    </div>
  )
}

export default YearList
