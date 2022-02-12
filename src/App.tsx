import React from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components";
import { Login, Signup, Home } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path={"/"}
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
