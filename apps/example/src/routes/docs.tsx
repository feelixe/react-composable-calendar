import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import { Container } from "../components/ui/container.tsx";
import "dayjs/locale/en-gb";
dayjs.locale("en-gb");

export const Route = createFileRoute("/docs")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Container className="grid gap-6 p-4">docs here</Container>;
}
