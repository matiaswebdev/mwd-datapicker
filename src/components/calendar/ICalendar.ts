import React from "react"
import moment from "moment"

export interface IConfig {
  inputClassName?: string
  placeholder?: string
}

export interface ICalendarProps {
  currValue?: moment.Moment
  setCurrValue?: React.Dispatch<React.SetStateAction<moment.Moment>>
  config?: IConfig
}

export interface IMonthList {
  onSelectMonth: (value: moment.Moment) => void
  selectedDay: moment.Moment
}

export interface IYearList {
  onSelectYear: (value: moment.Moment) => void
  selectedDay: moment.Moment
}
