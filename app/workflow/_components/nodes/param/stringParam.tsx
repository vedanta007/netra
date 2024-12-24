'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ParamProps } from '@/types/appNode'
import { useId, useState } from 'react'

function StringParam({ param, value, updateNodeParamValue }: ParamProps) {
    const id = useId()
    const [internalValue, setInternalValue] = useState(value)
    return (
        <div className='space-y-1 p-1 w-full'>
            <Label htmlFor={id} className='text-xs flex'>
                {param.name}
                {param.required && (
                    <p className='text-red-400 px-2'>*</p>
                )}
            </Label>
            <Input
                id={id}
                value={internalValue}
                placeholder='Enter URL here'
                onChange={(e) => setInternalValue(e.target.value)}
                onBlur={(e) => updateNodeParamValue(e.target.value)}
                className='text-xs'
            />
            {param.helperText && (
                <p className='px-2 text-muted-foreground'>{param.helperText}</p>
            )}
        </div>
    )
}

export default StringParam