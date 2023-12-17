import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthState, useAuth } from "./auth";

export type RouteGuardPipe = (authState: AuthState) => Promise<boolean | string>;

interface RouteGuardProps {
  canActivate: RouteGuardPipe[];
}

export const RouteGuard = ({ canActivate }: RouteGuardProps) => {
  const [canActivateRoute, setCanActivateRoute] = useState<boolean | string>();
  const authState = useAuth();

  useEffect(() => {
    const checkCanActivate = async () => {
      try {
        const results = await Promise.all(canActivate.map((guard) => guard(authState)));
        const redirectPath = results.find((result) => result !== true);
        return redirectPath === undefined ? true : redirectPath;
      } catch (error) {
        return "/error";
      }
    };

    checkCanActivate().then((result) => setCanActivateRoute(result));
  }, [authState, canActivate]);

  return typeof canActivateRoute === "boolean" && canActivateRoute ? (
    <Outlet />
  ) : (
    <Navigate to={canActivateRoute as string} />
  );
};
