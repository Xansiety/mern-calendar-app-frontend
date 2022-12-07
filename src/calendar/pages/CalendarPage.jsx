import { Calendar } from "react-big-calendar";
import { NavBar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../";
import { localizer, getMessagesCalendarES } from "../../helpers";
import { useEffect, useState } from "react";
import { useUiStore, useCalendarStore } from "../../hooks";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { eventStyleGetter } from "../uiHelpers/stylesModal";

export const CalendarPage = () => {
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { openDateModal } = useUiStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const onDoubleClick = (event) => {
    // console.log("onDoubleClick", event);
    openDateModal();
  };

  const onSelect = (event) => {
    setActiveEvent(event);
  };

  const onViewChange = (event) => {
    localStorage.setItem("lastView", event);
  };
 
  useEffect(() => {
    startLoadingEvents()   
  },[])
   
  return (
    <>
      <NavBar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 90px)" }}
        messages={getMessagesCalendarES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />

      <CalendarModal />

        <FabAddNew />
        <FabDelete />

    </>
  );
};
