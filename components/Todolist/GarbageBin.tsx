import React, {useRef, useEffect} from "react";
import {useDrop} from "react-dnd"
import {cn} from "@/lib/utils";
import {useTodoListStore, ListItem} from "./Store"

const GarbageBin: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null)
    const deleteList = useTodoListStore(state => state.deleteItem)
    const [{isOver}, drop] = useDrop(() => {
        return {
            accept: 'item',
            drop(item: ListItem) {
                console.log(item)
                deleteList(item.id)
            },
            collect(monitor) {
                return {
                    isOver: monitor.isOver()
                }
            }
        }
    })
    useEffect(() => {
        drop(ref)
    }, []);
    return (
        <div ref={ref}
             className={
                 cn('w-full h-52 border-2 mt-4 flex items-center justify-center font-bold bg-warning', {
                     'bg-red border-dashed': isOver
                 })
             }>垃圾箱</div>
    )
}
export default GarbageBin;