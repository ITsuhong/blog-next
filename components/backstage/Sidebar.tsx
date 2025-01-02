// components/Sidebar.tsx
"use client"

import {Airplay, Cookie} from "lucide-react";
import {useState} from "react";
import {cn} from "@/lib/utils";

export const SIDEBAR_LIST = [
    {
        name: "分类",
        icon: Airplay,
        path: "/category"
    },
    {
        name: "写博客",
        icon: Cookie,
        path: "/write"
    }
];

const Sidebar = () => {
    const [activePath, setActivePath] = useState("/category");
    const handleChangePath = (path: string) => {
        setActivePath(path)
    }
    return (
        <div className="h-screen w-20 bg-white md:w-48 py-10">
            {
                SIDEBAR_LIST.map((item, index) => {
                    const IconComponent = item.icon; // 获取图标组件
                    return (
                        <div
                            className={
                                cn('flex relative cursor-pointer', {
                                    'bg-activeBg': activePath === item.path
                                })
                            }
                            key={item.name}
                            onClick={() => setActivePath(item.path)}
                        >
                            {
                                activePath === item.path &&
                                <div className="top-0 bottom-0 w-2 bg-active absolute rounded-r-md"></div>
                            }
                            <div className="p-3 flex items-center">
                                <IconComponent size={25} className={
                                    cn('ml-3 text-secondary', {
                                        'text-active': activePath === item.path
                                    })
                                }/>
                                <div className={
                                    cn("ml-3 hidden md:block text-secondary font-bold", {
                                        'text-active': activePath === item.path
                                    })
                                }>{item.name}</div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default Sidebar;