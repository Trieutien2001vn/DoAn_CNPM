import React from "react";
import { Routes, Route } from "react-router-dom";
import { privateRoutes, restrictedRoutes } from "./routes";

function App() {
  // const [, setSocket] = useSocketContext();
  // useEffect(() => {
  //   const socketClient = io("http://localhost:8081");
  //   if (socketClient) {
  //     socketClient.on("connect", () => {
  //       console.log(`${socketClient.id} connected`);
  //     });
  //     socketClient.on("disconnect", () => {
  //       console.log(`${socketClient.id} disconnected`);
  //     });
  //     setSocket(socketClient);
  //   }
  //   return () => {
  //     socketClient.disconnect();
  //     setSocket(null);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <>
      <Routes>
        {restrictedRoutes.map((route) => (
          <Route key={route.id} path={route.path} element={route.page} />
        ))}
        {privateRoutes.map((route) => (
          <Route key={route.id} path={route.path} element={route.page} />
        ))}
      </Routes>
    </>
  );
}

export default App;
