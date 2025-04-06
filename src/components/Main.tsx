"use client";
import React, { use, useState, useEffect } from "react";
import { ResearchType } from "@/lib/db/schema";
import { Card, CardContent } from "@/components/ui/card";
import {
  StethoscopeIcon,
  PillIcon,
  ShieldPlusIcon,
  ImagesIcon,
  MicIcon,
  SendIcon,
  UserIcon,
  BotIcon,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { chatSession } from "@/lib/gemini";
import { db } from "@/lib/db";
import { useUser } from "@clerk/nextjs";
import { $chat } from "@/lib/db/schema";
import { redirect } from "next/navigation";
import { eq, and } from "drizzle-orm";
interface Props {
  note: ResearchType;
}

const Main = ({ note }: Props) => {
  const { user } = useUser();
  const [prompt, setPrompt] = useState("");
  const [chats, setChats] = useState<any[]>([]);

  const HtmlRenderer = ({ htmlString }: { htmlString: string }) => {
    return (
      <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    );
  };

  const helper =
    " Please give the question asked by user and the answer in the json format, give question and answer as a field in the json. Write the answer in the html format wrap in div tag";

  const generateResult = async (result: any) => {
    const mockJSONResult = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    console.log(JSON.parse(mockJSONResult));
    const parsedResponse = JSON.parse(mockJSONResult);
    const question = parsedResponse.question;
    const answer = parsedResponse.answer;

    const resp = await db
      .insert($chat)
      .values({
        userId: user?.id as string,
        noteBookId: note.id,
        question: question,
        answer: answer,
      })
      .returning({
        insertedId: $chat.id,
      });

    if (!resp[0].insertedId) {
      console.log("Failed to insert chat");
    } else {
      console.log("Chat inserted successfully");
    }
  };

  const func1 = async () => {
    const result = await chatSession.sendMessage(
      `Tell me about the disease ${note.name} ${helper}`
    );
    generateResult(result);
  };

  const func2 = async () => {
    const result = await chatSession.sendMessage(
      `Briefly summarize the cure of ${note.name} ${helper}`
    );
    generateResult(result);
  };

  const func3 = async () => {
    const result = await chatSession.sendMessage(
      `What are precautions for ${note.name} ${helper}`
    );
    generateResult(result);
  };

  const sendPrompt = async () => {
    setPrompt("");
    const result = await chatSession.sendMessage(prompt);
    generateResult(result);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/getData?noteId=${note.id}`);
        const result = await response.json();
        // console.log(
        //   "data",
        //   result.data,
        //   "noteId",
        //   result.noteId,
        //   "userId",
        //   result.userId
        // );
        
        setChats(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const isSizeePositive = chats.length > 0;

  return (
    <div className="rounded-lg w-full flex flex-col gap-4 justify-center items-center p-4">
      <div className="flex flex-col w-full  gap-4 justify-center">
        <div className="w-full border-2 border-red-100 p-4">
          {!isSizeePositive && (
            <div>
              <div className="greet">
                <p>
                  <span>Hello, {user?.fullName}</span>
                </p>
                <p>What would you like to do today?</p>
              </div>

              <div className="cards grid grid-cols-3 gap-4">
                <Card className="cardee" onClick={func1}>
                  <CardContent>
                    <p>
                      Tell me about the disease {note.name}{" "}
                      <StethoscopeIcon className="iconn" />
                    </p>
                  </CardContent>
                </Card>
                <Card className="cardee" onClick={func2}>
                  <CardContent>
                    <p>
                      Briefly summarize the cure of {note.name}{" "}
                      <PillIcon className="iconn" />
                    </p>
                  </CardContent>
                </Card>
                <Card className="cardee" onClick={func3}>
                  <CardContent>
                    <p>
                      What are precautions for {note.name}{" "}
                      <ShieldPlusIcon className="iconn" />
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {isSizeePositive && (
            <div className="min-h-[400px] h-fit">
              {chats.map((chat) => (
                <div key={chat.id} className="flex flex-col gap-4">
                  <div className="font-bold flex gap-2"><span><UserIcon className="inline-block mr-4"/>{chat.question}</span></div>
                  <div className="flex justify-center items-center w-full p-2 bg-slate-300 rounded-lg shadow-lg"> <HtmlRenderer htmlString={chat.answer} /></div>
                  <div className="mb-2"></div>
                </div>
                
              ))}
            </div>
          )}
        </div>

        <div className="m-4 w-full flex justify-center items-center">
          <div className="bg-blue-200 rounded-3xl px-4 py-2 relative flex gap-2 justify-center">
            <div>
              <Input
                type="text"
                placeholder="Enter a prompt here..."
                className="w-[200px] md:w-[400px] lg:w-3xl outline-0"
                onChange={(e) => setPrompt(e.target.value + helper)}
              />
            </div>
            <div className="flex gap-4">
              <div className="flex gap-4">
                <Button type="button">
                  <ImagesIcon className="w-6 cursor-pointer" />
                </Button>
                <Button type="button">
                  <MicIcon className="w-6 cursor-pointer" />
                </Button>
                <Button type="button" onClick={sendPrompt}>
                  <SendIcon className="w-6 cursor-pointer" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
