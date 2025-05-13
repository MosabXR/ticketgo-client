import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/admin/Sidebar";
const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
