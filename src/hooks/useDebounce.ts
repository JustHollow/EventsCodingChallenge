import { debounce, DebounceSettings } from "lodash";
import { useCallback } from "react";

type useDebounceProps = {
    delay: number;
    debounceSettings: DebounceSettings;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDebounce = <Fn extends (...args: any[]) => any>(
    fn: Fn,
    { delay = 300, debounceSettings }: Partial<useDebounceProps> = {},
    dep: unknown[] = []
) => {
    const debouncedFn = useCallback(debounce(fn, delay, debounceSettings), dep);
    return debouncedFn;
};

export default useDebounce;
