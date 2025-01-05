import Sidebar from "@/components/backstage/Sidebar";
import TopNavigation from "@/components/backstage/TopNavigation";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <>
            <div className="bg-[#f5f5f5] h-screen flex flex-col">
                {/*<Sidebar></Sidebar>*/}
                <TopNavigation/>
                <div className="h-full flex-1">
                    {children}
                </div>


            </div>

        </>
    );
}