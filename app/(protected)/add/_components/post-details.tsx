"use client";

import { ArrowButton } from "@/components/arrow-button";
import DoughnutChart from "@/components/doughnut-chart";
import FormContainer from "@/components/form-container";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const PostDetails = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const steps = [
    {
      name: "ძირითადი მახასიათებლები",
      isFinished: false,
    },
    {
      name: "მდებარეობა და განბაჟება",
      isFinished: false,
    },
    {
      name: "ფოტო / ვიდეო",
      isFinished: false,
    },
    {
      name: "ფასი",
      isFinished: false,
    },
    {
      name: "კონტაქტი",
      isFinished: false,
    },
  ];

  const onExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      <FormContainer
        onClick={onExpand}
        className="lg:hidden flex items-center justify-between py-2 px-8 rounded-lg cursor-pointer"
      >
        <div className="flex w-[40%] items-center gap-2">
          <DoughnutChart />
          <span className="text-xs text-muted-foreground tracking-wide text-nowrap">
            ძირითადი მახასიათებლები
          </span>
        </div>
        
        <ArrowButton isExpanded={isExpanded} />
      </FormContainer>
      <FormContainer
        className={cn(
          "w-full lg:w-[24%] px-11 lg:px-3 py-6 lg:flex flex-col",
          isExpanded ? "flex" : "hidden lg:flex"
        )}
      >
        {steps.map((step) => (
          <div key={step.name} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-full border-2 border-gray-200 h-4 w-4 cursor-pointer"></div>
              {step.name !== "კონტაქტი" && (
                <Separator
                  className="h-7 w-[0.1rem] my-1"
                  orientation="vertical"
                />
              )}
            </div>
            <ul className="text-[0.75rem] text-gray-400 -mt-[0.165rem] cursor-pointer tracking-wide font-[500]">
              {step.name}
            </ul>
          </div>
        ))}
      </FormContainer>
    </>
  );
};
