import { cn } from '@/lib/utils'
import { CalendarProps } from './Calendar'
import { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
interface MonthCalendarProps extends CalendarProps {
    selectHandler: (date: Dayjs) => void
    value: Dayjs
    curMonth: Dayjs
}

function getAllDays(date: Dayjs) {
    const startDate = date.startOf('month')
    const day = startDate.day()
    console.log(day)
    const daysInfo = new Array(6 * 7)

    for (let i = 0; i < day; i++) {
        daysInfo[i] = {
            date: startDate.subtract(day - i, 'day').format('YYYY-MM-DD'),
            currentMonth: false
        }
    }

    for (let i = day; i < daysInfo.length; i++) {
        const calcDate = startDate.add(i - day, 'day')
        daysInfo[i] = {
            date: startDate.add(i - day, 'day').format('YYYY-MM-DD'),
            currentMonth: calcDate.month() === date.month()
        }
    }
    console.log(daysInfo)

    return daysInfo
}

function renderDays(days: Array<{ date: Dayjs; currentMonth: boolean }>, dateRender: MonthCalendarProps['dateRender'], dateInnerContent: MonthCalendarProps['dateInnerContent'], value: MonthCalendarProps['value'], selectHandler: MonthCalendarProps['selectHandler']) {
    const rows = []
    for (let i = 0; i < 6; i++) {
        const row = []
        for (let j = 0; j < 7; j++) {
            const item = days[i * 7 + j]
            row[j] = (
                <div
                    onClick={() => selectHandler(dayjs(item.date))}
                    className={cn('flex-1 border-[1px] border-[#eee] p-3', {
                        'text-[#999]': !item.currentMonth
                    })}>
                    {dateRender ? (
                        dateRender(item.date)
                    ) : (
                        <div
                            className={cn('cursor-pointer', {
                                'bg-blue w-8 h-8 rounded-full flex items-center justify-center': value.format('YYYY-MM-DD') == dayjs(item.date).format('YYYY-MM-DD')
                            })}>
                            {dayjs(item.date).date()}
                        </div>
                    )}
                </div>
            )
        }
        rows.push(row)
    }
    return rows.map((row, index) => (
        <div key={index} className="calendar-month-body-row">
            {row}
        </div>
    ))
}

function MonthCalendar(props: MonthCalendarProps) {
    const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    const allDays = getAllDays(props.curMonth)
    const { dateRender, dateInnerContent } = props
    return (
        <div className="calendar-month">
            <div className="calendar-month-week-list">
                {weekList.map(week => (
                    <div className="calendar-month-week-list-item" key={week}>
                        {week}
                    </div>
                ))}
            </div>
            <div className="calendar-month-body">{renderDays(allDays, dateRender, dateInnerContent, props.value, props.selectHandler)}</div>
        </div>
    )
}

export default MonthCalendar
