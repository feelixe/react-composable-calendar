import { useCallback, useEffect, useMemo, useState } from "react";

export type Listener = () => void;

export class Atom<T> {
  private value: T;
  private _listeners: Set<Listener> = new Set();

  constructor(value: T) {
    this.value = value;
  }

  public get() {
    return this.value;
  }

  public set(value: T) {
    if (Object.is(this.value, value)) {
      return;
    }
    this.value = value;
    this.notify();
  }

  public get listeners() {
    return this._listeners;
  }

  private notify() {
    for (const listener of this.listeners.values()) {
      listener();
    }
  }

  public subscribe(listener: Listener) {
    this.listeners.add(listener);
  }

  public unsubscribe(listener: Listener) {
    this.listeners.delete(listener);
  }
}

export function atom<T>(value: T) {
  return new Atom<T>(value);
}

export function useAtom<T>(atom: Atom<T>) {
  const [internalValue, setInternalValue] = useState(atom.get());

  useEffect(() => {
    const listener = () => {
      setInternalValue(atom.get());
    };

    atom.subscribe(listener);

    return () => {
      atom.unsubscribe(listener);
    };
  }, [atom]);

  const setValue = useCallback(
    (newValue: T) => {
      atom.set(newValue);
    },
    [atom]
  );

  return [internalValue, setValue] as const;
}

export function useAtomComputed<T, R>(atom: Atom<T>, fn: (atomState: T) => R) {
  const [internalValue, setInternalValue] = useState(fn(atom.get()));

  useEffect(() => {
    const listener = () => {
      setInternalValue(fn(atom.get()));
    };

    atom.subscribe(listener);

    return () => {
      atom.unsubscribe(listener);
    };
  }, [atom, fn]);

  return internalValue;
}
