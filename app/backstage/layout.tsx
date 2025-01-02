import Sidebar from "@/components/backstage/Sidebar";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <>
            <div className="flex bg-[#f5f5f5]">
                <Sidebar></Sidebar>

                {children}
            </div>

        </>
    );
}