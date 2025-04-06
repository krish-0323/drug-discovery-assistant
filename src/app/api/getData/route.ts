import { NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import { $chat } from "@/lib/db/schema";
import { and } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const noteId = searchParams.get("noteId");
    const { userId } = await auth();
    console.log("noteId", noteId);
    console.log("userId", userId);

    const data = await db
      .select()
      .from($chat)
      .where(and(eq($chat.noteBookId, parseInt(noteId as string)), eq($chat.userId, userId as string)))
      .execute();

    console.log("data", data);
    return NextResponse.json({ data: data, noteId: noteId, userId: userId });
  } catch {
    return NextResponse.json({ error: "Database fetch failed" }, { status: 500 });
  }
}
