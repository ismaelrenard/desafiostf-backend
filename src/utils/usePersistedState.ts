import { useState, useEffect } from "react";

const usePersistedState = (keyState: string, initialState: any) => {
	const [state, setState] = useState(() => {
		const storageValue = localStorage.getItem(keyState);

		if (storageValue) {
			return JSON.parse(storageValue);
		} else {
			return initialState;
		}
	});

	useEffect(() => {
		localStorage.setItem(keyState, JSON.stringify(state));
	}, [keyState, state]);

	return [state, setState];
};

export default usePersistedState;
