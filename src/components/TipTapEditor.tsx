"use client";
import React from 'react'
import { EditorContent, useEditor} from '@tiptap/react'
import {StarterKit} from '@tiptap/starter-kit'
import TipTapMenuBar from './TipTapMenuBar';
import { Button } from './ui/button';
import { useDebounce } from '@/lib/useDebounce';
import { useMutation } from '@tanstack/react-query';
import { ResearchType } from '@/lib/db/schema';
import axios from 'axios';

interface Props {
  note: ResearchType;
}

const TipTapEditor = ({note}: Props) => {
  const [editorState, setEditorState] = React.useState(note.editorState || '');
  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/saveNote', {
        noteId: note.id,
        editorState: editorState
      });
      return response.data;
    }
  })

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: editorState,
    onUpdate: ({editor}) => {
      setEditorState(editor.getText());
    },
  })
  
  const debouncedEditorState = useDebounce(editorState, 1000);
  React.useEffect(() => {
    if(debouncedEditorState === '') return;
    saveNote.mutate(undefined, {
      onSuccess: data => {
        console.log('success update', data);
      },
      onError: error => {
        console.error('error update', error);
      }
    });

  }, [debouncedEditorState]);

  return (
    <>
      <div className='flex justify-evenly'>
        {editor && <TipTapMenuBar editor={editor}/>}
        <Button disabled={saveNote.isPending} variant={'outline'}>
          {saveNote.isPending ? 'Saving...' : 'Saved'}  
        </Button>
      </div>
      <div className='prose'>
        <EditorContent editor={editor} />
      </div>
    </>
  )
}

export default TipTapEditor;
