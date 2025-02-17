"use client"

import {ArrowLeftToLine, ArrowRightToLine, ExternalLink, Heart, Play} from "lucide-react"
import {useState, useCallback, useRef, useEffect} from "react"
import {cn} from "@/lib/utils"


interface MusicPlayerProps {
    className?: string
}




export default function Music({className}: MusicPlayerProps) {
    const musicList = [
        {
            img: 'https://img-saas-su.oss-cn-beijing.aliyuncs.com/musicBg/1.jpg',
            singer: "PG one",
            name: "以父之名",
            url: "https://img-saas-su.oss-cn-beijing.aliyuncs.com/music/yfzm.flac"
        },
        {
            img: 'https://img-saas-su.oss-cn-beijing.aliyuncs.com/musicBg/2.jpg',
            singer: "热狗",
            name: "轻熟女",
            url: "https://img-saas-su.oss-cn-beijing.aliyuncs.com/music/qingshunv.mp3"
        },
        {
            img: 'https://img-saas-su.oss-cn-beijing.aliyuncs.com/musicBg/3.jpg',
            singer: "周杰伦",
            name: "一路向北",
            url: "https://img-saas-su.oss-cn-beijing.aliyuncs.com/music/zjl.mp3"
        },
        {
            img: 'https://img-saas-su.oss-cn-beijing.aliyuncs.com/musicBg/4.jpg',
            singer: "梁博",
            name: "曾经是情侣",
            url: "https://img-saas-su.oss-cn-beijing.aliyuncs.com/music/cjsql.mp3"
        }
    ]
    const current = useRef(0)
    const [before, setBefore] = useState(-1)
    const [isNext, setIsNext] = useState(true)
    const [audioContext] = useState(() => new (window.AudioContext || (window as any).webkitAudioContext)())
    const source = useRef<AudioBufferSourceNode | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)


    const audioBuffer = useRef<AudioBuffer | null>(null)
    const [currentTime, setCurrentTime] = useState(0)
    const currentTimeRef = useRef(0)
    const startTimeRef = useRef<number>(0)
    const animationFrameRef = useRef<number>(0)
    const diffTime = useRef(0)
    const timerRef = useRef<any>(null)
    const [allTime, setAllTime] = useState(0)
    const [progress, setProgress] = useState(0)
    const reset = () => {
        stopMusic()
        source.current = null

        clearCurrentTime()
        setCurrentTime(() => 0)
        audioBuffer.current = null;

        setProgress(0)
    }
    const changeNext = async () => {

        setIsNext(true)
        setBefore(current.current)
        current.current = (current.current + 1) % musicList.length


        reset()
        await loadAudio()
        playMusic(0)

    }


    const changeBack = async () => {
        setIsNext(false)
        setBefore(current.current)
        current.current = (current.current - 1 + musicList.length) % musicList.length
        reset()
        await loadAudio()
        playMusic(0)
    }

    const loadAudio = async () => {
        try {
            const response = await fetch(musicList[current.current].url)
            const arrayBuffer = await response.arrayBuffer()
            const buffer = await audioContext.decodeAudioData(arrayBuffer)
            audioBuffer.current = buffer

            return buffer
        } catch (error) {
            console.error('Error loading audio:', error)
            return null
        }
    }


    const handleProgressClick = async (index: number) => {

        if (audioContext) {
            const bufferTem = audioBuffer.current
            if (!bufferTem) {
                audioBuffer.current = await loadAudio()
            }
            const duration = bufferTem?.duration || 0
            const tem = duration * index / 100
            source.current?.stop()
            clearCurrentTime()
            setCurrentTime(tem)
            await playMusic(tem)
            console.log(tem / allTime)
        }
    }
    const getCurrentTime = () => {
        timerRef.current = setInterval(() => {
            if (currentTimeRef.current >= allTime) {
                clearCurrentTime()
                changeNext()
            }
            setCurrentTime(current => {

                return current + 0.01
            })
            // console.log(currentTime, 'shjian')
        }, 10)
        // animationFrameRef.current = requestAnimationFrame(getCurrentTime)
    }
    const clearCurrentTime = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }
    }
    const playMusic = async (duration ?: number) => {
        console.log("null", currentTime, current, audioBuffer)
        try {
            let buffer = audioBuffer.current
            if (!buffer) {

                buffer = await loadAudio()
                if (!buffer) return
            }
            setAllTime(buffer?.duration || 0)
            const newSource = audioContext.createBufferSource()
            newSource.buffer = buffer
            newSource.connect(audioContext.destination)
            newSource.start(0, duration != undefined ? duration : currentTime)

            if (startTimeRef.current) {
                console.log(audioContext.currentTime, startTimeRef.current)
                diffTime.current = audioContext.currentTime - startTimeRef.current
            }
            source.current = newSource

            setIsPlaying(true)
            getCurrentTime()

        } catch (error) {
            console.error('Error playing audio:', error)
        }
    }

    const stopMusic = () => {

        console.log(source)
        if (source) {

            source.current?.stop()
            // setSource(null)
            setIsPlaying(false)
            clearCurrentTime()
            // source.current?.onended = () => {
            //     clearCurrentTime()
            // }
        }
    }
    const initMucic = useCallback(async () => {
        const buffer = await loadAudio()
        setAllTime(buffer?.duration || 0)
    }, [])
    useEffect(() => {
        initMucic()
        console.log("执行")
    }, [])
    useEffect(() => {
        currentTimeRef.current = currentTime
        // console.log(currentTime / allTime * 100)
        setProgress(() => currentTime / allTime * 100)
    }, [allTime, currentTime])
    return (
        <div className={cn("w-80 bg-music-background bg-opacity-70 rounded-2xl p-6 relative", className)}>
            <div className="flex justify-end">
                <div className="flex flex-col items-center justify-center ">
                    <div className="relative z-10">
                        <div className="w-14 h-14 flex items-center justify-center group cursor-pointer">
                            <Heart fill="red" color="red" strokeWidth={3} size={30}/>
                            <div
                                className="transition-transform duration-300 ease-in-out absolute -z-10 w-14 h-14 bg-white rounded-full  left-0 right-0 bottom-0 top-0 m-auto group-hover:scale-100 scale-0 "></div>
                        </div>
                    </div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 flex items-center justify-center group cursor-pointer">
                            <ExternalLink strokeWidth={3} size={30} color="#c7c7c7"/>
                            <div
                                className="transition-transform duration-300 ease-in-out absolute -z-10 w-14 h-14 bg-white rounded-full  left-0 right-0 bottom-0 top-0 m-auto group-hover:scale-100 scale-0 "></div>
                        </div>
                    </div>
                    <div className="relative z-10 ">
                        <div onClick={() => changeBack()}
                             className="w-14 h-14 flex items-center justify-center group cursor-pointer">
                            <ArrowLeftToLine strokeWidth={3} size={30} color="#c7c7c7"/>
                            <div
                                className="transition-transform duration-300 ease-in-out absolute -z-10 w-14 h-14 bg-white rounded-full  left-0 right-0 bottom-0 top-0 m-auto group-hover:scale-100 scale-0 "></div>
                        </div>
                    </div>
                    <div className="relative z-10">
                        <div onClick={() => changeNext()}
                             className="w-14 h-14 flex items-center justify-center group cursor-pointer">
                            <ArrowRightToLine strokeWidth={3} size={30} color="#c7c7c7"/>
                            <div
                                className="transition-transform duration-300 ease-in-out absolute -z-10 w-14 h-14 bg-white rounded-full  left-0 right-0 bottom-0 top-0 m-auto group-hover:scale-100 scale-0 "></div>
                        </div>
                    </div>
                    <div

                        style={{filter: 'drop-shadow(0 11px 6px rgba(172, 184, 204, .45))'}}
                        className="mt-3 cursor-pointer w-16 h-16 border-8 border-[white] shadow-light rounded-full flex justify-center items-center">
                        {
                            isPlaying ? <span onClick={() => stopMusic()}
                                              className="w-[22px] h-[22px] rounded-md bg-white"></span> :
                                <Play onClick={() => playMusic()} fill="white" strokeWidth={3} size={28} color="white"/>
                        }
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-6">

            </div>
            {
                musicList.map((item, index) => {
                    return (
                        <div className={
                            cn('absolute top-6 -left-10 scale-0 transition-transform duration-300 ease-in-out', {
                                'scale-100 opacity-1': current.current == index,
                                'animate-[next_1s_ease-in-out]': before == index && isNext,
                                'animate-[back_1s_ease-in-out]': before == index && !isNext,

                            })
                        } key={index}>
                            <img src={item.img} className="w-[250px] h-[250px] rounded-xl blur-xl absolute  top-0" alt=""/>
                            <img src={item.img} className="w-[250px] h-[250px] rounded-xl relative z-10" alt=""/>
                        </div>
                    )
                })
            }

            <div className="-mt-12 text-[#71829e]">
                <div className=" font-black  text-2xl">{musicList[current.current].singer}</div>
                <div className="font-black  text-xl mt-3 opacity-70">{musicList[current.current].name}</div>
                <div className="flex justify-end">
                    <div className="font-black text-xl opacity-70">{formatTime(allTime)}</div>
                </div>
                <div className="mt-3 opacity-70 relative rounded-md overflow-hidden cursor-pointer"
                >
                    <div className="flex items-center">
                        {Array(100).fill(0).map((_, index) => (
                            <div key={index}
                                 onClick={() => handleProgressClick(index)}
                                 className="w-[1%] h-[6px] bg-[#d0d8e6]">
                            </div>
                        ))}
                    </div>
                    <div className={cn('absolute flex items-center  left-0 h-0 top-[3px] rounded-md w-full')}
                    >
                        {Array(100).fill(0).map((_, index) => (
                            progress > index && <div key={index}
                                                     onClick={() => handleProgressClick(index)}
                                                     className="w-[1%] h-[6px] bg-[#a3b3ce]">
                            </div>
                        ))}
                    </div>
                </div>
                <div className="font-black mt-3 opacity-70">

                    {formatTime(currentTime)}
                </div>

            </div>

        </div>
    )
}

function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}