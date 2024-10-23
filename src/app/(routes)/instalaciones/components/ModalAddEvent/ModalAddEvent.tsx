"use client"

import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog'
import { ModalAddEventProps } from "./ModalAddEvent.type";
import { FormEvent } from '../FormEvent';

export function ModalAddEvent(props:ModalAddEventProps) {
  const {open,setOpen,setNewEvent,setOnSaveNewEvent}=props;
  return (
    <Dialog open={open}  onOpenChange={setOpen}>
        <DialogContent className="sm:max-w[420px]">
            <DialogHeader>
                <DialogTitle>Nuevo Evento</DialogTitle>
            </DialogHeader>
            <FormEvent 
            setNewEvent={setNewEvent} 
            setOnSaveNewEvent={setOnSaveNewEvent} 
            setOpen={setOpen}/>
        </DialogContent>
    </Dialog>
  )
}
