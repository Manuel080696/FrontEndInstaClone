import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

function Root() {
  return (
    <div id="root">
      <Header />
      <Outlet />
    </div>
  );
}

export default Root;
