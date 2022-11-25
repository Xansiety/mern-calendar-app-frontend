import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addHours } from "date-fns";
import { NavBar, CalendarEvent, CalendarModal } from "../";
import { localizer, getMessagesCalendarES } from "../../helpers";
import { useState } from "react";

const events = [
  {
    title: "Cumpleaños del jefe",
    notes: "Some notes about this event",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#f0f0f0",
    user: {
      _id: "123",
      name: "xansiety",
    },
  },
];

export const CalendarPage = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log({ event, start, end, isSelected });

    const style = {
      backgroundColor: "#367cf7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    console.log("onDoubleClick", event);
  };

  const onSelect = (event) => {
    console.log("onSelect", event);
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
    </>
  );
};
