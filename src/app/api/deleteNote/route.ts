import { $research, $chat } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

export async function POST(req: Request){
  const {noteId} = await req.json()
  const {userId} = await auth()
  await db.delete($research).where(eq($research.id, parseInt(noteId)))
  await db.delete($chat).where(and(eq($chat.noteBookId, parseInt(noteId)), eq($chat.userId, userId as string)))
  return  NextResponse.json( {message: 'Note deleted successfully'}, {status: 200})
}