import { Container } from "@mui/material";

function MainContainer(props) {
	return (
		<Container
			sx={{
				backgroundColor: "#DFEBFF",
				mt: 5,
				boxShadow: 5,
				borderRadius: 2,
				pt: 2,
				pb: 1,
			}}
			maxWidth="xs"
		>{props.children}</Container>
	);
}

export default MainContainer;
