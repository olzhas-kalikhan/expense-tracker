import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  context: () => ({ getTitle: undefined }),
});

function Index() {
  return (
    <div className="p-2">
      <h3> Manage Your Expenses :)</h3>
    </div>
  );
}
