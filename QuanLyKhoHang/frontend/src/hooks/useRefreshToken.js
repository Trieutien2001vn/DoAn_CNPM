import useToken from './useToken';

const { useSelector, useDispatch } = require('react-redux');
const { updateToken } = require('~/redux/reducrers/auth.reducer');
const { axiosPublic } = require('~/utils/httpRequest');

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.user);
  const { refreshToken } = useToken();
  const refresh = async () => {
    try {
      const resp = await axiosPublic.post('/v1/xacThuc/lamMoi', {
        email: user.user.email,
        refreshToken,
      });
      if (resp && resp.status === 200) {
        dispatch(updateToken(resp.data));
        return resp.data.accessToken;
      }
    } catch (error) {
      return null;
    }
  };
  return refresh;
};
export default useRefreshToken;
