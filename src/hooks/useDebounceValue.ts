import { useEffect, useState } from "react";

export default function useDebounceValue(value: any, delay: number) {
    const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debounced
}