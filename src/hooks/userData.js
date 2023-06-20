import { useState, useEffect } from "react";
import { getUserDataService } from "../services";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useUserData = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");
  const nullRute = `${import.meta.env.VITE_APP_BACKEND}/uploads/avatar/null`;

  useEffect(() => {
    const getUserAvatar = async (id) => {
      try {
        const data = await getUserDataService(id);

        const ruta = `${import.meta.env.VITE_APP_BACKEND}/uploads/avatar/${
          data.userData[0].avatar
        }`;

        setAvatar(ruta);
        setUserData(data);
      } catch (error) {
        setError(error.message);
      }
    };
    user ? getUserAvatar(user.id) : null;
  }, [user]);

  return { nullRute, avatar, userData, error };
};
