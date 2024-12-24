'use server'

import prisma from "@/lib/prisma";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { CreateWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflows";
import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { Edge } from "@xyflow/react";
import { redirect } from "next/navigation";

export async function CreateWorkflow(form: createWorkflowSchemaType) {
    const { success, data } = CreateWorkflowSchema.safeParse(form)
    if(!success) {
        throw new Error('Invalid form data')
    }

    const { userId } = await auth()
    if(!userId) {
        throw new Error('Unauthenticated')
    }

    const initialWorkflow: { nodes: AppNode[], edges: Edge[] } = {
        nodes: [],
        edges: [],
    }

    initialWorkflow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER))

    const result = await prisma.workflow.create({
        data: {
            userId,
            status: WorkflowStatus.DRAFT,
            definition: JSON.stringify(initialWorkflow),
            ...data,
        },
    })
    if(!result) {
        throw new Error('Failed to create workflow')
    }

    redirect(`/workflow/editor/${result.id}`)
}