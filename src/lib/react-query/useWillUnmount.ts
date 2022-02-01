import { useEffect, useRef } from "react";

export function useWillUnmount(fn: () => void) {
  // the ref makes it so the fn doesn't have to be a dependency in the useEffect
  const fnRef = useRef(fn);

  // make sure the ref is updated if the fn is updated
  fnRef.current = fn;

  useEffect(() => () => fnRef.current(), []);

  const isMountedRef = useRef(true);
  useEffect(
    () => () => {
      isMountedRef.current = false;
    },
    [],
  );
  return { isMountedRef };
}
