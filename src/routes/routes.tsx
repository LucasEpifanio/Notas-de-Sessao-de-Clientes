// src/routes/routes.tsx
import { Routes, Route } from "react-router-dom";
import ClientList from "../pages/ClientList";
import ClientDetails from "../pages/ClientDetails";
import AddClient from "../pages/AddClient";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clients" element={<ClientList />} />
      <Route path="/client/:id" element={<ClientDetails />} />
      <Route path="/add-client" element={<AddClient />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
