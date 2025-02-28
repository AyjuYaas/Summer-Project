import { Navigate } from "react-router-dom";

import { JSX } from "react";

interface Prop {
  isAllowed: boolean | null;
  redirectTo: string;
  children: JSX.Element;
}

export default function ProtectedRoute({
  isAllowed,
  redirectTo,
  children,
}: Prop): JSX.Element {
  if (!isAllowed) {
    return (
      <Navigate to={redirectTo} state={{ message: "Please Login First" }} />
    );
  }
  return children;
}
