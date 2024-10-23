export type FormEventProps={
    setNewEvent:React.Dispatch<React.SetStateAction<{
        id:string,
        title:string,
        description:string,
        date:Date,
        allDay:boolean,
        timeFormat:string,
        createInst:Date,
        updateInst:Date,
    }>>
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
  setOnSaveNewEvent:React.Dispatch<React.SetStateAction<boolean>>
}