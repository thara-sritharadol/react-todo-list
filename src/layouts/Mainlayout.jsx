import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Outlet } from "react-router-dom"; // Outlet component to render nested routes

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import { Slide } from "react-toastify";

const Mainlayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className="px-4 md:px-6 pt-12 pb-24 w-full xl:w-[45%] space-y-6">
          <Outlet />
        </div>
      </main>

      <Footer />
      <ToastContainer transition={Slide} />
    </>
  );
};

export default Mainlayout;
