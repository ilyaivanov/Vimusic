import { useEffect, useState } from "react";

export const useKeyboard = (
  handleEvent: (event: DocumentEventMap["keydown"]) => void,
  deps?: {}[]
) => {
  return useEffect(() => {
    window.document.addEventListener("keydown", handleEvent);
    return () => {
      window.document.removeEventListener("keydown", handleEvent);
    };
  }, deps);
};

export function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
