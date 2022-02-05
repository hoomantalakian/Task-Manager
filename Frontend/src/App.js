// import { Container } from "@mui/material";
import "./app.css";
//
import MainContainer from "./components/MainContainer";
import UserHeader from "./components/UserHeader";
import NewTask from "./components/NewTask";
import Tasks from "./components/Tasks";
import { useEffect, useState } from "react";
import axios from "axios";
//

function App() {
	const [tasksData, setTasksData] = useState([]);
	const [reloadToggle, setReloadToggle] = useState(false);

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

	// console.log(tasksData);

	return (
		<main className="app">
			<MainContainer>
				<UserHeader />
				<NewTask reloadHandler={reloadHandler} />
				<Tasks tasksData={tasksData} reloadHandler={reloadHandler} />
			</MainContainer>
		</main>
	);
}

export default App;
