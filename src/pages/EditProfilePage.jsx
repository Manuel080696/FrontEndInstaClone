import { useContext } from "react";
import { EditProfile } from "../components/EditProfile";
import { AuthContext } from "../context/AuthContext";
import "./AllPage.css";

export const EditProfilePage = () => {
  const { token } = useContext(AuthContext);

  return (
    <section className="page-Principal juistify">
      <EditProfile token={token} />
    </section>
  );
};
