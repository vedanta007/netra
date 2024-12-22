'use client'

import CustomDialogHeader from '@/components/customDialogHeader'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { CreateWorkflowSchema, createWorkflowSchemaType } from '@/schema/workflows'
import { Layers2Icon, Loader2 } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useMutation } from '@tanstack/react-query'
import { CreateWorkflow } from '@/actions/workflows/createWorkflow'
import { toast } from 'sonner'

function CreateWorkflowDialog({ triggerText }: { triggerText?: string }) {
    const [open, setOpen] = useState(false)

    const form = useForm<createWorkflowSchemaType>({
        resolver: zodResolver(CreateWorkflowSchema),
        defaultValues: {}
    })

    const { mutate, isPending } = useMutation({
        mutationFn: CreateWorkflow,
        onSuccess: () => {
            toast.success('Workflow created successfully', { id: 'create-workflow' })
        },
        onError: () => {
            toast.error('Failed to create workflow', { id: 'create-workflow' })
        }
    })

    const onSubmit = useCallback((values: createWorkflowSchemaType) => {
        toast.loading('Creating workflow...', { id: 'create-workflow' })
        mutate(values)
    }, [mutate])

    return (
        <Dialog open={open} onOpenChange={(open) => {
            form.reset();
            setOpen(open)}}>
            <DialogTrigger asChild>
                <Button>{triggerText ?? 'Create Workflow'}</Button>
            </DialogTrigger>
            <DialogContent className='px-0'>
                <CustomDialogHeader icon={Layers2Icon} title='Create Workflow' subTitle='Start building your workflow'/>
                <div className="p-6">
                    <Form {...form}>
                        <form className='space-y-8 w-full' onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control} name='name' render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='felx items-center gap-1'>
                                        Name
                                        <p className='text-xs text-primary'>(required)</p>
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Choose a descriptive and unique name for your workflow
                                    </FormDescription>
                                </FormItem>
                            )}/>
                            <FormField control={form.control} name='description' render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='felx items-center gap-1'>
                                        Description
                                        <p className='text-xs text-muted-foreground'>(optional)</p>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea className='resize-none' {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Provide a short description of your workflow.
                                        <br />This will help you and your team understand the purpose of this workflow.
                                    </FormDescription>
                                </FormItem>
                            )}/>
                            <Button type='submit' className='w-full' disabled={isPending}>
                                {!isPending ? 'Proceed' : <Loader2 className='animate-spin' />}
                            </Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateWorkflowDialog