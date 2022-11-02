import { Typography } from "@mui/material";
import GraffitiPostAPI from "api/GraffitiPostAPI";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import { useEffect, useState } from "react";

const Sandbox = () => {
	const [graffitiPosts, setGraffitiPosts] = useState<GraffitiResponse[]>();
	useEffect(() => {
		getGraffitiPosts();
	}, []);

	const getGraffitiPosts = async () => {
		let response = await GraffitiPostAPI.findAll();
		setGraffitiPosts(response);
		console.log(response);
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				padding: "24px",
				background: "#FFFFFF",
				width: "100%",
				height: "100%",
				gap: "8px",
			}}>
			{graffitiPosts &&
				graffitiPosts.length > 0 &&
				graffitiPosts.map((graffiti) => (
					<div key={graffiti.id}>
						<Typography>{graffiti.id}</Typography>
						<Typography>{graffiti.name}</Typography>
						<Typography>{graffiti.description}</Typography>
						<Typography>{graffiti.location}</Typography>
						<Typography>
							{graffiti.creationDate?.toString()}
						</Typography>
					</div>
				))}
		</div>
	);
};

export default Sandbox;
