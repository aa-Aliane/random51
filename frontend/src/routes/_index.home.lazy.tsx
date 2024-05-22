import { createLazyFileRoute } from "@tanstack/react-router";
import { Home } from "../pages/home";

const Index = () => {
  return (
    <div className="p-2">
      <Home />
    </div>
  );
};

export const Route = createLazyFileRoute("/_index/home")({
  component: Index,
});
