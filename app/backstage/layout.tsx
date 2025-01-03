import Sidebar from "@/components/backstage/Sidebar";
import TopNavigation from "@/components/backstage/TopNavigation";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <>
            <div className="flex bg-[#f5f5f5]">
                <Sidebar></Sidebar>
                <div className="flex-1">
                    <TopNavigation/>
                    {children}
                </div>


            </div>

        </>
    );
}