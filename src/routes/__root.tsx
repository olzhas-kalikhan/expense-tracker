import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Breadcrumbs from "~/components/breadcrumbs";
import Navigation from "~/components/navigation";
import { Toaster } from "~/components/ui/toaster";

interface RouterContext {
  getTitle?: () => string;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  context: () => ({
    getTitle: () => "Home",
  }),
  component: () => (
    <>
      <div className="mx-auto grid h-full grid-cols-12 grid-rows-[min-content_1fr] content-stretch">
        <div className="row col-span-12 flex h-16 w-full items-center border-b px-4">
          <h2 className="text-2xl"> Expense Tracker</h2>
        </div>
        <Navigation className="col-span-1 min-w-20 lg:col-span-2" />
        <div className="col-span-8 grow p-4">
          <Breadcrumbs className="pb-4 pt-2" />
          <Outlet />
        </div>
      </div>
      <Toaster />
      <TanStackRouterDevtools />
    </>
  ),
});
