import { useState, createContext } from "react";

const AuthContext = createContext();

export function AuthContextProvider(props) {
	const [token, setToken] = useState(false);

	function loginHandler(token) {
		setToken(token);
		localStorage.setItem("userData", JSON.stringify({ token }));
	}
	function logoutHandler() {
		setToken(null);
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedin: !!token,
				token: token,
				onLogin: loginHandler,
				onLogout: logoutHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
