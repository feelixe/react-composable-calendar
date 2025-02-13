import { cloneElement, forwardRef, isValidElement } from "react";

type AnyProps = Record<string, any>;

export function mergeReactProps(parentProps: AnyProps, childProps: AnyProps) {
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const parentPropValue = parentProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (childPropValue && parentPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          childPropValue?.(...args);
          parentPropValue?.(...args);
        };
      } else if (parentPropValue) {
        overrideProps[propName] = parentPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...parentPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [parentPropValue, childPropValue]
        .filter(Boolean)
        .join(" ");
    }
  }

  return { ...parentProps, ...overrideProps };
}

function setRef<TInstance>(ref: React.Ref<TInstance>, instance: TInstance) {
  if (ref instanceof Function) {
    ref(instance);
  } else if (ref != null) {
    (ref as React.MutableRefObject<TInstance>).current = instance;
  }
}

export function combinedRef<TInstance>(refs: React.Ref<TInstance>[]) {
  return (instance: TInstance | null) => {
    for (const ref of refs) {
      setRef(ref, instance);
    }
  };
}

type SlotProps = {
  children?: React.ReactNode;
};

export const Slot = forwardRef<HTMLElement, SlotProps>(
  (props, forwardedRef) => {
    const { children, ...slotProps } = props;

    if (!isValidElement(children)) {
      return null;
    }
    return cloneElement(children, {
      ...mergeReactProps(slotProps, children.props as AnyProps),
      ref: combinedRef([forwardedRef, (children as any).ref]),
    } as any);
  }
);
