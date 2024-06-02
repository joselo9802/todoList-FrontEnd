import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import endPoints from "@services/api";
import axios from "../../api/axios";

const ProtectionRoutes = () => {
  const [error, setError] = useState(false);
  const userLogged = localStorage.getItem("user");
  useEffect(() => {
    async function validateUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        setError(true);
      }
      try {
        const userValidation = await axios.get(
          endPoints.auth.verifyUser,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!userValidation.data) {
          setError(true);
        }
        if (userValidation.data) {
          localStorage.setItem(
            "user",
            JSON.stringify(userValidation.data.body.body)
          );
        }
      } catch (error) {
        setError(true);
      }
    }

    validateUser();
  }, []);

  if (error) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
  return userLogged ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectionRoutes;
