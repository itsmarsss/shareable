import { useAuth } from "../authProvider";
import "./style.css";

const Nav = () => {
  const auth = useAuth();
  const user = auth.user;

  return <nav>{user?.displayName || "no display name. " + auth}</nav>;
};

export default Nav;
