import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { $research } from '@/lib/db/schema';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { and } from 'drizzle-orm';
import Link from 'next/link';
import { clerk } from "@/lib/clerk-server";
import { redirect } from 'next/navigation';
import React from 'react'
import { UserButton } from '@clerk/nextjs';
import DeleteButton from '@/components/DeleteButton';
import Main from '@/components/Main';

interface PageProps {
  params: {
    noteId: string
  };
  searchParams: {
    [key: string]: string | string[] | undefined
  };
}

const NotebookPage = async ({ params, searchParams }: PageProps) => {
  const {userId} = await auth();
  const user = await clerk.users.getUser(userId as string);
  
  if(!userId){
    return redirect('/dashboard');
  }

  const notes = await db
  .select()
  .from($research)
  .where(and(eq($research.id, parseInt(params.noteId)), eq($research.userId, userId)));
  
  if(notes.length !== 1){
    return redirect('/dashboard');
  }

  const note = notes[0];

  return (
    <div className="min-h-screen grainy p-8">
      <div className='w-full'>
        <div className='border shadow-xl border-stone-200 rounded-lg p-4 flex items-center'>
          <Link href="/dashboard">
            <Button className="bg-green-600" size="sm">
                Back
            </Button>
          </Link>
          <div className="w-3"></div>
          <span className='font-semibold flex items-center gap-2'>
            {user.firstName} {user.lastName} <UserButton/>
          </span>
          <span className='inline-block mx-1'>/</span>
          <span className='text-stone-500 font-semibold'>{note.name}</span>
          <div className="ml-auto">
            <DeleteButton noteId={note.id} />
          </div>
        </div>

        <div className="h-4"></div>

        <div className='border shadow-xl w-full border-stone-200 rounded-lg flex'>
          {/* <Sidebar note={note} /> */}
          <Main note={note} />
        </div>
      </div>
    </div>
  )
}

export default NotebookPage;
