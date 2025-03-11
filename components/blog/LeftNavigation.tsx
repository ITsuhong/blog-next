import { getTags } from '@/action/tag'
import Image from 'next/image'
import Link from 'next/link'

function getRandomLightColor() {
    // 生成范围在 192 到 255 之间的随机数
    const getRandomChannelValue = () => Math.floor(Math.random() * (256 - 192) + 192)

    const r = getRandomChannelValue()
    const g = getRandomChannelValue()
    const b = getRandomChannelValue()

    return `rgb(${r}, ${g}, ${b})`
}

export default async function LeftNavigation() {
    const list = await getTags()
    const componentsList = [
        {
            name: '拖拽TodoList',
            path: '/public/todoList/',
            image: 'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/mine/react.webp'
        },
        {
            name: '代码编辑PlayGround',
            path: '/public/playground/',
            image: 'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/vscode.png'
        },
        {
            name: 'ReactFlow 画流程图',
            path: '/public/flow/',
            image: 'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/reactflow.png'
        },
        {
            name: 'ReactFlow 振荡器调音',
            path: '/public/audio/',
            image: 'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/audioflow.png'
        },
        {
            name: '上传文件',
            path: '/public/upload/',
            image: 'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/upload.png'
        },
        {
            name: 'Form表单',
            path: '/public/form/',
            image: 'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/form.png'
        },
        {
            name: '日历 Calender',
            path: '/public/calender/',
            image: 'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/calener.png'
        },
        {
            name: '高仿 ElementPlus',
            path: '/public/element/',
            image: 'https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/vscode.png'
        }
    ]
    return (
        <div className="w-[300px] ">
            <Link href="/public" className="font-mono font-[900] text-2xl  cursor-pointer hover:text-primary-hover">
                @BLOG.SUHONG
            </Link>
            <div className="border-b-2 border-b-border mt-8">
                <div className="font-bold text-primary-second mb-4">BLOG</div>
                {list.map((tag, index) => {
                    return (
                        <Link href={'/public/blog/' + tag.id} className="flex mb-6 items-center cursor-pointer" key={tag.id}>
                            <div className="p-[2px]  rounded-md" style={{ backgroundColor: getRandomLightColor() }}>
                                <Image className="rounded-md object-fill" alt="" src={tag.bg_img} width={40} height={40}></Image>
                            </div>
                            <div className="max-w-full font-[900] u-line-1 ml-2 text-[18px] text-primary-second hover:text-primary-hover">{tag.name}</div>
                        </Link>
                    )
                })}
            </div>
            <div className="border-b-2 border-b-border mt-8">
                <div className="font-bold text-primary-second mb-4">React组件</div>
                {componentsList.map(item => {
                    return (
                        <Link key={item.name} href={item.path} className="flex mb-6 items-center cursor-pointer">
                            <div>
                                <Image className="rounded-md object-fill" alt="" src={item.image} width={30} height={30}></Image>
                            </div>
                            <div className="max-w-full font-[900] u-line-1 ml-2 text-[18px] text-primary-second hover:text-primary-hover">{item.name}</div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
