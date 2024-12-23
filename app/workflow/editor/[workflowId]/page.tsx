import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import React from 'react'
import Editor from '../../_components/editor'

async function page({ params }: { params: { workflowId: string } }) {
    const { workflowId } = params
    const { userId } = await auth()
    if (!userId) {
        return <div>Not authenticated</div>
    }
    const workflow = await prisma.workflow.findUnique({
        where: {
            id: workflowId,
            userId,
        },
    })
    if (!workflow) {
        return <div>Workflow not found</div>
    }
    return (
        <Editor workflow={workflow} />
    )
}

export default page