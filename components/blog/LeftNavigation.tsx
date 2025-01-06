import {getTags} from "@/action/tag";
import Image from "next/image";
import Link from "next/link"

function getRandomLightColor() {
    // 生成范围在 192 到 255 之间的随机数
    const getRandomChannelValue = () => Math.floor(Math.random() * (256 - 192) + 192);

    const r = getRandomChannelValue();
    const g = getRandomChannelValue();
    const b = getRandomChannelValue();

    return `rgb(${r}, ${g}, ${b})`;
}

export default async function LeftNavigation() {
    const list = await getTags()


    console.log(list)
    return (
        <div className="w-[300px] ">
            <div className="font-mono font-[900] text-2xl mb-5">
                @ROCK.SUHONG
            </div>
            <div className="border-b-2">
                <div className="font-bold text-primary-second mb-4">BLOG</div>
                {
                    list.map((tag, index) => {
                        return (
                            <Link href={'/public/blog/' + tag.id} className="flex mb-6 items-center cursor-pointer"
                                  key={tag.id}>
                                <div className="p-[2px]  rounded-md" style={{backgroundColor: getRandomLightColor()}}>
                                    <Image className="rounded-md object-fill" alt="" src={tag.bg_img}
                                           width={40}
                                           height={40}></Image>
                                </div>
                                <div
                                    className="max-w-full font-[900] u-line-1 ml-2 text-[18px] text-primary-second hover:text-primary-hover">{tag.name}</div>

                            </Link>
                        )
                    })
                }
                {/*<div className="flex">*/}
                {/*    <div>*/}
                {/*        <Image alt="" src={'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/5'} width={20}*/}
                {/*               height={20}></Image>*/}
                {/*    </div>*/}

                {/*</div>*/}
            </div>
        </div>
    )
}