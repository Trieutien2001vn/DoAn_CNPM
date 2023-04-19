import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '~/redux/actions/auth.action';
import { axiosPrivate } from '~/utils/httpRequest';

function HomePage() {
  const dispatch = useDispatch();

  const handleGetDmvt = async () => {
    const resp = await axiosPrivate.post('/v1/danhmuc/dmvt/search');
    if (resp && resp.status === 200) {
      console.log(resp.data);
    }
  };

  return (
    <div>
      <h1>HomePage</h1>
      <button onClick={() => logoutUser(dispatch)}>Logout</button>
      <button onClick={handleGetDmvt}>Dmvt</button>
    </div>
  );
}

export default HomePage;
