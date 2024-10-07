import { Link, useRouterState } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import React from "react";

export default function Breadcrumbs({ className }: { className?: string }) {
  const matches = useRouterState({ select: (s) => s.matches });

  const breadcrumbs = matches
    .map(({ pathname, context, search }) => {
      return {
        title: context.getTitle?.(),
        path: pathname,
        search,
      };
    })
    .filter(({ title }) => title);

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {breadcrumbs.map(({ title, path, search }, i) => {
          if (!title) return null;
          return (
            <React.Fragment key={path}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={path} search={search}>
                    {title}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {i !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
