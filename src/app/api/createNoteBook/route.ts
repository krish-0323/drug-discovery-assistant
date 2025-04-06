import { db } from "@/lib/db";
import { $research } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request){
  
  const userId = await auth();

  if(!userId.userId){
    return new NextResponse('Unauthorized', {status: 401});
  }

  console.log(userId.userId);
  
  const body = await req.json();
  const {name} = body;

  // const image_description = 'A notebook with a minimalistic flat design';
  const image_url = "thumbnail.webp"

  const note_ids = await db
  .insert($research)
  .values({
    name: name,
    userId: userId.userId,
    imageUrl: image_url,
  })
  .returning({
    insertedId: $research.id,
  });

  return NextResponse.json({note_id: note_ids[0].insertedId});
}

