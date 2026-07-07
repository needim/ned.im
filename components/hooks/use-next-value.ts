function useNextValue<T>(values: T[], currentValue: T): T {
	const currentIndex = values.indexOf(currentValue);
	const nextIndex = (currentIndex + 1) % values.length;

	return values[nextIndex] as T;
}

export default useNextValue;
