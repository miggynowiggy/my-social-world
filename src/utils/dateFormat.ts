import dayjs from 'dayjs'
import advanceFormat from 'dayjs/plugin/advancedFormat'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(advanceFormat)
dayjs.extend(timezone)
dayjs.extend(relativeTime)

export function formatDate(date: string | Date | number, format: string) {
  return dayjs(date).format(format)
}

export function formatDateToRelative(date: string | Date | number) {
  return dayjs(date).fromNow()
}

export function formatForDB(date: string | Date | number) {
  return dayjs(date).toISOString()
}