import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Registration from "./pages/Registration";
import PrivateRouter from "./routes/PrivateRouter";
import NotFound from "./pages/NotFound";
import ClientHistory from "./pages/ClientHistory";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
          <Route element={<PrivateRouter />}>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/historyClient" element={<ClientHistory/>}></Route>
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
