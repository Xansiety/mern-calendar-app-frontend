import { Calendar } from "react-big-calendar";
import { NavBar, CalendarEvent, CalendarModal, FabAddNew } from "../";
import { localizer, getMessagesCalendarES } from "../../helpers";
import { useState } from "react";
import { useUiStore, useCalendarStore } from "../../hooks";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { eventStyleGetter } from "../uiHelpers/stylesModal";

export const CalendarPage = () => {
  const { events, setActiveEvent } = useCalendarStore();
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
        style={{ height: "calc( 100vh - 80px)" }}
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

    </>
  );
};
