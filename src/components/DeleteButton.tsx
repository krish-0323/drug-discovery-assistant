"use client";
import React from 'react'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Props {
  noteId: number
}

const DeleteButton = (props: Props) => {
  const router = useRouter();
  const deleteNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/deleteNote', {
        noteId: props.noteId
      })
      return response.data
    }
  })
  return (
    <div>
      <Button variant={'destructive'} size={'sm'} disabled={deleteNote.isPending} onClick={() => {
        const confirm = window.confirm('Are you sure you want to delete this notebook?');
        if(!confirm) return;
        deleteNote.mutate(undefined, {
          onSuccess: () => {
            router.push('/dashboard')
          },
          onError: (error) => {
            console.log(error)
          }
        })

      }}>
        <Trash />
      </Button>
    </div>
  )
}

export default DeleteButton
