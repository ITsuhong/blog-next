import Image from "next/image";
import {Button} from "@/components/ui/button";
import EditMusicDialog from "@/components/backstage/EditMusicDialog";


export default function Page() {
    return (
        <div className="text-black p-6">
            <EditMusicDialog/>
            <div className="grid grid-cols-5 gap-4 mt-4">
                <div className="bg-white relative rounded-md overflow-hidden pb-3">
                    <img src="https://rick-chou.github.io/one-piece-react/assets/cover2-78da3449.jpg"/>
                    <div className="flex justify-center font-black text-xl my-3">周杰伦</div>
                    <div className="flex justify-center text-xl">以父之名</div>
                </div>
            </div>
        </div>
    )
}