import { addEdge, Background, BackgroundVariant, Connection, Controls, Edge, EdgeTypes, MiniMap, Node, OnConnect, Panel, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { OscillatorNode } from './OscillatorNode'
import { VolumeNode } from './VolumeNode'
import { OutputNode } from './OutputNode'
import { connect, createAudioNode } from './Audio'

const initialNodes: Node[] = [
    {
        id: 'a',
        type: 'osc',
        data: { frequency: 220, type: 'square' },
        position: { x: 200, y: 0 }
    },
    {
        id: 'b',
        type: 'volume',
        data: { gain: 0.5 },
        position: { x: 150, y: 250 }
    },
    {
        id: 'c',
        type: 'out',
        data: {},
        position: { x: 350, y: 400 }
    }
]

const initialEdges: Edge[] = []

const nodeTypes = {
    osc: OscillatorNode,
    volume: VolumeNode,
    out: OutputNode
}

export default function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

    const onConnect = (params: Connection) => {
        // console.log('链接', params)

        connect(params.source, params.target)
        setEdges(eds => addEdge(params, eds))
    }

    function addOscNode() {
        const id = Math.random().toString().slice(2, 8)
        const position = { x: 0, y: 0 }
        const type = 'osc'
        const data = { frequency: 400, type: 'sine' }

        setNodes([...nodes, { id, type, data, position }])
        createAudioNode(id, type, data)
    }

    function addVolumeNode() {
        const id = Math.random().toString().slice(2, 8)
        const data = { gain: 0.5 }
        const position = { x: 0, y: 0 }
        const type = 'volume'

        setNodes([...nodes, { id, type, data, position }])
        createAudioNode(id, type, data)
    }

    return (
        <div className="w-full h-full">
            <ReactFlow colorMode="light" nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} nodeTypes={nodeTypes} fitView>
                <Controls className="text-black" />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} />
                <Panel className={'space-x-4'} position="top-right">
                    <button className={'text-black p-[4px] rounded bg-audio-background shadow'} onClick={addOscNode}>
                        添加振荡器节点
                    </button>
                    <button className={'text-black p-[4px] rounded bg-audio-background shadow'} onClick={addVolumeNode}>
                        添加音量节点
                    </button>
                </Panel>
            </ReactFlow>
        </div>
    )
}
