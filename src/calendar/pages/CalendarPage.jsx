import { Calendar } from "react-big-calendar";
import { NavBar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../";
import { localizer, getMessagesCalendarES } from "../../helpers";
import { useEffect, useState } from "react";
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import { eventStyleGetter } from "../uiHelpers/stylesModal";

export const CalendarPage = () => {

  const {user} = useAuthStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { openDateModal } = useUiStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log({ event, start, end, isSelected }); 
    const isMyEvent = user.uid  === event.user._id  || user.uid  === event.user.uid ; 
  
    const style = {
      backgroundColor: isMyEvent ? "#367cf7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
  
    return {
      style,
    };
  };

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
