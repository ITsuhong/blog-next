"use client"

import {useEffect, useState} from 'react';
import {MdEditor,MdPreview} from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import toast from "react-hot-toast";
import {getBlogById, saveBlog} from "@/action/blog"
import {IBlog} from "@/types"
import {useParams} from "next/navigation";

import {getOSSData, getSuffix, ossHost, randomString} from "@/utils/utils";
import OSS from "ali-oss";
import {aliyunOssUpload} from "@/lib/upload";


export default function Page() {
    const [blogDetail, setBlogDetail] = useState<IBlog>()
    const [text, setText] = useState('');
    const [saveStatus, setSaveStatus] = useState(true)
    const params = useParams();
    const id = params?.id as string
    useEffect(() => {
        if (id) {
            getBlogById(id).then(res => {
                if (!res) return
                setBlogDetail(res)
                setText(res.content || '')
            })
        }
    }, []);
    const onSave = async (v: string, h: any) => {
        const html = await h;
        if (saveStatus) return
        const res = await saveBlog({
            id: id,
            content: v,
            html: html
        })
        if (!res.success) {
            console.log(res)
            return toast.error("保存失败")
        }
        setSaveStatus(true)
        toast.success("保存成功")

    }
    const handleOptionChange = (v: string) => {
        setText(v)
        setSaveStatus(false)
    }
    const onUploadImg = async (files: File[], callback: (urls: string[]) => void) => {
        const toastId = toast.loading("上传中")
        const result = await aliyunOssUpload(files[0], 'blog')
        toast.success("成功", {
            id: toastId,
        })
        callback([result]);

    }
    return (
        <div className="box-border flex flex-col h-full">
            <div className="fixed top-0 z-[999] flex items-end p-1 ml-3 pb-0 bg-white">
                <div className="font-fangyuan font-bold ">{blogDetail?.tag.name}{blogDetail?.title}</div>
                {
                    saveStatus ?
                        <div className="text-[12px] flex items-center mb-1">
                            <div className="text-[#9999] mx-1">已保存</div>
                            <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                        </div>
                        :
                        <div className="text-[12px] flex items-center mb-1">
                            <div className="text-[#9999] mx-1">未保存</div>
                            <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                        </div>
                }
            </div>
            <div className="flex-1 pt-[25px] bg-white">
                <MdEditor className="write" footers={[]} style={{height: "100%", border: 'none'}}
                          onUploadImg={onUploadImg} modelValue={text}
                          onChange={handleOptionChange}
                          onSave={onSave}
                          previewTheme="cyanosis"
                />
            </div>
        </div>
    )
}