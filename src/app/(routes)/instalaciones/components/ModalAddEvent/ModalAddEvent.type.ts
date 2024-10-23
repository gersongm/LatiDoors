import { Dispatch ,SetStateAction} from "react";

export type ModalAddEventProps={
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>,
    setOnSaveNewEvent:Dispatch<SetStateAction<boolean>>,
    setNewEvent:Dispatch<SetStateAction<{
        id:string,
        title:string,
        description:string,
        date:Date,
        allDay:boolean,
        timeFormat:string,
        createInst:Date,
        updateInst:Date,
        
    }>>,
}