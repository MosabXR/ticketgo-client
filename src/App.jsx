import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Events from "./pages/admin/Events";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/user/Home";
import Tickets from "./pages/user/Tickets";
import Event from "./pages/user/Event";
import SignUp from "./pages/user/SignUp";
import Ticket from "./pages/user/Ticket";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/event/:id" element={<Event />} />
          <Route path="/ticket/:id" element={<Ticket />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/*" element={<Dashboard />} />
          <Route path="/admin/events" element={<Events />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
