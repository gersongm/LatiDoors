import { CustomIcon } from "@/components/CustomIcon"
import { BarChart } from "lucide-react"
import { Graphic } from "../Graphic"

export function FinancialState() {
  return (
    <div className="shadow-sm bg-background rounded-lg p-5 w-full">
        <div className="flex items-center gap-2">
            <CustomIcon icon={BarChart} />
            <h2 className="text-lg font-semibold">Estado Financiero</h2>
            </div>
            <Graphic/>
    </div>
  )
}
