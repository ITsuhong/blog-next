import { FC, useState, DragEvent, PropsWithChildren } from 'react'
import classNames from 'classnames'
import { cn } from '@/lib/utils'

interface DraggerProps extends PropsWithChildren {
    onFile: (files: FileList) => void
}

export const Dragger: FC<DraggerProps> = props => {
    const { onFile, children } = props

    const [dragOver, setDragOver] = useState(false)

    const cs = classNames('upload-dragger', {
        'is-dragover': dragOver
    })

    const handleDrop = (e: DragEvent<HTMLElement>) => {
        e.preventDefault()
        setDragOver(false)
        onFile(e.dataTransfer.files)
    }

    const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault()
        setDragOver(over)
    }

    return (
        <div
            className={cn('cursor-pointer w-1/2 h-52 bg-[#fafafa] border-2 border-[#d9d9d9] border-dashed rounded-md hover:border-[#1a6ef7]', {
                'border-[#1a6ef7]': dragOver
            })}
            onDragOver={e => {
                handleDrag(e, true)
            }}
            onDragLeave={e => {
                handleDrag(e, false)
            }}
            onDrop={handleDrop}>
            {children}
        </div>
    )
}

export default Dragger
