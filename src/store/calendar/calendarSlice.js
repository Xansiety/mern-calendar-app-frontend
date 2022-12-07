import { createSlice } from "@reduxjs/toolkit";
// import { addHours } from "date-fns";
// const tempEvent = {
//   _id: new Date().getTime(),
//   title: "Cumpleaños del jefe",
//   notes: "Some notes about this event",
//   start: new Date(),
//   end: addHours(new Date(), 2),
//   bgColor: "#f0f0f0",
//   user: {
//     _id: "123",
//     name: "xansiety",
//   },
// };

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) =>
        event._id === payload._id ? payload : event
      );
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter((event) => event._id !== state.activeEvent._id);
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      // state.events = payload;
      // console.log(payload)
      payload.forEach((event) => {
        const existeEvento = state.events.some((e) => e._id === event._id);
        if (!existeEvento) {
          state.events.push(event);
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onLoadEvents, onUpdateEvent, onDeleteEvent } =
  calendarSlice.actions;
