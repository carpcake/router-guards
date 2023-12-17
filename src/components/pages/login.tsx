import { GoogleButton } from "$components/google-button";
import { auth } from "$lib/firebase";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const Page = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error instanceof FirebaseError ? error.message : "Unknown error");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" />
        </p>

        <p>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </p>

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>

      <hr />

      <GoogleButton />
    </div>
  );
};

export default Page;
