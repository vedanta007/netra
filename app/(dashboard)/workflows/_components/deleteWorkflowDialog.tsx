'use client'

import { DeleteWorkflow } from '@/actions/workflows/deleteWorkflow'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { toast } from 'sonner'

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
    workflowName: string
    workflowId: string
}

function DeleteWorkflowDialog({ open, setOpen, workflowName, workflowId }: Props) {
    const [confirmText, setConfirmText] = useState('')

    const deleteMutation = useMutation({
        mutationFn: DeleteWorkflow,
        onSuccess: () => {
            toast.success('Workflow deleted successfully', { id: 'workflowId' })
            setConfirmText('')
        },
        onError: () => {
            toast.error('Failed to delete workflow', { id: 'workflowId' })
        },
    })
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete the workflow and all its associated data.
                        <div className="flex flex-col py-4 gap-2">
                            <p>If you are sure, enter <b>{workflowName}</b> to confirm:</p>
                            <Input placeholder={workflowName} value={confirmText} onChange={e => setConfirmText(e.target.value)} />
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setConfirmText('')}>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={confirmText !== workflowName || deleteMutation.isPending}
                    className='bg-destructive text-desructive-foreground hover:bg-destructive/90'
                    onClick={() => {
                        toast.loading('Deleting workflow...', { id: 'workflowId' })
                        deleteMutation.mutate(workflowId)
                    }}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteWorkflowDialog