import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import {
  getRoomFail,
  getRoomStart,
  getRoomSuccess,
} from "../reducrers/room.reducer";

const getRooms = async (dispatch, accessToken) => {
  try {
    dispatch(getRoomStart());
    const resp = await axios.get(`${BASE_URL}/rooms/user`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    if (resp && resp.status === 200) {
      dispatch(getRoomSuccess(resp.data));
    }
  } catch (error) {
    dispatch(getRoomFail());
    console.log(error);
  }
};
export { getRooms };
