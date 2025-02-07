import Card from "@/components/Card";
import EditBlogDialog from "@/components/backstage/EditBlogDialog";
import { getTags } from "@/action/tag";

export default function Page({ list }) {
    return (
        <div className="p-4">
            <EditBlogDialog />
            <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
                {list.map(item => (
                    <div key={item.id}>
                        <Card data={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const list = await getTags();
    return {
        props: { list },
    };
}