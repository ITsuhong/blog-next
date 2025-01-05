import Image from "next/image";
import {Tag} from "@prisma/client";
import Link from "next/link";

const ImageList = [
    'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/1.png',
    'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/2.png',
    'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/3.png',
    'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/4.png',
    'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/5.png',
    'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/6.png',
    'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/7.png',
]

export default function Card({data}: { data: Tag }) {
    //随机整数1-7
    const num = Math.floor(Math.random() * (6 - 1 + 1)) + 1;

    return (
        <div className="rounded-xl overflow-hidden inline-block bg-[#1b233d] p-3 cursor-pointer">
            <Link href={`/backstage/category/blog/${data.id}`}>
                <Image className="rounded-t-md" width={200} height={1}
                       src={data.bg_img } alt=""></Image>
                <div className="mt-3 text-white font-bold flex justify-center">{data.name}</div>
                <div className="flex justify-center text-[14px] text-gray-400">{data.desc}</div>
                <div
                    className="text-white px-5 py-2 rounded-full bg-[#3c82f6] flex items-center justify-center mt-5 cursor-pointer">编辑
                </div>
            </Link>
        </div>
    )
}