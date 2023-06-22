import { useContext } from "react";
import { EditProfile } from "../components/EditProfile";
import { AuthContext } from "../context/AuthContext";

export const EditProfilePage = () => {
  const { token } = useContext(AuthContext);

  return <EditProfile token={token} />;
};
