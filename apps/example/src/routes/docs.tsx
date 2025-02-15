import { createFileRoute } from "@tanstack/react-router";
import { Container } from "../components/ui/container.tsx";
import { InstallationStep } from "../docs/parts/installation.tsx";
import { ComponentsStep } from "../docs/parts/components.tsx";

export const Route = createFileRoute("/docs")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container className="grid gap-8 py-8">
      <InstallationStep />
      <ComponentsStep />
    </Container>
  );
}
