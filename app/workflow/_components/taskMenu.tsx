'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { TaskRegistry } from '@/lib/workflow/task/registry'
import { TaskType } from '@/types/task'
import React from 'react'

function TaskMenu() {
    return (
        <aside className='w-[340px] min-w-[340px] max-w-[340px] border-r-2 border-separate h-full p-2 px-4 overflow-auto'>
            <Accordion type='multiple' className='w-full' defaultValue={['extraction']}>
                <AccordionItem value='extraction'>
                    <AccordionTrigger className='font-bold'>
                        Data Extraction
                    </AccordionTrigger>
                    <AccordionContent className='flex flex-col gap-1'>
                        <TaskMenuButton taskType={TaskType.PAGE_TO_HTML} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </aside>
    )
}

function TaskMenuButton({ taskType }: { taskType: TaskType }) {
    const task = TaskRegistry[taskType]
    const onDragStart = (e: React.DragEvent, type: TaskType) => {
        e.dataTransfer.setData('application/reactflow', type)
        e.dataTransfer.effectAllowed = 'move'
    }
    return (
        <Button
            variant={'secondary'}
            draggable
            className='flex justify-between items-center gap-2 border w-full'
            onDragStart={(e) => onDragStart(e, taskType)}
        >
            <div className='flex gap-2'>
                <task.icon size={20} />
                {task.label}
            </div>
        </Button>
    )
}

export default TaskMenu