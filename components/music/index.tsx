import {Heart, ExternalLink, ArrowLeftToLine, ArrowRightToLine} from "lucide-react"

export default function Music() {
    return (
        <div
            className=" w-60 h-80 bg-music-background rounded-2xl  p-6"
        >
            <div className="flex flex-col justify-end items-end ">
                <div className="mb-6 relative z-10">
                    <div className="w-14 h-14 flex items-center justify-center group">
                        <Heart fill="red" color="red" fontWeight={800}/>
                        <div
                            className="transition-transform duration-300 ease-in-out absolute -z-10 w-14 h-14 bg-white rounded-full  left-0 right-0 bottom-0 top-0 m-auto group-hover:scale-100 scale-0 "></div>
                    </div>
                </div>
                <div className="mb-6">
                    <ExternalLink fontWeight={800} color="#c7c7c7"/>
                </div>
                <div className="mb-6">
                    <ArrowLeftToLine color="#c7c7c7" fontWeight={800}/>
                </div>
                <div className="mb-6">
                    <ArrowRightToLine color="#c7c7c7" fontWeight={800}/>
                </div>
            </div>
        </div>
    )
}