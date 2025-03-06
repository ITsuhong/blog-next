import {FC, useRef, useEffect} from "react";
import {useDrag} from "react-dnd";
import {cn} from "@/lib/utils";

const NewItem: FC = () => {
    const ref = useRef<HTMLDivElement>(null)
    const [{dragging}, drag] = useDrag({
        type: "item",
        item: {},
        collect(monitor) {
            return {
                dragging: monitor.isDragging()
            }
        }
    })
    useEffect(() => {
        drag(ref)
    }, [])
    return (
        <div ref={ref}
             className={cn('w-full h-24 border-2 flex items-center justify-center bg-green font-bold ', {
                 'bg-white border-dashed': dragging
             })}>
            新的待办事项
        </div>
    )
}
export default NewItem