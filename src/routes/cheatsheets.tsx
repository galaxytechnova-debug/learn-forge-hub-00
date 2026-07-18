import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/cheatsheets")({ component: () => <Outlet /> });
