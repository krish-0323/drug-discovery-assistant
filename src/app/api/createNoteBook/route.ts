import { db } from "@/lib/db";
import { $research } from "@/lib/db/schema";
import { generateImage, generateImagePrompt } from "@/lib/openai";
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

  let image_description = await generateImagePrompt(name);
  console.log({image_description});
  
  if(image_description === null){
    image_description = 'A notebook with a minimalistic flat design';
  }

  const image_url = await generateImage(image_description);
  if(!image_url){
    return new NextResponse('Failed to generate image', 
      {status: 500}
    );
  }

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

