import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/interview-questions")({ component: () => <Outlet /> });
