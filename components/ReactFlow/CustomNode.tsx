import React, { memo } from 'react'
import { Handle, Position } from '@xyflow/react'

function CustomNode(props) {
    const { data, id } = props
    // console.log(props)

    return (
        <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
            <div className="flex">
                <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">{data.emoji}</div>
                <div className="ml-2">
                    <div className="text-lg font-bold text-gray-500">{data.id}</div>
                    <div className="text-lg font-bold text-gray-500">{data.name}</div>
                    <div className="text-gray-500">{data.job}</div>
                </div>
            </div>

            <Handle type="target" id="top-target" position={Position.Top} className="w-36 !bg-teal-500"></Handle>
            <Handle type="source" id="top-source" position={Position.Top} className="w-36 !bg-teal-500" />

            <Handle type="target" id="bottom-target" position={Position.Bottom} className="w-16 !bg-teal-500" />
            <Handle type="source" id="bottom-source" position={Position.Bottom} className="w-16 !bg-teal-500" />

            <Handle type="target" id="left-target" position={Position.Left} className="w-16 !bg-teal-500" />
            <Handle type="source" id="left-source" position={Position.Left} className="w-16 !bg-teal-500" />

            <Handle type="target" id="right-target" position={Position.Right} className="w-16 !bg-teal-500" />
            <Handle type="source" id="right-source" position={Position.Right} className="w-16 !bg-teal-500" />
        </div>
    )
}

export default memo(CustomNode)
