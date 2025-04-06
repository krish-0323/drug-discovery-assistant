"use client";
import React from "react";
import Typewriter from "typewriter-effect";

const TypewriterTitle = () => {
  return (
    <Typewriter
      options={{
        loop:true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("Supercharge your drug discovery")
          .pauseFor(2000)
          .deleteAll()
          .typeString("AI Powered Insights")
          .start();
      }}

    />
  )
}

export default TypewriterTitle;
