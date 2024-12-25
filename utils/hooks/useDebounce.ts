import React from "react";

export const useDebounce = (orgValue: string | undefined, timeout = 1000) => {
  const [debouncedValue, setDebouncedValue] = React.useState<string | undefined>(orgValue);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(orgValue);
    }, timeout);

    return () => {
      clearTimeout(handler);
    };
  }, [orgValue, timeout]);

  return debouncedValue;
};
