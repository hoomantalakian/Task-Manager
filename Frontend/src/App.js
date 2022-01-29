// import { Container } from "@mui/material";
import "./app.css";
//
import MainContainer from "./components/MainContainer";
import UserHeader from "./components/UserHeader";
import NewTask from "./components/NewTask";
import Tasks from "./components/Tasks";
//

const DummyData = [
	{
		id: "t1",
		title: "buy fruit",
		description:
			"banana, apple, potato, grapes, lemons, orangesand, watermelon, peach, pineapple and ...",
	},
	{
		id: "t2",
		title: "pharmacy",
		description: "codein, adult cold, novafen",
	},
	{
		id: "t3",
		title: "home",
		description: "working piano with mom",
	}
];

function App() {
	return (
		<main className="app">
			<MainContainer >
				<UserHeader />
				<NewTask />
				<Tasks DummyData={DummyData} />
			</MainContainer>
		</main>
	);
}

export default App;
