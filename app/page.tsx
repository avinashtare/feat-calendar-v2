"use client";
import React from "react";
import Schedule from "@/components/Scheduler/Scheduler";
import { UserData } from "@/components/Scheduler/types/types";

const page: React.FC = () => {
  const calanderDateSelected = (data: UserData) => {
    console.log(data);
  };
  return (
    <div className="w-full h-full">
      <h1 className="text-center text-4xl font-bold text-white p-10">
        Scheduler
      </h1>
      <div className="w-full h-full flex justify-center">
        <div className="w-[60%] h-[80%]">
          <Schedule selectedDate={calanderDateSelected} />
        </div>
      </div>
    </div>
  );
};

export default page;
