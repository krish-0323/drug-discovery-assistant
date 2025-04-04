"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TypewriterTitle from "@/components/ui/TypewriterTitle";
import {ArrowRight} from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gradient-to-r min-h-screen from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-7xl font-semibold text-center">
          AI <span className="text-green-600 font-bold">Drug Discovery</span>{" "}
          Assistant
        </h1>
        <div className="mt-4">
          <h2 className="font-semibold text-3xl text-slate-700 text-center">
            <TypewriterTitle />
          </h2>
        </div>
        <div className="mt-8"></div>
        <div className="flex justify-center">
          <Link href="/dashboard">
            <Button className="bg-green-800">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" strokeWidth={3} />
            </Button>
          </Link>
        </div>
        
      </div>
    </div>
  );
}
