import { useState, createContext } from "react";

const AuthContext = createContext();

export function AuthContextProvider(props) {
	const [token, setToken] = useState(false);
	const [userId, setUserId] = useState("");
	const [username, setUsername] = useState("");

	function authLoginHandler(token, userId, username) {
		setToken(token);
		setUserId(userId);
		setUsername(username);
		localStorage.setItem(
			"userData",
			JSON.stringify({ token, userId, username })
		);
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
				userId,
				username,
				onLogin: authLoginHandler,
				onLogout: AuthLogoutHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
