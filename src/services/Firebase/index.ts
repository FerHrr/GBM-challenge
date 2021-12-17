import { fbAuth } from "./firebase";
const logout = () => {
  fbAuth.signOut();
};

export { logout };
