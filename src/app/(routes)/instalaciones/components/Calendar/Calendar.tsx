"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import multiMonthPlugin from "@fullcalendar/multimonth";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { DateSelectArg, EventContentArg } from "@fullcalendar/core";
import esLocale from "@fullcalendar/core/locales/es";

import { formatDate } from "@/lib/formatDate";

import { InstalacionesProps } from "./calendar.type";

import FullCalendar from "@fullcalendar/react";
import { ModalAddEvent } from "../ModalAddEvent";
import { AddData, sqlDelete } from "@/app/Backend/sql/sqlAll";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Instalacion } from "@/app/(routes)/Models/Instalacion";

export function Calendar(props: InstalacionesProps) {
  const { instalaciones, Recargar } = props;
  const route = useRouter();
  const [open, setOpen] = useState(false);
  const [onSaveNewEvent, setOnSaveNewEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    id: "",
    title: "",
    description: "",
    date: new Date(),
    allDay: false,
    timeFormat: "",
    createInst: new Date(),
    updateInst: new Date(),
  });
  const [currentEvents, setCurrentEvents] = useState<DateSelectArg>();

  useEffect(() => {
    if (onSaveNewEvent && currentEvents?.view.calendar) {
      const calendarApi = currentEvents.view.calendar;
      calendarApi.unselect();

      const guardar = async () => {
        try {
          const newEventSave = {
            title: newEvent.title,
            description: newEvent.description,
            timeFormat: "H(:mm)",
            date: format(newEvent.date, "yyyy-MM-dd HH:mm:ss"),
          };

          const dataEvento = await AddData("tbl_instalaciones", newEventSave);
          if (dataEvento) {
            if (dataEvento.message) {
              toast({ title: dataEvento.message });
            } else {
              console.log(dataEvento);
              toast({ title: dataEvento.error, variant: "destructive" });
            }

            route.refresh();
          }
        } catch (error) {
          toast({ title: "Error al crear el evento", variant: "destructive" });
        }
      };

      guardar();

      setNewEvent({
        id: "",
        title: "",
        description: "",
        date: new Date(),
        allDay: false,
        timeFormat: "",
        createInst: new Date(),
        updateInst: new Date(),
      });
      setOnSaveNewEvent(false);
    }
  }, [onSaveNewEvent, currentEvents, newEvent]);

  const handledDateClick = async (dateSelect: DateSelectArg) => {
    setOpen(true);
    setCurrentEvents(dateSelect);
  };

  const ViewClick = (instalacionId:Instalacion) => {
    return (
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{instalacionId.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {instalacionId.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    );
  };

  const handleEventClick = async (selected: any) => {
    if (
      window.confirm(
        `¿Estas seguro de eliminar el evento ${selected.event.title}?`
      )
    ) {
      try {
        const id = Number(selected.event.id);
        const data = await sqlDelete("tbl_instalaciones", id);
        if (data) {
          selected.event.remove();
          toast({ title: data.message });
          Recargar((e) => !e);
          route.refresh();
        } else {
          toast({
            title: "El Evento no pudo ser eliminado",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({ title: "Error al eliminar el evento", variant: "destructive" });
      }
    } else {
      toast({ title: "Cancelado" });
    }
  };

  return (
    <div>
      <div className="flex gap-x-3 ">
        <div className="w[400px] relative border-2 border-grey-300 p-2 content-center rounded-md hidden md:flex">
          <p className=" text-lg font-bold  *:text-gray-500 text-center">
            Pendientes Hoy
          </p>
          <Separator className="absolute top-10 left-0 w-full" />
          <div className="overflow-auto absolute  dark:bg-slate-800 left-0 top-10 w-full h-full">
            {instalaciones
              .filter((inst) => {
                const today = new Date();
                const instDate = new Date(inst.date); // Assuming 'date' is a Date object
                return (
                  instDate.getFullYear() === today.getFullYear() &&
                  instDate.getMonth() === today.getMonth() &&
                  instDate.getDate() === today.getDate()
                );
              })
              .map((instalacion) => {
                return (
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button
                        key={instalacion.id}
                        variant="secondary"
                        className="flex flex-col justify-center items-center left-0 m-4 w-11/12 rounded-sm "
                      >
                        <p className="text -left ">{instalacion.title}</p>
                        <p>{formatDate(instalacion.date)}</p>
                      </Button>
                    </AlertDialogTrigger>
                    {ViewClick(instalacion)}
                  </AlertDialog>
                );
              })}
          </div>
        </div>

        <div className="flex-1 calendar-container">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
              multiMonthPlugin,
            ]}
            headerToolbar={{
              left: "title",
              right:
                "timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear,listMonth",
            }}
            locale={esLocale}
            height="80vh"
            initialView="dayGridMonth"
            weekends={false}
            events={instalaciones}
            eventContent={renderEventContent}
            editable={true}
            selectable={true}
            selectMirror={true}
            select={handledDateClick}
            eventClick={handleEventClick}
          />
        </div>
      </div>
      <div className="overflow-y-auto">
        <ModalAddEvent
          open={open}
          setOpen={setOpen}
          setNewEvent={setNewEvent}
          setOnSaveNewEvent={setOnSaveNewEvent}
        />
      </div>
    </div>
  );
}

function renderEventContent(eventInfo: EventContentArg) {
  return (
    <div className="bg-slate-200 dark:bg-background p-1 w-full rounded-lg">
      <i>{eventInfo.event.title}</i>
    </div>
  );
}
