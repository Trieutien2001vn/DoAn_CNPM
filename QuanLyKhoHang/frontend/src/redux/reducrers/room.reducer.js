import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    list: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    getRoomStart(state) {
      state.isFetching = true;
    },
    getRoomFail(state) {
      state.isFetching = false;
      state.error = true;
      state.list = null;
    },
    getRoomSuccess(state, action) {
      state.isFetching = false;
      state.error = false;
      state.list = action.payload;
    },
    clearRoom(state) {
      state.list = null;
    },
  },
});

export const { getRoomStart, getRoomFail, getRoomSuccess, clearRoom } =
  roomSlice.actions;
export default roomSlice.reducer;
