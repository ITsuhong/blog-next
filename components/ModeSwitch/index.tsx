"use client"

import './styles.css'
import {useState, useEffect} from 'react'
import {useTheme} from 'next-themes'


export default function ModeSwitch() {
    const {theme, setTheme} = useTheme()
    // setTheme('dark')
    const onChange = (e: any) => {
        if (e.target.checked) {
            setTheme('light')
        } else {
            setTheme('dark')
        }

    }
    useEffect(() => {
        setTheme('dark')
    }, []);
    return (
        <div className="wrapper">

            <input type="checkbox" onChange={onChange} name="checkbox" className="switch"></input>
        </div>
    )
}