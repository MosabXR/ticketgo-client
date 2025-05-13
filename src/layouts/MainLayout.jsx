import { Outlet } from "react-router-dom";
import DefaultNavbar from "../components/layout/DefaultNavbar";
import Footer from "../components/layout/Footer";
const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col gap-8">
      <DefaultNavbar />
      <div className="container flex flex-col gap-8 flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
