"use client"

import {useEffect, useState} from 'react';
import {MdEditor} from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import toast from "react-hot-toast";
import {getBlogById, saveBlog} from "@/action/blog"
import {IBlog} from "@/types"
import {useParams} from "next/navigation";

import {getOSSData, getSuffix, ossHost, randomString} from "@/utils/utils";
import OSS from "ali-oss";


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
                setText(res.content)
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
        console.log("files", files)
        const dataForm = await getOSSData()
        const fileName = `blog/${randomString(10)}${getSuffix(files?.[0]?.name)}`;
        console.log(dataForm)
        // const client = new OSS({
        //     // 将<YOUR_BUCKET>设置为OSS Bucket名称。
        //     bucket: "<YOUR_BUCKET>",
        //     // 将<YOUR_REGION>设置为OSS Bucket所在地域，例如region: 'oss-cn-hangzhou'。
        //     region: "oss-<YOUR_REGION>",
        //     accessKeyId: dataForm.AccessKeyId,
        //     accessKeySecret: dataForm.AccessKeySecret,
        //     stsToken: dataForm.SecurityToken,
        // });

        const fileInput = document.querySelector("#file");
        // const file = fileInput.files[0];
        // const result = await client.put(file.name, file);
        // console.log(result);
        const formData = new FormData();
        formData.append('key', fileName);
        formData.append('policy', dataForm.policy);
        formData.append('signature', dataForm.signature);
        formData.append('OSSAccessKeyId', dataForm.OSSAccessKeyId)
        formData.append('x-oss-security-token', dataForm['x-oss-security-token'])
        formData.append('success_action_status', '200');
        formData.append('file', files[0]);
        formData.forEach((value, key) => {
            console.log("key %s: value %s", key, value);
        })
        const resp = await fetch(ossHost, {
            method: "POST",
            body: formData //自动修改请求头,formdata的默认请求头的格式是 multipart/form-data
        })
        // const result = await resp.json()
        // console.log(result,'结果')
        callback(['https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/bg.jpg']);

    }
    return (
        <div className="p-3 h-full box-border">
            <div className="mb-3 flex items-end">
                <div className="font-fangyuan font-bold text-xl">{blogDetail?.tag.name}{blogDetail?.title}</div>
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
            <MdEditor onUploadImg={onUploadImg} style={{height: "90%"}} modelValue={text} onChange={handleOptionChange}
                      onSave={onSave}/>
        </div>
    )
}