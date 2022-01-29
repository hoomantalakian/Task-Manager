import { Box } from "@mui/material";
//
import Task from "./Task";
//

function Tasks(props) {
	return (
		<Box
			sx={{
				mt: 2,
			}}
		>
			{props.DummyData.map((task) => {
				return (
					<Task
						key={task.id}
						title={task.title}
						description={task.description}
					/>
				);
			})}
		</Box>
	);
}

export default Tasks;
