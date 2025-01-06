'use client'

import {ThemeProvider} from 'next-themes'
import dynamic from 'next/dynamic'

export function ThemeProviders({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
            {/*<time dateTime="2016-10-25" suppressHydrationWarning/>*/}
        </ThemeProvider>
    )
}