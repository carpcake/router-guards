import { auth } from "$lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "./auth-context";
import { AuthState } from "./types";

interface AuthProviderState extends AuthState {
  isLoading: boolean;
}

export const AuthProvider = (props: PropsWithChildren) => {
  const [state, setState] = useState<AuthProviderState>({
    user: null,
    isLoggedIn: false,
    isLoading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setState((prevState) => ({
        ...prevState,
        user: currentUser,
        isLoggedIn: !!currentUser,
        isLoading: false,
      }));
    });

    return () => unsubscribe();
  }, []);

  if (state.isLoading) {
    return null;
  }

  return <AuthContext.Provider value={{ ...state }}>{props.children}</AuthContext.Provider>;
};
