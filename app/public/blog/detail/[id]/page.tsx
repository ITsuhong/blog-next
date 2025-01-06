"use client"
import {getBlogById, saveBlog} from "@/action/blog"
import {IBlog} from "@/types"
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {MdPreview} from "md-editor-rt";
import 'md-editor-rt/lib/style.css';

export default function Page() {
    const [blogDetail, setBlogDetail] = useState<IBlog>()
    const [text, setText] = useState('');
    const params = useParams();
    const id = params?.id as string
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
        <MdPreview className="write" style={{height: "100%", width: "100%", border: 'none'}}
                   modelValue={text}
                   theme="dark"
                   previewTheme="mk-cute"
        />
    )
}