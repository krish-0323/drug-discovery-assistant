"use client";
import { Loader2, Plus } from 'lucide-react';
import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const CreateNoteDialog = () => {
  const router = useRouter();
  const [input, setInput] = useState('');
  const createNoteBook = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/createNoteBook', {
        name: input
      })
      return response.data;
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(input === '' ){
      window.alert('Please enter a name');
      return;
    }
    createNoteBook.mutate(undefined, {
      onSuccess: ({note_id}) => {
        console.log("Created new note: ", {note_id});
        router.push(`/notebook/${note_id}`);
      },
      onError: (error) => {
        console.error('Error creating notebook', error);
        window.alert(`Failed to create new notebook: ${error}`);
      }
    });
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className='border-dashed border-2 flex border-green-600 rounded-lg h-full items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4'>
          <Plus className='w-6 h-6 text-green-600' strokeWidth={3}/>
          <h2 className='font-semibold text-green-600 sm:mt-2'>Create New Notebook</h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Notebook</DialogTitle>
          <DialogDescription>
            You can create a new notebook by clicking the button below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Name..."></Input>
          <div className="h-4"></div>
          <div className="flex justify-around items-center gap-2">
            <Button type='reset' variant={'secondary'}>
              Cancel
            </Button>
            <Button type='submit' className='bg-green-600' disabled={createNoteBook.isPending}>
              {createNoteBook.isPending && (
                <Loader2 className='w-4 h-4 animate-spin' />
              )}  
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateNoteDialog
