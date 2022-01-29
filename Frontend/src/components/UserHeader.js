import { Typography, Box } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
//

function UserHeader() {
	return (
		<Box
			sx={{
				color: "text.secondary",
				mb: 1,
				display: "flex",
				alignItems: "center",
			}}
		>
			<AccountBoxIcon color="primary" fontSize="large" />
			<Typography sx={{ ml: 0.5 }} variant="body1">
				Username
			</Typography>
		</Box>
	);
}

export default UserHeader;
