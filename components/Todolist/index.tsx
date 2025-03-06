import List from "./List";
import GarbageBin from "./GarbageBin";
import NewItem from "./NewItem";
import {cn} from "@/lib/utils";



interface TodoListProps {
    className?: string
}

const TodoList: React.FC<TodoListProps> = (props) => {
    const cs = cn('border-2 flex justify-center items-center p-3', props.className)
    return (
        <>
            <div className={cs}>
                <List/>
                <div className="flex-1 h-full ml-3">
                    <NewItem/>
                    <GarbageBin/>

                </div>
            </div>

        </>
    )
}
export default TodoList