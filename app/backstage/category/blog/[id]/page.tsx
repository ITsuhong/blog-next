"use client"

import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import Image from "next/image";
import {useRouter, useParams} from "next/navigation"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {blogFormSchema, BlogFormSchemaType} from "@/schema/blog";
import {createBlog, getBlogsByTagId, updateBlog, deleteBlog} from "@/action/blog"
import {getTagById} from "@/action/tag"
import {useEffect, useState} from "react";
import {IBlog} from "@/types";
import {Tag} from "@prisma/client";
import toast from "react-hot-toast";


export default function Page() {

    const router = useRouter()
    const params = useParams();
    const [blogList, setBlogList] = useState<IBlog[]>([])
    const id = params?.id as string;
    const [tag, setTag] = useState<Tag>()
    const [showDialog, setShowDialog] = useState(false)
    const [updateId, setUpdateId] = useState<string>('')
    useEffect(() => {
        if (id) {
            getBlogsByTagId(id).then(res => {
                console.log(res, 'll')
                setBlogList(res)
            })
            getTagById(id).then(res => {
                if (res) {
                    setTag(res)
                }

            })
        }
    }, [])
    // 获取 id 参数
    const form = useForm<BlogFormSchemaType>({
        resolver: zodResolver(blogFormSchema),
        defaultValues: {
            name: "",
        },
    })

    const handleWrite = (id: string) => {
        router.push(`/backstage/write/${id}`)
    }

    // 2. Define a submit handler.
    async function onSubmit(values: BlogFormSchemaType) {

        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const toastId = toast.loading('Loading...');
        if (updateId) {
            const result = await updateBlog({
                ...values,
                id: updateId,
            })
            if (result.success) {
                toast.success('更新成功', {
                    id: toastId,
                })

                getBlogsByTagId(id).then(res => {
                    setBlogList(res)
                })
                setShowDialog(false)
            } else {
                toast.error('更新失败', {
                    id: toastId,
                })
            }

        } else {
            const result = await createBlog({
                tagId: id as string,
                ...values
            })
            if (result.success) {
                toast.success('创建成功', {
                    id: toastId,
                })

                router.push(`/backstage/write/${result?.data?.id}`)
            } else {
                toast.error('创建失败', {
                    id: toastId,
                })
            }
        }


    }

    const handleOptionUpdate = (item: IBlog) => {
        setUpdateId(item.id)
        setShowDialog(true)
        form.setValue('name', item.title)
    }
    const handleOptionDelete = (item: IBlog) => {
        const toastId = toast.loading('Loading...');
        deleteBlog(item.id).then(res => {
            if (res.success) {
                toast.success('删除成功', {
                    id: toastId,
                })
                getBlogsByTagId(id).then(res => {
                    setBlogList(res)
                })
            } else {
                toast.error('删除失败', {
                    id: toastId,
                })
            }
        })
    }
    return (
        <div className="relative h-full">

            <div className="p-3 flex justify-center z-20 relative">
                <div className='w-2/3'>
                    <Dialog open={showDialog} onOpenChange={(value) => {
                        if (!value) {
                            setUpdateId('')
                            form.reset()
                        }
                        setShowDialog(value)
                    }}>
                        <DialogTrigger asChild>
                            <Button>添加博客</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>{updateId ? '编辑博客' : '添加博客'}</DialogTitle>
                            <div>
                                <Form {...form} >
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-3">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>博客名称</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="请输入名称" {...field} />
                                                    </FormControl>

                                                    <FormMessage/>
                                                </FormItem>


                                            )}
                                        />


                                        <Button variant="default" type="submit">提交</Button>
                                    </form>
                                </Form>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <div className="w-full bg-[#e0e5ec] rounded-xl mt-3 p-3">
                        <div className="flex items-center ">
                            <div className="w-2 h-2 rounded-full bg-[#ced5e0]"></div>
                            <div className="ml-2 text-[#3b4657]  text-2xl  font-black">{tag?.name}</div>
                        </div>
                        {
                            blogList.map((item, index) => {
                                return (
                                    <div key={index}
                                         className="flex items-center mt-3 cursor-pointer">
                                        <div className="w-2 h-2 rounded-full bg-[#ced5e0]"></div>
                                        <div className="flex items-center">
                                            <div
                                                onClick={() => handleWrite(item.id)}
                                                className="ml-2 text-[#3b4657] font-bold font-fangyuan text-xl underline-offset-2 underline hover:no-underline hover:text-[#7db1f8]">{tag?.name + ' ' + item.title}</div>
                                            <div className="flex ml-3 mb-2">
                                                <Button onClick={() => handleOptionUpdate(item)} size='sm'
                                                        variant="secondary">编辑</Button>
                                                <Button onClick={() => handleOptionDelete(item)} size='sm'
                                                        className="ml-3">删除</Button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>

            </div>
            <Image src="https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/bg.jpg" alt="" fill></Image>
        </div>
    )
}