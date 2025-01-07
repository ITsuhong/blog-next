"use client"
import {useRouter, useParams} from "next/navigation"
import {useEffect, useState} from "react";
import {IBlog} from "@/types";
import {getBlogsByTagId} from "@/action/blog";
import {getTagById} from "@/action/tag";
import {Tag} from "@prisma/client";
import Link from "next/link";

export default function Page() {
    const params = useParams();
    const [blogList, setBlogList] = useState<IBlog[]>([])
    const [tag, setTag] = useState<Tag>()
    const id = params?.id as string;
    useEffect(() => {
        if (id) {
            getBlogsByTagId(id).then(res => {
                setBlogList(res)
            })
            getTagById(id).then(res => {
                if (res) {
                    setTag(res)
                }

            })
        }
    }, [])
    return (
        tag?.id && <div className="font-mono font-[900] text-2xl">
            <div className="font-bold text-3xl">BLOG</div>
            <div className="ml-10 mt-6">
                <div className="flex items-center">
                    <div className="w-1 h-1 rounded-full bg-[#ced5e0]"></div>
                    <div className="ml-3">{tag?.name}</div>
                </div>
                <div className="ml-6 mt-3">
                    {
                        blogList.map((item, index) => {
                            return (
                                <Link href={'/public/blog/detail/' + item.id}
                                      className="flex items-center mb-6 cursor-pointer" key={item.id}>
                                    <div className="w-1 h-1 rounded-full bg-[#ced5e0]"></div>
                                    <div
                                        className="ml-3 text-xl underline-offset-2 underline hover:no-underline hover:text-primary-hover">{item.title}
                                    </div>
                                </Link>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}