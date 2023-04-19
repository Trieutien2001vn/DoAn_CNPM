import React from "react";
import { Routes, Route } from "react-router-dom";
import { privateRoutes, restrictedRoutes } from "./routes";

function App() {
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
