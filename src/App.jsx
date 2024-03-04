import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import CheckAuth from "./components/CheckAuth";
import Login from "./components/Login";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import AuthUser from "./components/AuthUser";
import EmailVerify from "./components/EmailVerify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/verify/:id" element={<EmailVerify />} />
        <Route element={<CheckAuth />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<AuthUser />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
