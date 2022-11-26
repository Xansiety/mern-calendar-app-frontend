import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
  title: "Cumpleaños del jefe",
  notes: "Some notes about this event",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#f0f0f0",
  user: {
    _id: "123",
    name: "xansiety",
  },
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [tempEvent],
    activeEvent: null,
  },
  reducers: {
    increment: (state /* action */) => {
      state.counter += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment } = calendarSlice.actions;
