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
// import { CircularProgress } from "@mui/material";
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
				<MainContainer>
					<Fragment>
						<UserHeader />
						<NewTask reloadHandler={reloadHandler} />
						<Tasks
							tasksData={tasksData}
							reloadHandler={reloadHandler}
						/>
						{/* {isLoading && (
							<CircularProgress
								style={{
									position: "absolute",
									left: "47%",
									top: "35%",
								}}
								color="primary"
							/>
						)} */}
					</Fragment>
				</MainContainer>
			)}
		</main>
	);
}

export default App;
