import { CustomIcon } from "@/components/CustomIcon";
import { Building } from "lucide-react";
import { CustumerDataTable} from "../CustomersTable";

export default function LastCustomers() {
  return (
    <div className="shadow-sm bg-background rounded-lg p-3">
      <div className="flex gap-x-2 items-center">
        <CustomIcon icon={Building} />
        <p className="text-xl font-medium">Ultimos Clientes</p>
      </div>
      <div>
       <CustumerDataTable />
      </div>
    </div>
  );
}
