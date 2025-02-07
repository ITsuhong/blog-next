import {ThemeProviders} from "@/components/providers";
import {Toaster} from "react-hot-toast";
import Image from "next/image";
import LeftNavigation from "@/components/blog/LeftNavigation";
import TopNavigation from "@/components/blog/TopNavigation";
import PageTransition from "@/components/PageTransition/index";
import Music from "@/components/music";
import MusicContain from "@/components/MusicContain";


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
  

    return (
        <div className="public flex items-center justify-center relative">
            <MusicContain/>
            <div className="w-[80%] h-full bg-background rounded-2xl opacity-[0.98] p-5 font-mono flex">
                <LeftNavigation/>
                <div className="flex-1 flex flex-col w-96">
                    <TopNavigation></TopNavigation>
                    <div className="mt-6 flex-1 max-h-full max-w-full overflow-hidden">

                        <PageTransition>
                            {children}
                        </PageTransition>

                    </div>
                </div>
            </div>

        </div>
    );
}