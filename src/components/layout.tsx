import { Link, Outlet } from "react-router-dom";
import { LogoutButton } from "./logout-button";

const links = [
  { label: "Home", to: "/" },
  { label: "Login", to: "/login" },
  { label: "Register", to: "/register" },
  { label: "Google User", to: "/google" },
  { label: "Password User", to: "/password" },
];

export const Layout = () => {
  return (
    <div>
      <header>
        <nav className="nav">
          <ul>
            {links.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}

            <LogoutButton />
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};
