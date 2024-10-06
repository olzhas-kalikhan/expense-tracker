import { useRouterState } from "@tanstack/react-router";
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
    .map(({ pathname, context }) => {
      return {
        title: context.getTitle?.(),
        path: pathname,
      };
    })
    .filter(({ title }) => title);

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {breadcrumbs.map(({ title, path }, i) => {
          if (!title) return null;
          return (
            <React.Fragment key={path}>
              <BreadcrumbItem>
                <BreadcrumbLink href={path}>{title}</BreadcrumbLink>
              </BreadcrumbItem>
              {i !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
