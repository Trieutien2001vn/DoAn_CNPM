import {
  loginStart,
  loginFail,
  loginSuccess,
  logoutSuccess,
} from '../reducrers/auth.reducer';
import { axiosPublic } from '~/utils/httpRequest';

// login user
const loginUser = async (dispatch, navigate, user, alertSnackbar) => {
  try {
    dispatch(loginStart());
    const resp = await axiosPublic.post(`/v1/xacThuc/dangNhap`, user);
    if (resp && resp.status === 200) {
      dispatch(loginSuccess(resp.data));
      navigate('/');
    }
  } catch (error) {
    dispatch(loginFail());
    alertSnackbar('error', error?.response?.data?.message);
  }
};
// logout user
const logoutUser = (dispatch) => {
  dispatch(logoutSuccess());
};

export { loginUser, logoutUser };
