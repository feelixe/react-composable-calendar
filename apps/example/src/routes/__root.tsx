import { Outlet, createRootRoute } from "@tanstack/react-router";
import * as React from "react";
import { NavBar } from "../components/layout/nav-bar.tsx";
import { Toaster } from "../components/ui/sonner.tsx";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <NavBar />
      <Outlet />
      <Toaster />
    </React.Fragment>
  );
}
