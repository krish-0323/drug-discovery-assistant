import { db } from "@/lib/db";
import { $research } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request){
  try {
    const body = await req.json();
    let {noteId} = body;

    if(!noteId) {
      return new Response("Missing editorState or noteId", {status: 400});
    }

    noteId = parseInt(noteId);
    const notes = await db.select().from($research).where(eq($research.id, noteId));

    if(notes.length !== 1) {
      return new NextResponse("Note not found", {status: 404});
    }
    
    const note = notes[0]
    

    return NextResponse.json({success: true}, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({success: false, error: "Internal Server Error"}, {status: 500});
  }
}