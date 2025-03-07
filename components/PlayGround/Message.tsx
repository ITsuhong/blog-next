import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
export interface MessageProps {
    type: 'error' | 'warn'
    content: string
}

const Message: React.FC<MessageProps> = props => {
    const { type, content } = props
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        console.log(content)

        setVisible(!!content)
    }, [content])

    return visible ? (
        <div
            className={cn('absolute right-2 bottom-10 left-3 z-10 p-6', {
                'bg-[#fdf6ec] text-[#e6a23c]': type == 'warn',
                'bg-[#fef0f0] text-[#f56c6c]': type == 'error'
            })}>
            <div
                className={cn('absolute cursor-pointer right-6 -top-2 text-[24px]', {
                    ' text-[#e6a23c]': type == 'warn',
                    ' text-[#f56c6c]': type == 'error'
                })}
                onClick={() => setVisible(false)}>
                ✕
            </div>
            <div className="w-full overflow-auto">{content}</div>
        </div>
    ) : null
}
export default Message
