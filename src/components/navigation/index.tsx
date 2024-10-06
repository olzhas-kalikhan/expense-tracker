import { Link } from "@tanstack/react-router";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";

export default function Navigation({ className }: { className?: string }) {
  return (
    <nav
      className={cn(
        "flex flex-col items-start gap-2 border-r px-2 pt-8",
        className,
      )}
    >
      <Button asChild variant="link" size="lg">
        <Link to="/" className="text-lg [&.active]:font-bold">
          Home
        </Link>
      </Button>
      <Button asChild variant="link" size="lg">
        <Link to="/expenses" className="text-lg [&.active]:font-bold">
          Expenses
        </Link>
      </Button>
    </nav>
  );
}
