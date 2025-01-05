import Card from "@/components/Card";
import EditBlogDialog from "@/components/backstage/EditBlogDialog";
import {getTags} from "@/action/tag"

export default async function Page() {
    const list = await getTags()
    console.log("list", list)
    return (
        <div className="p-4">
            <EditBlogDialog/>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
                {
                    list.map(item => {
                        return (
                            <div key={item.id}>
                                <Card data={item}/>
                            </div>
                        )
                    })
                }
            </div>


        </div>
    )
}