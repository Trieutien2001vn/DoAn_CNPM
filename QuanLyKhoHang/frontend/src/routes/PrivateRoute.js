import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// function PrivateRoute({ children }) {
//   const { user } = useSelector((state) => state.auth.login);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!user) navigate("/login");
//   }, [user, navigate]);
//   return <>{children}</>;
// }

// export default PrivateRoute;

export default function privateRoute(Component) {
  const PrivateRoute = (props) => {
    const { user } = useSelector((state) => state.auth.login);
    const navigate = useNavigate();
    useEffect(() => {
      if (!user) navigate("/login");
    }, [user, navigate]);
    return <Component {...props} />;
  };
  return PrivateRoute;
}
