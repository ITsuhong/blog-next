"use client"

import {ArrowLeftToLine, ArrowRightToLine, ExternalLink, Heart, Play} from "lucide-react"
import {useState, useCallback, useRef, useEffect} from "react"
import {cn} from "@/lib/utils"

interface MusicPlayerProps {
    className?: string
}

const imgList = [
    'https://rick-chou.github.io/one-piece-react/assets/cover2-78da3449.jpg',
    'https://rick-chou.github.io/one-piece-react/assets/cover3-0ac6e6ac.jpg',
    'https://rick-chou.github.io/one-piece-react/assets/cover1-1e022e34.jpg'
]

export default function Music({className}: MusicPlayerProps) {
    const [current, setCurrent] = useState(0)
    const [before, setBefore] = useState(-1)
    const [isNext, setIsNext] = useState(true)
    const [audioContext] = useState(() => new (window.AudioContext || (window as any).webkitAudioContext)())
    const [source, setSource] = useState<AudioBufferSourceNode | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const progressRef = useRef<HTMLDivElement>(null)
    const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null)
    const [currentTime, setCurrentTime] = useState(0)
    const startTimeRef = useRef<number>(0)
    const animationFrameRef = useRef<number>()

    const changeNext = useCallback(() => {
        setIsNext(true)
        setBefore(current)
        setCurrent((prev) => (prev + 1) % imgList.length)
    }, [current])

    const changeBack = useCallback(() => {
        setIsNext(false)
        setBefore(current)
        setCurrent((prev) => (prev - 1 + imgList.length) % imgList.length)
    }, [current])

    const loadAudio = useCallback(async () => {
        try {
            const response = await fetch('https://img-saas-su.oss-cn-beijing.aliyuncs.com/zjl.mp3')
            const arrayBuffer = await response.arrayBuffer()
            const buffer = await audioContext.decodeAudioData(arrayBuffer)
            setAudioBuffer(buffer)
            return buffer
        } catch (error) {
            console.error('Error loading audio:', error)
            return null
        }
    }, [audioContext])

    const updateProgress = useCallback(() => {
        if (source && audioContext && duration && isPlaying) {
            const currentPlayTime = currentTime + (audioContext.currentTime - startTimeRef.current)

            if (currentPlayTime >= duration) {
                setIsPlaying(false)
                setSource(null)
                setProgress(100)
                setCurrentTime(duration)
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current)
                }
                return
            }

            setCurrentTime(currentPlayTime)
            setProgress((currentPlayTime / duration) * 100)
            animationFrameRef.current = requestAnimationFrame(updateProgress)
        }
    }, [source, audioContext, duration, isPlaying, currentTime])

    useEffect(() => {
        if (audioBuffer && !duration) {
            setDuration(audioBuffer.duration)
        }
    }, [audioBuffer, duration])

    const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!progressRef.current || !audioBuffer) return

        const rect = progressRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const percentage = (x / rect.width) * 100
        const newTime = (percentage / 100) * audioBuffer.duration

        if (source) {
            source.stop()
            setSource(null)
        }

        setCurrentTime(newTime)
        setProgress(percentage)

        if (isPlaying) {
            const newSource = audioContext.createBufferSource()
            newSource.buffer = audioBuffer
            newSource.connect(audioContext.destination)

            startTimeRef.current = audioContext.currentTime
            newSource.start(0, newTime)

            setSource(newSource)
            animationFrameRef.current = requestAnimationFrame(updateProgress)
        }
    }, [source, audioContext, audioBuffer, isPlaying, updateProgress])

    const playMusic = useCallback(async () => {
        try {
            if (source) {
                source.stop()
                setSource(null)
                setIsPlaying(false)
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current)
                }
                return
            }

            let buffer = audioBuffer
            if (!buffer) {
                buffer = await loadAudio()
                if (!buffer) return
            }

            if (!duration) {
                setDuration(buffer.duration)
            }

            const newSource = audioContext.createBufferSource()
            newSource.buffer = buffer
            newSource.connect(audioContext.destination)

            startTimeRef.current = audioContext.currentTime
            newSource.start(0, currentTime)

            setSource(newSource)
            setIsPlaying(true)
            animationFrameRef.current = requestAnimationFrame(updateProgress)
        } catch (error) {
            console.error('Error playing audio:', error)
        }
    }, [audioContext, loadAudio, source, updateProgress, audioBuffer, currentTime, duration])

    useEffect(() => {
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
            if (source) {
                source.stop()
            }
        }
    }, [source])

    return (
        <div className={cn("w-80 bg-music-background rounded-2xl p-6 relative", className)}>
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
                        onClick={() => playMusic()}
                        style={{filter: 'drop-shadow(0 11px 6px rgba(172, 184, 204, .45))'}}
                        className="mt-3 cursor-pointer w-16 h-16 border-8 border-[white] shadow-light rounded-full flex justify-center items-center">
                        {
                            isPlaying ? <span className="w-[22px] h-[22px] rounded-md bg-white"></span> :
                                <Play fill="white" strokeWidth={3} size={28} color="white"/>
                        }
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-6">

            </div>
            {
                imgList.map((item, index) => {
                    return (
                        <div className={
                            cn('absolute top-6 -left-10 scale-0 transition-transform duration-300 ease-in-out', {
                                'scale-100 opacity-1': current == index,
                                'animate-[next_1s_ease-in-out]': before == index && isNext,
                                'animate-[back_1s_ease-in-out]': before == index && !isNext,

                            })
                        } key={index}>
                            <img src={item} className="w-[250px] h-[250px] rounded-xl blur-xl absolute  top-0"/>
                            <img src={item} className="w-[250px] h-[250px] rounded-xl relative z-10"/>
                        </div>
                    )
                })
            }

            <div className="-mt-12 text-[#71829e]">
                <div className=" font-black  text-2xl">告五人</div>
                <div className="font-black  text-xl mt-3 opacity-70">爱在夏天</div>
                <div className="flex justify-end">
                    <div className="font-black text-xl opacity-70">06:24</div>
                </div>
                <div className="mt-3 opacity-70 relative rounded-md overflow-hidden cursor-pointer"
                     ref={progressRef}
                     onClick={handleProgressClick}>
                    <div className="flex items-center">
                        {Array(100).fill(0).map((_, index) => (
                            <div key={index}
                                 className="w-[1%] h-[6px] bg-[#d0d8e6]">
                            </div>
                        ))}
                    </div>
                    <div className={cn('absolute h-[6px] bg-[#a3b3ce] left-0 top-0 rounded-md')}
                         style={{width: `${progress}%`}}>
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