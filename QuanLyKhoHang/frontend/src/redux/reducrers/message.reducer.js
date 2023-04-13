import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    list: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    getMessageStart(state) {
      state.isFetching = true;
    },
    getMessageFail(state) {
      state.isFetching = false;
      state.error = true;
    },
    getMessageSuccess(state, action) {
      state.isFetching = false;
      state.error = false;
      state.list = state.list
        ? [...action.payload.reverse(), ...state.list]
        : action.payload.reverse();
    },
    pushOneMessage(state, action) {
      state.list.push(action.payload);
    },
    clearMessage(state) {
      state.list = null;
    },
  },
});

export const {
  getMessageStart,
  getMessageFail,
  getMessageSuccess,
  pushOneMessage,
  clearMessage,
} = messageSlice.actions;
export default messageSlice.reducer;
