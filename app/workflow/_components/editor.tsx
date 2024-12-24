'use client'

import { Workflow } from '@prisma/client'
import React from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import FlowEditor from './flowEditor'
import Topbar from './topbar/topbar'

function Editor({ workflow }: { workflow: Workflow }) {
    return (
        <ReactFlowProvider>
            <div className="flex flex-col h-full w-full overflow-hidden">
                <Topbar title='Workflow editor' subTitle={workflow.name} workflowId={workflow.id} />
                <section className="flex h-full overflow-auto">
                    <FlowEditor workflow={workflow} />
                </section>
            </div>
        </ReactFlowProvider>
    )
}

export default Editor