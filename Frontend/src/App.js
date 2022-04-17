import "./app.css";
import axios from "axios";
import React, {
	Suspense,
	useEffect,
	useState,
	useContext,
	Fragment,
} from "react";
//
import { CircularProgress, Link, Typography } from "@mui/material";

import AuthContext from "./context/auth-context";
import MainContainer from "./components/MainContainer";
// import AuthPage from "./components/AuthPage";
// import UserHeader from "./components/UserHeader";
// import NewTask from "./components/NewTask";
// import Tasks from "./components/Tasks";
//
const AuthPage = React.lazy(() => import("./components/AuthPage"));
const UserHeader = React.lazy(() => import("./components/UserHeader"));
const NewTask = React.lazy(() => import("./components/NewTask"));
const Tasks = React.lazy(() => import("./components/Tasks"));

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

	/// get task
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_URL}/tasks/${ctxData.userId}`)
			.then((res) => {
				setTasksData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [ctxData.userId, reloadToggle]);

	return (
		<main className="app">
			<Suspense
				fallback={
					<CircularProgress
						style={{ display: "block", margin: "40% auto" }}
						color="success"
					/>
				}
			>
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
						<div
							style={{
								display: "flex",
								justifyContent: "center",
							}}
						>
							<Typography
								style={{
									backgroundColor: "rgba(0, 0, 0, 0.4)",
									marginTop: 20,
									color: "gray",
									fontSize: "small",
									padding: "3px 7px",
									borderRadius: "5px",
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
						</div>
					</Fragment>
				)}
			</Suspense>
		</main>
	);
}

export default App;
