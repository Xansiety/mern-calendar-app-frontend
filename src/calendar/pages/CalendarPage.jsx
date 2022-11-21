import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addHours } from "date-fns";
import { NavBar } from "../";
import { localizer, getMessagesCalendarES } from "../../helpers";

const events = [
  {
    title: "My event",
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
  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log({ event, start, end, isSelected });

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

  return (
    <>
      <NavBar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 80px)" }}
        messages={getMessagesCalendarES()}
        eventPropGetter={eventStyleGetter}
      />
    </>
  );
};
