import { createContext, forwardRef, type ComponentPropsWithoutRef } from "react";

const ReactComposableCalendarContext = createContext(null);


type RootProps = ComponentPropsWithoutRef<"div">;

export const Root = forwardRef<HTMLDivElement, RootProps>((props, ref) => {
  return (
    <div ref={ref}>
      123
    </div>
  );
})

