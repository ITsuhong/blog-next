"use client"
import {getBlogById, saveBlog} from "@/action/blog"
import {IBlog} from "@/types"
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {MdPreview} from "md-editor-rt";
import 'md-editor-rt/lib/style.css';
import {useTheme} from 'next-themes'

export default function Page() {
    const [blogDetail, setBlogDetail] = useState<IBlog>()
    const [text, setText] = useState('');
    const params = useParams();
    const id = params?.id as string
    const {theme, setTheme} = useTheme()
    useEffect(() => {
        if (id) {
            getBlogById(id).then(res => {
                if (!res) return
                setBlogDetail(res)
                console.log(res)
                setText(res.content || '')
            })
        }
    }, []);
    return (
        blogDetail?.id && <MdPreview className="write" style={{
            height: "100%",
            width: "100%",
            border: 'none',
            backgroundColor: "transparent",
        }}
                                     modelValue={text}
                                     theme={theme ? theme as any : 'dark'}
                                     previewTheme="mk-cute"
                                     codeTheme={'atom'}
        />
    )
}