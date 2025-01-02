"use client"

// import ParticlesBg from 'particles-bg'
import dynamic from "next/dynamic"

const ParticlesBg = dynamic(() => import('particles-bg'), {ssr: false})
export default function LoginBg() {
    return (
        <div className="w-0 h-full z-10">

            <ParticlesBg type="color" bg={true}/>
        </div>
        // <div className="absolute top-0 left-0 w-full h-full bg-cadetblue">
        //     <img
        //         src="/image/wave-1.webp"
        //         alt=""
        //         className="absolute animate-ease-in-out animate-alternate animate-infinite left-[-386px] top-[234px] z-[6] animate-[x1] duration-[2s]"
        //         style={{
        //             animationName: 'x1',
        //         }}
        //     />
        //     <img
        //         src="/image/wave-2.webp"
        //         alt=""
        //         className="absolute animate-ease-in-out animate-alternate animate-infinite left-[-596px] top-[-56px] z-[5] animate-[x2] duration-[2s] delay-[0.5s]"
        //         style={{
        //             animationName: 'x2',
        //         }}
        //     />
        //     <img
        //         src="/image/wave-3.webp"
        //         alt=""
        //         className="absolute animate-ease-in-out animate-alternate animate-infinite left-[-520px] top-[-62px] z-[4] animate-[x3] duration-[2s]"
        //         style={{
        //             animationName: 'x3',
        //         }}
        //     />
        //     <img
        //         src="/image/wave-4.webp"
        //         alt=""
        //         className="absolute left-[-316px] top-[-210px] z-[3]"
        //     />
        //     <img
        //         src="/image/wave-5.webp"
        //         alt=""
        //         className="absolute animate-ease-in-out animate-alternate animate-infinite left-[-676px] top-[-455px] z-[4] animate-[x5] duration-[2s]"
        //         style={{
        //             animationName: 'x5',
        //         }}
        //     />
        //     <img
        //         src="/image/wave-6.webp"
        //         alt=""
        //         className="absolute animate-ease-in-out animate-alternate animate-infinite left-[-677px] top-[-186px] z-[4] animate-[x6] duration-[2s]"
        //         style={{
        //             animationName: 'x6',
        //         }}
        //     />
        // </div>
    )
}