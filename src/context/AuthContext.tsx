import React, { createContext, useCallback, ReactNode } from "react";

import usePersistedState from "../utils/usePersistedState";

interface SigninCredentials {
	username: string;
	password: string;
}

interface AuthContextData {
	currentLogged: boolean;
	signIn: (credentials: SigninCredentials) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface Props {
	children: ReactNode;
}

const AuthProvider: React.FC<Props> = (props: Props) => {
	const [isLogged, setIsLogged] = usePersistedState("isLogged", false);

	const signIn = useCallback(
		({ username, password }) => {
			if (username === "ismael" && password === "renard") {
				setIsLogged(true);
			}
		},
		[setIsLogged]
	);

	return (
		<AuthContext.Provider value={{ currentLogged: isLogged, signIn }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
