// components/PageTransition.jsx
"use client"

import React, {useEffect, useState} from 'react';
import styles from './PageTransition.module.css';
import {usePathname, useSearchParams} from 'next/navigation'

export default function PageTransition({
                                           children,
                                       }: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        console.log("变化")
        // 开始动画
        setIsAnimating(true);

        // 设置一个短暂的延迟以确保动画触发
        const timeoutId = setTimeout(() => {
            setIsAnimating(false);
        }, 1000); // 动画持续时间

        return () => clearTimeout(timeoutId);
    }, [pathname, searchParams]);

    return (
        <div className={`${styles.pageContainer} ${isAnimating ? styles.animating : ''}`}>
            {children}
        </div>
    );
}