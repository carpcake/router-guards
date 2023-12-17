import { Suspense, lazy } from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import { RouteGuard, RouteGuardPipe } from "./route-guard";
import { Layout } from "./layout";

type RouteGuardProvider =
  | "password"
  | "phone"
  | "google.com"
  | "facebook.com"
  | "twitter.com"
  | "github.com"
  | "apple.com"
  | "yahoo.com"
  | "hotmail.com";

// Pages
const HomePage = lazy(() => import("./pages/home"));
const LoginPage = lazy(() => import("./pages/login"));
const RegisterPage = lazy(() => import("./pages/register"));
const PasswordUserPage = lazy(() => import("./pages/password-user"));
const GoogleUserPage = lazy(() => import("./pages/google-user"));

// Route Guards
const isNotSignedIn: (redirectTo: string) => RouteGuardPipe =
  (redirectTo) =>
  async ({ isLoggedIn }) =>
    Promise.resolve(!isLoggedIn).then((is) => is || redirectTo);

const isSignedIn: (redirectTo: string) => RouteGuardPipe =
  (redirectTo) =>
  async ({ isLoggedIn }) =>
    Promise.resolve(isLoggedIn).then((is) => is || redirectTo);

const isProvider: (redirectTo: string, provider: RouteGuardProvider) => RouteGuardPipe =
  (redirectTo, provider) =>
  async ({ user }) => {
    return Promise.resolve(user?.providerData[0].providerId === provider).then((is) =>
      is ? true : redirectTo
    );
  };

const routes: RouteObject[] = [
  /**
   * Example of route that requires multiple guards such as:
   * - User must be signed in
   */
  {
    element: <Layout />,
    children: [
      {
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <RouteGuard canActivate={[isSignedIn("/login")]} />
          </Suspense>
        ),
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          /**
           * Example of route that requires multiple guards such as:
           * - User must be signed in (Parent Guard)
           * - User must be a Google user
           */
          {
            path: "google",
            element: <RouteGuard canActivate={[isProvider("/", "google.com")]} />,
            children: [{ index: true, element: <GoogleUserPage /> }],
          },
        ],
      },

      /**
       * Example of route that requires multiple guards such as:
       * - User must be signed in
       * - User must be a firebase user (i.e. password)
       */
      {
        path: "password",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <RouteGuard canActivate={[isSignedIn("/login"), isProvider("/", "password")]} />
          </Suspense>
        ),
        children: [{ index: true, element: <PasswordUserPage /> }],
      },

      /**
       * Example of route that only requires a single guard such as:
       * - User must not be signed in
       */
      {
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <RouteGuard canActivate={[isNotSignedIn("/")]} />
          </Suspense>
        ),
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
