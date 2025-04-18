import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import CreateNoteDialog  from "@/components/CreateNoteDialog";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { $research } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Image from "next/image";


const DashboardPage = async () => {
  
  const userId = await auth();
  if(!userId.userId) {
    return redirect('/sign-in');
  }
  const notes = await db.select().from($research).where(eq($research.userId, userId.userId));
  
  return (
    <>
      <div className="bg-gradient-to-r from-rose-100 to-teal-100 grainy min-h-screen">
        <div className="max-w-7xl mx-auto p-10">
          <div className="h-14"></div>
          <div className="flex items-center justify-between md:flex-row flex-col">
            <div className="flex items-center">
              <Link href="/">
                <Button className="bg-green-600" size="sm">
                  <ArrowLeft className="mr-1 w-4 h-4" />
                  Back
                </Button>
              </Link>
              <div className="w-4"></div>
              <h1 className="text-3xl font-bold text-gray-900">My Research</h1>
              <div className="w-4"></div>
              <UserButton/>
            </div>
          </div>

          <div className="h-8"></div>
          <Separator />
          <div className="h-8"></div>

          { notes.length === 0 && (
            <div className="text-center">
              <h2 className="text-xl text-gray-500">You have no reasearch yet.</h2>
            </div>
          )}
          <div className="h-8"></div>
          <div className="grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3">
            <CreateNoteDialog/>
          
            {notes.map(note => {
              return (
                <a href={`/notebook/${note.id}`} key={note.id}>
                  <div className=" border border-stone-400 overflow-hidden rounded-lg flex flex-col hover:shadow-xl transition hover:-translate-y-1">
                    <Image
                    width={400}
                    height={600}
                    alt={note.name}
                    src={note.imageUrl || '/thumbnail.webp'}
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-9000">{note.name}</h3>
                    </div>
                    <div className="h-1"></div>
                    <p className="text-sm text-gray-500 p-2">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </a>
              )
            })}
          </div>
            
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
