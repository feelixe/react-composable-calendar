import { CalendarDaysIcon, MenuIcon } from "lucide-react";
import { Button } from "../ui/button.tsx";
import { Container } from "../ui/container.tsx";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer.tsx";

export function NavBar() {
  return (
    <div className="sticky top-0 z-50 w-full border-border border-b bg-background">
      <Container className="flex items-center gap-2 py-5">
        <CalendarDaysIcon />
        <div className="font-medium text-sm">React Composable Calendar</div>
        <div className="grow" />
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button size="icon" variant="ghost">
              <MenuIcon />
            </Button>
          </DrawerTrigger>
          <DrawerContent>hej!</DrawerContent>
        </Drawer>
      </Container>
    </div>
  );
}
