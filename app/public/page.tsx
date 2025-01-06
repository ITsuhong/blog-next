import Image from "next/image";
import Music from "@/components/music";

const imgList1 =
    ["https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/mine/min.png",
        'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/mine/mine_2.png',
        'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/mine/mine_3.png']
const imgList2 =
    ["https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/mine/vue.webp",
        'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/mine/react.webp',
        'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/mine/python.webp',
        'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/mine/github.webp',
        'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/mine/vscode.webp',
    ]
export default function Page() {
    return (
        <div>

            <div className="flex items-center justify-center font-bold text-3xl">SU.HONG BLOG</div>
            <div className="flex items-center justify-center mt-20">
                {
                    imgList1.map((item, index) => {
                        return <Image key={index} src={item} width={70} height={70} alt={""}/>
                    })
                }
            </div>
            <div className="flex items-center justify-center mt-12 font-black">
                Nothing is difficult in the world as long as you are willing to give up
            </div>
            <div className="flex items-center justify-center font-black mt-3">
                -Socrates.
            </div>

            <div className="flex items-center justify-center mt-20">
                {
                    imgList2.map((item, index) => {
                        return <Image key={index} src={item} width={100} height={100} alt={""}/>
                    })
                }
            </div>

        </div>
    )
}