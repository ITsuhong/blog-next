"use client"

import TodoList from "@/components/Todolist/index"
export default function Page() {
    return (
        <div className="ml-6">
            <TodoList className="w-5/6 h-[700px] bg-background"/>
        </div>
    )
}