import { Typography } from "@mui/material";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import moment from "moment";
import React from "react";

interface DescriptionProps {
	graffiti: GraffitiResponse;
}

export default function Description(props: DescriptionProps) {
	const { graffiti } = props;
	// function GetAddress() {
	//     var lat = (graffiti.latitude);
	//     var lng = graffiti.longitude;
	//     var latlng = new google.maps.LatLng(lat, lng);
	//     let geocoder = new google.maps.Geocoder();
	//     geocoder.geocode({ "latLng": latlng},
	//         function (results: any, status) {
	//             if (status == google.maps.GeocoderStatus.OK) {
	//                 if (results[1]) {
	//                     alert("Location: " + results[1].formatted_address);
	//                 }
	//             }
	//         });
	// }
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				width: "100%",
				marginTop: "64px",
				marginRight: "16px",
				border: "1px solid #FFFFFF",
				boxSizing: "border-box",
				borderRadius: "16px",
			}}
		>
			<Typography
				variant="h2"
				style={{
					color: "white",
					marginBottom: "16px",
					marginTop: "16px",
				}}
			>
				Name of the Graffiti:{graffiti.name}
			</Typography>
			<Typography
				variant="h3"
				style={{
					color: "white",
					marginBottom: "16px",
					marginTop: "16px",
				}}
			>
				{graffiti.address}
			</Typography>

			<Typography
				variant="h4"
				style={{
					color: "white",
					marginBottom: "16px",
					marginTop: "16px",
				}}
			>
				{graffiti.description}
			</Typography>
			<Typography
				variant="h5"
				style={{
					color: "white",
					marginBottom: "16px",
					marginTop: "16px",
				}}
			>
				Created At:{moment(graffiti.creationDate).format("YYYY/MM/DD")}
			</Typography>
		</div>
	);
}
