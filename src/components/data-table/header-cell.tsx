import { useNavigate } from "@tanstack/react-router";
import {
  type SortDirection,
  type Header,
  flexRender,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "~/components/ui/button";

const getIcon = (isSorted: false | SortDirection) => {
  switch (isSorted) {
    case "asc":
      return <ArrowUp className="ml-2 h-4 w-4" />;
    case "desc":
      return <ArrowDown className="ml-2 h-4 w-4" />;
    default:
      return <ArrowDown className="invisible ml-2 h-4 w-4" />;
  }
};

export const HeaderCell = <TData, TValue>({
  column,
  getContext,
}: Header<TData, TValue>) => {
  const isSorted = column.getIsSorted();
  const navigate = useNavigate();

  return (
    <Button
      variant="link"
      className="px-0"
      onClick={() => {
        if (!column.getCanSort()) return;
        const defaultSort = { id: column.id, desc: false };

        navigate({
          to: ".",
          search: (prev) => {
            let newSort = prev.sort ? [...prev.sort] : undefined;
            if (!newSort) return { ...prev, sort: [defaultSort] };
            const index = newSort.findIndex(({ id }) => id === column.id);
            if (index === -1) {
              return {
                ...prev,
                sort: [defaultSort],
              };
            }

            if (newSort[index].desc === true) {
              newSort = newSort.filter((_, i) => i !== index);
              return { ...prev, sort: newSort };
            }

            newSort[index] = {
              id: column.id,
              desc: true,
            };

            return { ...prev, sort: newSort };
          },
        });
      }}
    >
      {flexRender(column.columnDef.header, getContext())}
      {getIcon(isSorted)}
    </Button>
  );
};
