import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import HomeView from "./view";

interface Props {}

const HomePage: React.FC<Props> = () => {
  const url = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const { pathname } = url;

    if (user.logged) {
      if (
        user.rol === "User" &&
        (pathname === "ReactiveAccess" || pathname === "RoleAccess")
      ) {
        navigate("/Home");
      }
      if (user.rol === "Administrator" && pathname === "RoleAccess") {
        navigate("/Home");
      }
    } else if (
      pathname === "Analytics" ||
      pathname === "ReactiveAccess" ||
      pathname === "RoleAccess" ||
      pathname === "Profile"
    ) {
      navigate("/Home");
    }
  }, [url, user]);

  return (
    <div>
      <HomeView />
    </div>
  );
};

export default HomePage;
