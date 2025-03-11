// 'use client'

import './index.scss'
import MonthCalendar from './MonthCalendar'
import { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import Header from './Header'
import { CSSProperties, ReactNode, useState } from 'react'
export interface CalendarProps {
    value: Dayjs
    style?: CSSProperties
    className?: string | string[]
    // 定制日期显示，会完全覆盖日期单元格
    dateRender?: (currentDate: Dayjs) => ReactNode
    // 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效。
    dateInnerContent?: (currentDate: Dayjs) => ReactNode
    // 国际化相关
    locale?: string
    onChange?: (date: Dayjs) => void
}

const Calendar = (props: CalendarProps) => {
    const { value, style, className, dateRender, dateInnerContent, locale, onChange } = props
    const [curValue, setCurValue] = useState<Dayjs>(value)
    const [curMonth, setCurMonth] = useState<Dayjs>(value)
    function selectHandler(date: Dayjs) {
        setCurValue(date)
        setCurMonth(date)
        onChange?.(date)
    }
    function prevMonthHandler() {
        setCurMonth(curMonth.subtract(1, 'month'))
        //  onChange?.(date)
    }

    function nextMonthHandler() {
        setCurMonth(curMonth.add(1, 'month'))
        // onChange?.(date)
    }
    function todayHandler() {
        const date = dayjs(Date.now())

        setCurValue(date)
        setCurMonth(date)
        onChange?.(date)
    }
    return (
        <div className="calendar">
            <Header curMonth={curMonth} prevMonthHandler={prevMonthHandler} nextMonthHandler={nextMonthHandler} todayHandler={todayHandler} />
            <MonthCalendar curMonth={curMonth} {...props} value={curValue} selectHandler={selectHandler} />
        </div>
    )
}
export default Calendar
