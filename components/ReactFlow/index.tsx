import React, { useCallback, useRef } from 'react'
import { Background, ReactFlow, useNodesState, useEdgesState, addEdge, useReactFlow, ReactFlowProvider } from '@xyflow/react'
import CustomNode from './CustomNode'
import '@xyflow/react/dist/style.css'
import './index.css'
const initialNodes = [
    {
        id: '0',
        type: 'custom',
        data: { name: 'Jane Doe', job: 'CEO', emoji: '😎' },
        position: { x: 0, y: 50 }
    }
]

let id = 1
const getId = () => `${id++}`
const nodeTypes = {
    custom: CustomNode
}
const nodeOrigin = [0.5, 0]
const AddNodeOnEdgeDrop = () => {
    const reactFlowWrapper = useRef(null)

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const { screenToFlowPosition } = useReactFlow()
    const onConnect = useCallback(params => setEdges(eds => addEdge(params, eds)), [])

    const onConnectEnd = useCallback(
        (event, connectionState) => {
            console.log(connectionState)

            const { fromPosition, fromNode, fromHandle } = connectionState
            const { id: positionId } = fromHandle
            // when a connection is dropped on the pane it's not valid
            if (!connectionState.isValid) {
                // we need to remove the wrapper bounds, in order to get the correct position
                const id = getId()
                const { clientX, clientY } = 'changedTouches' in event ? event.changedTouches[0] : event
                console.log(positionId)

                if (positionId == 'top-source') {
                    const newNode = {
                        id,
                        type: 'custom',
                        position: screenToFlowPosition({
                            x: clientX,
                            y: clientY - 200
                        }),
                        data: { name: 'Kristi Price', job: 'Developer', emoji: '🤩', id },
                        origin: [0.5, 0.0]
                    }
                    setNodes(nds => nds.concat(newNode))
                    setEdges(eds => eds.concat({ id: id, source: connectionState.fromNode.id, target: id, sourceHandle: 'top-source', targetHandle: 'bottom-target' }))
                }
                if (positionId == 'bottom-source') {
                    console.log('事这里')
                    const newNode = {
                        id,
                        type: 'custom',
                        position: screenToFlowPosition({
                            x: clientX,
                            y: clientY + 70
                        }),
                        data: { name: 'Kristi Price', job: 'Developer', emoji: '🤩', id },
                        origin: [0.5, 0.0]
                    }
                    setNodes(nds => nds.concat(newNode))
                    setEdges(eds => eds.concat({ id: id, source: connectionState.fromNode.id, target: id, sourceHandle: 'bottom-source', targetHandle: 'top-target' }))
                }
                if (positionId == 'left-source') {
                    console.log('事这里')
                    const newNode = {
                        id,
                        type: 'custom',
                        position: screenToFlowPosition({
                            x: clientX - 200,
                            y: clientY
                        }),
                        data: { name: 'Kristi Price', job: 'Developer', emoji: '🤩', id },
                        origin: [0.5, 0.0]
                    }
                    setNodes(nds => nds.concat(newNode))
                    setEdges(eds => eds.concat({ id: id, source: connectionState.fromNode.id, target: id, sourceHandle: 'left-source', targetHandle: 'right-target' }))
                }
                if (positionId == 'right-source') {
                    console.log('事这里')
                    const newNode = {
                        id,
                        type: 'custom',
                        position: screenToFlowPosition({
                            x: clientX + 200,
                            y: clientY
                        }),
                        data: { name: 'Kristi Price', job: 'Developer', emoji: '🤩', id },
                        origin: [0.5, 0.0]
                    }
                    setNodes(nds => nds.concat(newNode))
                    setEdges(eds => eds.concat({ id: id, source: connectionState.fromNode.id, target: id, sourceHandle: 'right-source', targetHandle: 'left-target' }))
                }
            }
        },
        [screenToFlowPosition]
    )

    return (
        <div className="w-full h-full" ref={reactFlowWrapper}>
            <ReactFlow colorMode="system" nodeTypes={nodeTypes} style={{ backgroundColor: '#F7F9FB' }} nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onConnectEnd={onConnectEnd} fitView fitViewOptions={{ padding: 2 }}>
                <Background />
            </ReactFlow>
        </div>
    )
}

export default () => (
    <ReactFlowProvider>
        <AddNodeOnEdgeDrop />
    </ReactFlowProvider>
)
