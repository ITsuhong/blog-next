"use client"
import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Textarea} from "@/components/ui/textarea"
import {createTag} from "@/action/tag"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import Image from "next/image";
import {TagFormSchema, TagFormSchemaType} from "@/schema/tag";
import {useRouter} from "next/navigation"
import {useState} from "react";
import {MusicFormSchemaType} from "@/schema/music";
import {CreateMusic} from "@/action/music";

const ImageList = [
    'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/1.png',
    'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/2.png',
    'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/3.png',
    'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/4.png',
    'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/5.png',
    'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/6.png',
    'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/7.png',
]


export default function EditMusicDialog() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const form = useForm<MusicFormSchemaType>({
        resolver: zodResolver(TagFormSchema),
        defaultValues: {
            name: "",
            singer: "",
            image: "",
            url: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: MusicFormSchemaType) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        const res = await CreateMusic(values)

        router.refresh()
        setOpen(false)

    }

    const handleImageSelect = (imageUrl: string) => {
        form.setValue('image', imageUrl);
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" size="lg">添加</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>编辑</DialogTitle>
                    <div>
                        <Form {...form} >
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-3">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>分类名称</FormLabel>
                                            <FormControl>
                                                <Input placeholder="请输入名称" {...field} />
                                            </FormControl>

                                            <FormMessage/>
                                        </FormItem>


                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="singer"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>描述</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="请输入" {...field} />
                                            </FormControl>

                                            <FormMessage/>
                                        </FormItem>


                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>背景图片</FormLabel>
                                            <div className="grid grid-cols-3 gap-2">
                                                {ImageList.map((imageUrl, index) => (
                                                    <div
                                                        key={index}
                                                        className={`h-20 overflow-hidden cursor-pointer border-4 rounded-lg p-1 relative ${
                                                            field.value === imageUrl ? 'border-blue-500' : ''
                                                        }`}
                                                        onClick={() => handleImageSelect(imageUrl)}
                                                    >
                                                        {/*<img src={imageUrl} alt={`Image ${index + 1}`}*/}
                                                        {/*     className="w-full h-auto"/>*/}
                                                        <Image src={imageUrl} alt="" layout="fill"/>
                                                    </div>
                                                ))}
                                            </div>
                                            <FormMessage/>
                                        </FormItem>


                                    )}
                                />
                                <Button variant="default" type="submit">提交</Button>

                            </form>
                        </Form>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}