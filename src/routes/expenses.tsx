import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/expenses")({
  component: RouteComponent,
  context() {
    return { getTitle: () => "Expenses" };
  },
});

export function RouteComponent() {
  return <Outlet />;
}
