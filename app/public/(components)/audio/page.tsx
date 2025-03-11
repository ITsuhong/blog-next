'use client'
import dynamic from 'next/dynamic'
// import AudioFlow from '@/components/AudioFlow'
const AudioFlow = dynamic(() => import('@/components/AudioFlow'), { ssr: false })
const Page = () => {
    return (
        <>
            <AudioFlow />
        </>
    )
}
export default Page
