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

function AuthPage() {
	const [isLoginMode, setIsLoginMode] = useState(true);
	const [isSignpMode, setIsSignpMode] = useState(false);

	return (
		<Fragment>
			{isLoginMode && <LoginPage boxStyle={boxStyle} />}
			{isSignpMode && <SignupPage boxStyle={boxStyle} />}
		</Fragment>
	);
}

export default AuthPage;
