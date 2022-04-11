import React, { useState, Fragment } from "react";
//
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
//-----------------------------------------

const boxStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	minWidth: 270,
	maxWidth: 380,
	bgcolor: "#f1f6fe",
	padding: 4,
	textAlign: "center",
	borderRadius: 2,
};
const titleStyle = {
	color: "burlywood",
	margin: "-10px 0 15px",
	fontWeight: "bold"
};

//

function AuthPage() {
	const [isLoginMode, setIsLoginMode] = useState(true);
	const [isSignpMode, setIsSignpMode] = useState(false);

	function loginModeHandler() {
		setIsLoginMode(true);
		setIsSignpMode(false);
	}
	function signpModeHandler() {
		setIsSignpMode(true);
		setIsLoginMode(false);
	}

	return (
		<Fragment>
			{isLoginMode && (
				<LoginPage
					signpModeHandler={signpModeHandler}
					boxStyle={boxStyle}
					titleStyle={titleStyle}
				/>
			)}
			{isSignpMode && (
				<SignupPage
					loginModeHandler={loginModeHandler}
					boxStyle={boxStyle}
					titleStyle={titleStyle}
				/>
			)}
		</Fragment>
	);
}

export default AuthPage;
