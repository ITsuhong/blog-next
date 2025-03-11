import { Dayjs } from 'dayjs'
interface HeaderProps {
    curMonth: Dayjs
    prevMonthHandler: () => void
    nextMonthHandler: () => void
    todayHandler: () => void
}
function Header(props: HeaderProps) {
    const { curMonth, prevMonthHandler, nextMonthHandler, todayHandler } = props
    return (
        <div className="flex items-center">
            <div className="cursor-pointer w-8" onClick={prevMonthHandler}>
                &lt;
            </div>
            <div className="">{curMonth.format('YYYY 年 MM 月')}</div>
            <div className="cursor-pointer w-8 ml-4" onClick={nextMonthHandler}>
                &gt;
            </div>
            <button className="cursor-pointer" onClick={todayHandler}>
                今天
            </button>
        </div>
    )
}

export default Header
