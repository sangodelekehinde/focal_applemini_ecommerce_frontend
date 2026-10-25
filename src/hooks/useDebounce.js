// useDebounce.js
// Gives back a value that only updates after the user stops changing it

import { useState, useEffect } from "react";

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Start a timer. When it ends, update the delayed value
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    // If the user types again, cancel the old timer and start over
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
