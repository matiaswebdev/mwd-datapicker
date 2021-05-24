import moment from "moment"
import { monthNames } from "./config"

function isSelected(selectedDay: moment.Moment, day: moment.Moment): boolean {
  return selectedDay.isSame(day, "day")
}

function isToday(day: moment.Moment): boolean {
  return day.isSame(new Date(), "day")
}

function isDayPastMonth(day: moment.Moment, value: moment.Moment): any {
  return day.isBefore(value, "month")
}

function isDayNextMonth(day: moment.Moment, value: moment.Moment): boolean {
  return day.isAfter(value, "month")
}

export function dayStyles(
  day: moment.Moment,
  value: moment.Moment,
  selectedDay: moment.Moment
): string {
  if (isDayPastMonth(day, value)) return "before"
  if (isDayNextMonth(day, value)) return "before"
  if (isToday(day)) return "today"
  if (isSelected(selectedDay, day)) return "selected"
  return ""
}

export function currMonth(value: moment.Moment): string {
  return monthNames[+value.format("M") - 1]
}

export function currYear(value: moment.Moment): string {
  return value.format("YYYY")
}

export function prevMonth(value: moment.Moment): moment.Moment {
  return value.clone().subtract(1, "month")
}

export function nextMonth(value: moment.Moment): moment.Moment {
  return value.clone().add(1, "month")
}

export default function buildCalendar(value: moment.Moment) {
  const startDay = value.clone().startOf("month").startOf("week")
  const endDay = value.clone().endOf("month").endOf("week")

  const day = startDay.clone().subtract(1, "day")
  const calendar: any[] = []

  while (day.isBefore(endDay, "day") || calendar.length < 42) {
    calendar.push(day.add(1, "day").clone())
  }

  return calendar
}
