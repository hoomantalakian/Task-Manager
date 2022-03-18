import { useState, createContext } from "react";

const AuthContext = createContext();

export function AuthContextProvider(props) {
	const [isLoggedin, setIsLoggedin] = useState(false);

	function loginHandler() {
		setIsLoggedin(true);
	}
	function logoutHandler() {
		setIsLoggedin(false);
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedin,
				onLogin: loginHandler,
				onLogout: logoutHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
