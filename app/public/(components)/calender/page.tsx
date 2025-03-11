'use client'
import Calendar from '@/components/Calender/Calendar'
import dayjs from 'dayjs'
const Page = () => {
    return (
        <div>
            <Calendar value={dayjs()} />
        </div>
    )
}
export default Page
