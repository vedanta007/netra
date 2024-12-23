import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";

export function CreateFlowNode(
    nodeType: TaskType,
    position?: {
        x: number,
        y: number
    }): AppNode {
    return {
        id: crypto.randomUUID(),
        dragHandle: '.drag-handle',
        type: 'NetraNode',
        position: position || { x: 0, y: 0 },
        data: {
            type: nodeType,
            inputs: {}
        }
    }
}