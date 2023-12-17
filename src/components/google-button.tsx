import { auth } from "$lib/firebase";
import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const GoogleButton = () => {
  const handleClick = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert(error instanceof FirebaseError ? error.message : "Unknown error");
    }
  };

  return <button onClick={handleClick}>Continue with Google</button>;
};
