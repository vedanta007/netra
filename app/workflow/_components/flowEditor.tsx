'use client'

import { Workflow } from '@prisma/client'
import React, { useCallback, useEffect } from 'react'
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import NodeComponent from './nodes/nodeComponent'
import { toast } from 'sonner'
import { CreateFlowNode } from '@/lib/workflow/createFlowNode'
import { TaskType } from '@/types/task'
import { AppNode } from '@/types/appNode'

const nodeTypes = {
    NetraNode: NodeComponent
}

const snapGrid: [number, number] = [50, 50]
const fitViewOptions = { padding: 1 }

function FlowEditor({ workflow }: { workflow: Workflow }) {
    const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const { setViewport, screenToFlowPosition } = useReactFlow()

    useEffect(() => {
        try {
            const flow = JSON.parse(workflow.definition)
            if(!flow) return
            setNodes(flow.nodes || [])
            setEdges(flow.edges || [])
            if(!flow.viewport) return
            const { x = 0, y = 0, zoom = 1 } = flow.viewport
            setViewport({ x, y, zoom })
        } catch (error) {
            toast.error('Failed to load workflow', { id: 'workflow-load' })
        }
    }, [setEdges, setNodes, workflow.definition, setViewport])

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
    }, [])

    const onDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault()
        const taskType = event.dataTransfer.getData('application/reactflow')
        if(typeof taskType === undefined || !taskType) return
        const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY
        })
        const newNode = CreateFlowNode(taskType as TaskType, position)
        setNodes(nodes => nodes.concat(newNode))
    }, [])

    return (
        <main className='h-full w-full'>
            <ReactFlow
                nodes={nodes} onNodesChange={onNodesChange}
                edges={edges} onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                snapToGrid snapGrid={snapGrid}
                fitView fitViewOptions={fitViewOptions}
                onDragOver={onDragOver}
                onDrop={onDrop}
            >
                <Controls position='top-left' fitViewOptions={fitViewOptions} />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </main>
    )
}

export default FlowEditor