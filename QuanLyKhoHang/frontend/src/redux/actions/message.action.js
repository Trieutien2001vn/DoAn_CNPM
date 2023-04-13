import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import {
  getMessageFail,
  getMessageStart,
  getMessageSuccess,
} from "../reducrers/message.reducer";

const getMessageOfRoom = async (dispatch, idRoom, accessToken) => {
  try {
    dispatch(getMessageStart());
    const resp = await axios.get(`${BASE_URL}/messages/${idRoom}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    if (resp && resp.status === 200) {
      dispatch(getMessageSuccess(resp?.data?.messages));
    }
  } catch (error) {
    dispatch(getMessageFail());
    console.log(error);
  }
};

export { getMessageOfRoom };
