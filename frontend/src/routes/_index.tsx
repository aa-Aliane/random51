import { createFileRoute, Outlet } from "@tanstack/react-router";
import { MainLayout } from "../layouts";

const Index = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export const Route = createFileRoute("/_index")({
  component: Index,
});
