import React from "react";
import { CardSummaryProps } from "./CardSummary.type";
import { CustomIcon } from "@/components/CustomIcon";
import { CustomTooltip } from "@/components/CustomTooltip";
import { cn } from "@/lib/utils";
import {  MoveDownRight, MoveUpRight, TrendingUp } from "lucide-react";
import { currencyFormatter } from "@/funtions";

export const CardSummary = (props: CardSummaryProps) => {
  const { title, icon, tooltipText, average, total } = props;
  return (
    <div className="shadow-sm bg-background rounded-lg p-3 py-3 hover:shadow-lg transition">
      <div className="flex justify-between">
        <div className=" flex gap-2 items-center">
        <CustomIcon icon={icon} />
        {title}
        </div>
        <CustomTooltip content={tooltipText}/>
      </div>
     <div className="flex gap-3 mt-2 md:mt-4">
      <p className="text-2xl">{currencyFormatter(total)}</p>
      <div className={cn(`flex items-center gap-1 px-2 text-xs text-white rounded-lg h-[20px] bg-black dark:bg-secondary`)}>
      {average}%
      {average <20 &&
      (<MoveDownRight strokeWidth={2} className="w-4 h-4"/>)}
      {average >20  && average <70 &&
      (<MoveUpRight strokeWidth={2} className="w-4 h-4"/>)}
      {average >70 &&
      (<TrendingUp strokeWidth={2} className="w-4 h-4"/>)}
      </div>
     </div>
    </div>
  );
};
