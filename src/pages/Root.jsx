import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ModalLogin } from "../components/ModalLogin";

function Root() {
  return (
    <div id="root">
      <Header />
      <ModalLogin />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Root;
