'use client'

import TooltipWrapper from '@/components/tooltipWrapper'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon } from 'lucide-react'
import { useRouter } from 'next/router'
import React from 'react'
import SaveButton from './saveButton'

interface Props {
    title: string
    subTitle?: string
    workflowId: string
}

function Topbar({ title, subTitle, workflowId }: Props) {
    const router = useRouter()
    return (
        <header className='flex justify-between p-2 border-b-2 border-separate w-full h-[60px] sticky top-0 bg-background z-10'>
            <div className="flex flex-1 gap-1">
                <TooltipWrapper content='Back'>
                    <Button variant={'ghost'} size={'icon'} onClick={() => router.back()}>
                        <ChevronLeftIcon size={20} />
                    </Button>
                </TooltipWrapper>
                <div>
                    <p className="font-bold text-ellipsis truncate">
                        {title}
                    </p>
                    {subTitle && (
                        <p className="text-xs truncate text-muted-foreground text-ellipsis">
                            {subTitle}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex gap-1 flex-1 justify-end">
                <SaveButton workflowId={workflowId} />
            </div>
        </header>
    )
}

export default Topbar