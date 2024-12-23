'use client'

import { Workflow } from '@prisma/client'
import React from 'react'
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { CreateFlowNode } from '@/lib/workflow/createFlowNode'
import { TaskType } from '@/types/task'
import NodeComponent from './nodes/nodeComponent'

const nodeTypes = {
    NetraNode: NodeComponent
}

const snapGrid: [number, number] = [50, 50]
const fitViewOptions = { padding: 1 }

function FlowEditor({ workflow }: { workflow: Workflow }) {
    const [nodes, setNodes, onNodesChange] = useNodesState([
        CreateFlowNode(TaskType.LAUNCH_BROWSER)
    ])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    return (
        <main className='h-full w-full'>
            <ReactFlow
                nodes={nodes} onNodesChange={onNodesChange}
                edges={edges} onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                snapToGrid snapGrid={snapGrid}
                fitView fitViewOptions={fitViewOptions}
            >
                <Controls position='top-left' fitViewOptions={fitViewOptions} />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </main>
    )
}

export default FlowEditor