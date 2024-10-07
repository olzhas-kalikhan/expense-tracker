import { Link } from "@tanstack/react-router";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";

export default function Navigation({ className }: { className?: string }) {
  //TODO: make responsive
  return (
    <nav
      className={cn(
        "flex flex-col items-start gap-2 border-r px-2 pt-8",
        className,
      )}
    >
      <Button asChild variant="link" size="lg">
        <Link to="/" className="text-xl [&.active]:font-bold">
          Home
        </Link>
      </Button>
      <Button asChild variant="link" size="lg">
        <Link to="/expenses" className="text-xl [&.active]:font-bold">
          Expenses
        </Link>
      </Button>
      <Button asChild variant="link" size="lg">
        <Link to="/expenses/new" className="text-xl [&.active]:font-bold">
          New Expense
        </Link>
      </Button>
    </nav>
  );
}
