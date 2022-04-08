import { useState, createContext } from "react";

const AuthContext = createContext();

export function AuthContextProvider(props) {
	const [token, setToken] = useState(false);
	const [displayName, setDisplayName] = useState("User");

	function authLoginHandler(token) {
		setToken(token);
		localStorage.setItem("userData", JSON.stringify({ token }));
	}
	function AuthLogoutHandler() {
		setToken(null);
		localStorage.removeItem("userData");
		localStorage.removeItem("username");
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedin: !!token,
				token,
				displayName,
				setDisplayName,
				onLogin: authLoginHandler,
				onLogout: AuthLogoutHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
