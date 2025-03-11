'use client'

import './styles.css'
import { useState, useLayoutEffect } from 'react'
import { useTheme } from 'next-themes'

export default function ModeSwitch() {
    const { theme, setTheme } = useTheme()
    const [isCheck, setChecked] = useState(true)
    console.log(theme, isCheck, '11')

    // setTheme('dark')
    const onChange = (e: any) => {
        console.log('改变')

        if (e.target.checked) {
            setTheme('light')
            setChecked(true)
        } else {
            setTheme('dark')
            setChecked(false)
        }
    }
    useLayoutEffect(() => {
        console.log(theme)
        setChecked(theme == 'light')
        setTheme(theme || 'light')
    }, [])
    return (
        <div className="wrapper">
            <input type="checkbox" checked={isCheck} onChange={onChange} name="checkbox" className="switch"></input>
        </div>
    )
}
