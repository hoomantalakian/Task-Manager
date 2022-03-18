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
//---------------------------------------

function App() {
	const [tasksData, setTasksData] = useState([]);
	const [reloadToggle, setReloadToggle] = useState(false);

	const ctxData = useContext(AuthContext);

	function reloadHandler() {
		setReloadToggle((prev) => !prev);
	}

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/tasks")
			.then((res) => {
				setTasksData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [reloadToggle]);

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
					</Fragment>
				</MainContainer>
			)}
		</main>
	);
}

export default App;
