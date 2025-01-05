import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"

export default function TopNavigation() {
    return (
        <div className="w-full h-14 bg-white border-b-1 shadow-sm flex items-center justify-between px-3 box-border">
            <div className="text-2xl font-bold font-fangyuan cursor-pointer">
                BLOG
            </div>
            <div>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png"/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}