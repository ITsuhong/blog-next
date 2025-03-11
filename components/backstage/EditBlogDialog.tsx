'use client'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { createTag } from '@/action/tag'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { TagFormSchema, TagFormSchemaType } from '@/schema/tag'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const ImageList = [
    'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/1.png',
    'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/2.png',
    'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/3.png',
    'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/4.png',
    'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/5.png',
    'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/6.png',
    'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/7.png'
]

export default function EditBlogDialog() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const form = useForm<TagFormSchemaType>({
        resolver: zodResolver(TagFormSchema),
        defaultValues: {
            name: '',
            desc: ''
        }
    })

    // 2. Define a submit handler.
    async function onSubmit(values: TagFormSchemaType) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        const res = await createTag(values)

        router.refresh()
        setOpen(false)
    }

    const handleImageSelect = (imageUrl: string) => {
        form.setValue('image', imageUrl)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <div className="mb-3">
                    <div className="relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-black rounded-[16px] bg-gradient-to-tr from-active to-cyan-400  active:scale-95">
                        <span className="w-full h-full flex items-center gap-2 px-4 py-1 bg-primary text-white rounded-[14px] bg-gradient-to-tr from-primary to-cyan-400 ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                <path d="M8 13V9m-2 2h4m5-2v.001M18 12v.001m4-.334v5.243a3.09 3.09 0 0 1-5.854 1.382L16 18a3.618 3.618 0 0 0-3.236-2h-1.528c-1.37 0-2.623.774-3.236 2l-.146.292A3.09 3.09 0 0 1 2 16.91v-5.243A6.667 6.667 0 0 1 8.667 5h6.666A6.667 6.667 0 0 1 22 11.667Z"></path>
                            </svg>
                            新建分类
                        </span>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>编辑</DialogTitle>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-3">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>分类名称</FormLabel>
                                            <FormControl>
                                                <Input placeholder="请输入名称" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="desc"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>描述</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="请输入" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>背景图片</FormLabel>
                                            <div className="grid grid-cols-3 gap-2">
                                                {ImageList.map((imageUrl, index) => (
                                                    <div key={index} className={`h-20 overflow-hidden cursor-pointer border-4 rounded-lg p-1 relative ${field.value === imageUrl ? 'border-blue' : ''}`} onClick={() => handleImageSelect(imageUrl)}>
                                                        {/*<img src={imageUrl} alt={`Image ${index + 1}`}*/}
                                                        {/*     className="w-full h-auto"/>*/}
                                                        <Image src={imageUrl} alt="" layout="fill" />
                                                    </div>
                                                ))}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button variant="default" type="submit">
                                    提交
                                </Button>
                            </form>
                        </Form>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
