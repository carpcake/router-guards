import { auth } from "$lib/firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "./auth";

export const LogoutButton = () => {
  const { isLoggedIn } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return isLoggedIn ? <button onClick={handleLogout}>Logout</button> : null;
};
