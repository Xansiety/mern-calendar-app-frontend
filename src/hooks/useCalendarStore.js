import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      // Update event
      if (calendarEvent._id) {
        const { data } = await calendarApi.put(
          `/events/${calendarEvent._id}`,
          calendarEvent
        );
        // console.log({data});
        // console.log('Es una actualización', {...calendarEvent, user});
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      // Create new event
      const { data } = await calendarApi.post("/events/create", calendarEvent);
      console.log({ data });
      dispatch(onAddNewEvent({ ...calendarEvent, _id: data.evento._id, user }));
    } catch (error) { 
      Swal.fire("Error", error.response.data.msg, "error");
    }
  };

  const startDeletingEvent = async () => {
    dispatch(onDeleteEvent());
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = convertEventsToDateEvents(data.eventos);
      dispatch(onLoadEvents(events));
      // console.log({events})
    } catch (error) {
      console.log("Error loading events", error);
    }
  };
  return {
    // * Properties
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,
    // * Methods
    setActiveEvent,
    startLoadingEvents,
    startSavingEvent,
    startDeletingEvent,
  };
};
