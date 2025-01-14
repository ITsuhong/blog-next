'use client'

// import Music from "@/components/music";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Music2 } from "lucide-react";
import dynamic from "next/dynamic";
const BrowserOnlyComponent = dynamic(() => import('@/components/music'), {
    ssr: false,
});
export default function MusicContain() {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <>
            {/* 背景装饰 */}
            <motion.div
                className="fixed bottom-24 left-0 z-10 w-[300px] h-[200px]
                          bg-gradient-to-r from-[#71829e]/10 to-transparent
                          blur-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: isExpanded ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />

            {/* 主容器 */}
            <motion.div
                className="fixed bottom-24 left-0 z-20"
                initial={false}
                animate={{ x: isExpanded ? 0 : `calc(-100% + 56px)` }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 40,
                    bounce: 0,
                    mass: 0.8,
                    restDelta: 0.01
                }}
            >
                <div className="relative">
                    {/* 内容区域 */}
                    <div className="bg-gradient-to-r from-[#71829e]/20 to-[#a3b3ce]/20
                                  backdrop-blur-md rounded-r-2xl overflow-hidden
                                  border-y border-r border-white/10 shadow-lg"
                    >
                        <div className="p-4">
                            <BrowserOnlyComponent />
                        </div>
                    </div>

                    {/* 切换按钮 */}
                    <AnimatePresence initial={false}>
                        {isExpanded ? (
                            <motion.button
                                key="expand-btn"
                                className="absolute right-0 top-1/2
                                          bg-gradient-to-r from-[#71829e]/30 to-[#a3b3ce]/30
                                          backdrop-blur-md border border-white/10
                                          p-2 rounded-full shadow-lg
                                          hover:from-[#71829e]/40 hover:to-[#a3b3ce]/40
                                          hover:scale-110
                                          transition-all duration-300"
                                style={{ transform: 'translate(50%, -50%)' }}
                                onClick={() => setIsExpanded(false)}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                            >
                                <ChevronLeft className="w-5 h-5 text-[#a3b3ce]" />
                            </motion.button>
                        ) : (
                            <motion.div
                                key="collapse-btn"
                                className="absolute right-0 top-1/2
                                          bg-gradient-to-r from-[#71829e]/40 to-[#a3b3ce]/40
                                          backdrop-blur-md border border-white/10
                                          h-10 w-[56px] rounded-r-xl shadow-lg
                                          hover:from-[#71829e]/50 hover:to-[#a3b3ce]/50
                                          transition-all duration-300
                                          flex items-center justify-center gap-2"
                                style={{ transform: 'translateY(-50%)' }}
                                onClick={() => setIsExpanded(true)}
                                whileHover={{ x: 3 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                            >
                                <div className="flex items-center gap-2">
                                    <Music2
                                        className="text-[#a3b3ce]"
                                        size={16}
                                        strokeWidth={1.5}
                                    />
                                    <ChevronRight className="w-5 h-5 text-[#a3b3ce]" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </>
    );
}