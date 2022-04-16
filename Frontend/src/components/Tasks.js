import { Box } from "@mui/material";
//
import Task from "./Task";
//----------------------------

function Tasks(props) {
	return (
		<Box sx={{ mt: 2 }}>
			{props.tasksData.map((task) => {
				return (
					<Task
						reloadHandler={props.reloadHandler}
						key={task._id}
						id={task._id}
						title={task.title}
						description={task.description}
					/>
				);
			})}
		</Box>
	);
}

export default Tasks;
