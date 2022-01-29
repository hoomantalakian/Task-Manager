import { useState, createContext } from "react";

const AuthContext = createContext();

export function AuthContextProvider(props) {
	const [isLoggeIn, setIsLoggeIn] = useState(false);

	function loginHandler() {
		setIsLoggeIn(true);
	}
	function logoutHandler() {
		setIsLoggeIn(false);
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggeIn: isLoggeIn,
				onLogin: loginHandler,
				onLogout: logoutHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
