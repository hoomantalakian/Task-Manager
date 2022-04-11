import "./app.css";
import axios from "axios";
import { useEffect, useState, useContext, Fragment } from "react";
//
import AuthPage from "./components/AuthPage";
import MainContainer from "./components/MainContainer";
import UserHeader from "./components/UserHeader";
import NewTask from "./components/NewTask";
import Tasks from "./components/Tasks";
import AuthContext from "./context/auth-context";
import { Link, Typography } from "@mui/material";
//---------------------------------------

function App() {
	const [tasksData, setTasksData] = useState([]);
	const [reloadToggle, setReloadToggle] = useState(false);

	const ctxData = useContext(AuthContext);

	function reloadHandler() {
		setReloadToggle((prev) => !prev);
	}

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem("userData"));
		if (storedData && storedData.token) {
			ctxData.onLogin(
				storedData.token,
				storedData.userId,
				storedData.username
			);
		}
	}, [ctxData]);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/tasks/${ctxData.userId}`)
			.then((res) => {
				setTasksData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [ctxData.userId, reloadToggle]);

	return (
		<main className="app">
			{!ctxData.isLoggedin && <AuthPage />}
			{ctxData.isLoggedin && (
				<Fragment>
					<MainContainer>
						<Fragment>
							<UserHeader />
							<NewTask reloadHandler={reloadHandler} />
							<Tasks
								tasksData={tasksData}
								reloadHandler={reloadHandler}
							/>
						</Fragment>
					</MainContainer>
					<Typography
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							marginTop: 20,
							color: "gray",
							fontSize: "small",
						}}
					>
						Made by &nbsp;
						<Link
							href="https://github.com/hoomantalakian"
							target="_blank"
						>
							Hooman Talakian
						</Link>
					</Typography>
				</Fragment>
			)}
		</main>
	);
}

export default App;
