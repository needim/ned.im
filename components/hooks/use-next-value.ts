import { useMemo } from "react";

function useNextValue<T>(values: T[], currentValue: T): T {
	return useMemo((): T => {
		const currentIndex = values.indexOf(currentValue);
		const nextIndex = (currentIndex + 1) % values.length;
		return values[nextIndex] as T;
	}, [values, currentValue]);
}

export default useNextValue;
