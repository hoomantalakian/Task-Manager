import { useContext } from "react";
//
import { Typography, Box, Button } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AuthContext from "../context/auth-context";
//----------------------------------------

function UserHeader() {
	const ctxData = useContext(AuthContext);
	return (
		<Box
			sx={{
				color: "text.secondary",
				mb: 1,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<AccountBoxIcon color="primary" fontSize="large" />
				<Typography
					sx={{ ml: 0.5 }}
					style={{fontWeight: "bold"}}
					display="inline-block"
				>
					{ctxData.username}
				</Typography>
			</Box>
			<Button
				onClick={ctxData.onLogout}
				size="large"
				style={{ textTransform: "none", padding: 4, color: "gray", textDecoration:"underline" }}
			>
				Log out
			</Button>
		</Box>
	);
}

export default UserHeader;
