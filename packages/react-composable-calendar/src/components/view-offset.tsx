import { useMemo, type ComponentProps } from "react";
import { useViewState } from "../hooks.js";
import { ViewContext, type ViewContextValue } from "../contexts/view.js";

export type ViewOffsetProps = ComponentProps<"div"> & {
  offset: number;
};
export function ViewOffset(props: ViewOffsetProps) {
  const { children, offset, ...rest } = props;

  const [view, setView] = useViewState();

  const offsetViewValue = useMemo<ViewContextValue>(
    () => ({
      viewState: [view.add({ months: offset }), setView],
    }),
    [view, setView, offset]
  );

  return (
    <div {...rest}>
      <ViewContext.Provider value={offsetViewValue}>
        {children}
      </ViewContext.Provider>
    </div>
  );
}
