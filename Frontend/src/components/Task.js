import { Box, Typography, ButtonGroup, Button } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
//

function Task(props) {
	return (
		<Box
			sx={{
				backgroundColor: "",
				mb: 1.5,
				boxShadow: 4,
				borderRadius: 2,
				p: 1,
			}}
			maxWidth="xs"
		>
			<Typography px={1} variant="h6">
				{props.title}
			</Typography>
			<Typography px={1} variant="body2">
				{props.description}
			</Typography>
			<Box sx={{ textAlign: "center", mt: 1.5 }}>
				<ButtonGroup variant="text" fullWidth>
					<Button startIcon={<ModeEditIcon />}>Edit</Button>
					<Button startIcon={<DeleteIcon />}>Delete</Button>
				</ButtonGroup>
			</Box>
		</Box>
	);
}

export default Task;
