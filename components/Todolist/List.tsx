import {useDrag, useDrop} from "react-dnd";
import {useEffect, useRef, useState} from "react";
import {cn} from "@/lib/utils";
import {useTodoListStore, ListItem} from "./Store"
import {v4 as uuidv4} from 'uuid';
import {Input} from "@/components/ui/input"

function Item(prop: ListItem) {
    const ref = useRef<HTMLDivElement>(null);
    const dropRef = useRef<HTMLDivElement>(null);
    const {id, content, status} = prop
    const addItem = useTodoListStore(state => state.addItem)
    const [edit, setEdit] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>(content)
    const changeItem = useTodoListStore(state => state.updateItem)
    const sortItem = useTodoListStore(state => state.sortItem)
    const [{dragging}, drag] = useDrag({
        type: "item",
        item: prop,
        collect(monitor) {
            return {
                dragging: monitor.isDragging()
            }
        }
    })
    const [{isOver}, drop] = useDrop({
        accept: "item",
        drop(item: ListItem) {
            console.log(prop)
            if (item?.id) {
                console.log('有id', item)
                sortItem(prop.id, item.id)
            } else {
                addItem({
                    id: uuidv4(),
                    content: "新的待办，双击编辑",
                    status: 'todo'
                }, prop.id)
            }

        },
        collect(monitor) {
            return {
                isOver: monitor.isOver()
            }
        }
    })
    const handleOptionChange = (e: any) => {
        console.log(e)
        setInputValue(e.target.value)
    }
    useEffect(() => {
        drag(ref)
        drop(dropRef)
    }, [])
    return (
        <>
            <div ref={ref} className={
                cn('flex items-center h-20 bg-blue p-4 rounded-md text-white font-bold ', {
                    'bg-white border-dashed text-black border-2': dragging
                })
            }>
                {
                    !edit && <div onDoubleClick={() => {
                        setEdit(true)
                    }} className="flex items-center  w-full">
                        <Input type="checkbox" className="w-6 h-6 mr-3"/>
                        <p>{content}</p>
                    </div>
                }
                {
                    edit && <div className="flex items-center justify-between w-full">
                        <Input type="checkbox" className="w-6 h-6 mr-3"/>
                        <Input className=" w-full" value={inputValue} onBlur={() => {
                            setEdit(false)
                            changeItem({
                                ...prop,
                                content: inputValue
                            })
                        }} onChange={handleOptionChange}/>

                    </div>
                }

            </div>
            <div ref={dropRef} className={
                cn('w-full h-6  rounded-md bg-background', {
                    'bg-warning': isOver
                })
            }></div>
        </>
    )
}

const List = () => {
    const ref = useRef<HTMLDivElement>(null);
    const addItem = useTodoListStore(state => state.addItem)
    const [{isOver}, drop] = useDrop({
        accept: 'item',
        drop(item) {
            console.log(item)
            addItem({
                id: uuidv4(),
                status: 'todo',
                content: "新的待办，双击编辑"
            })
        },
        collect(monitor) {
            return {
                isOver: monitor.isOver()
            }
        }
    })
    const list = useTodoListStore(state => state.list);
    useEffect(() => {
        drop(ref)
    }, [list]);

    return (
        <>
            {
                list.length > 0 && <div className="w-2/3 h-full border-2 p-3 overflow-auto">
                    {
                        list.map((item) => {
                            return <Item {...item} key={item.id}/>
                        })
                    }
                </div>
            }
            {
                list.length == 0 && <div ref={ref} className={
                    cn('w-2/3  h-full border-2 p-3', {
                        'bg-warning': isOver
                    })
                }>
                    <div className="font-bold text-2xl flex justify-center">暂无待办</div>
                </div>
            }
        </>
    )
}

export default List