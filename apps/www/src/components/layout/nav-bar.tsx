import {
  CalendarDaysIcon,
  ExternalLinkIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Container } from "../ui/container.tsx";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "../ui/drawer.tsx";
import type { RouteOptions, Route } from "astro-typesafe-routes/path";
import Link from "astro-typesafe-routes/link/react";

type MenuItem = {
  id: number;
  label: ReactNode;
  link: RouteOptions<Route>;
};

const menuItems: MenuItem[] = [
  {
    id: 0,
    label: "Examples",
    link: { to: "/" },
  },
  {
    id: 1,
    label: "Documentation",
    link: { to: "/" },
  },
  {
    id: 2,
    label: "GitHub",
    link: { to: "/" },
  },
  {
    id: 3,
    label: "npm",
    link: { to: "/" },
  },
];

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full border-border border-b bg-background">
      <Container className="flex items-center gap-2 py-5">
        <Link to="/" className="flex items-center gap-2">
          <CalendarDaysIcon />
          <div className="font-medium text-sm">React Composable Calendar</div>
        </Link>
        <div className="grow" />
        <Drawer open={menuOpen} onOpenChange={setMenuOpen} direction="right">
          <DrawerTrigger asChild>
            <Button size="icon" variant="ghost">
              <MenuIcon />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="flex min-w-64 max-w-xs flex-col items-center gap-2 p-4">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                asChild
                variant="ghost"
                className="w-full"
                onClick={() => setMenuOpen(false)}
              >
                {typeof item.link === "string" ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLinkIcon className="size-4" />
                    {item.label}
                  </a>
                ) : (
                  <Link {...item.link}>{item.label}</Link>
                )}
              </Button>
            ))}
            <div className="grow" />
            <DrawerClose>
              <Button size="icon" variant="outline">
                <XIcon />
              </Button>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      </Container>
    </div>
  );
}
