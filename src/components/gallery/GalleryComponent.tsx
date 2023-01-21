import GraffitiResponse from "models/graffiti/GraffitiResponse";
import "./Gallery.css";

interface GalleryComponentProps {
	graffiti: GraffitiResponse;
}

export default function GalleryComponent(props: GalleryComponentProps) {
	const { graffiti } = props;
	return (
		<>
			<div className="WholeContainer">
				<div className="ImageContainer">
					{graffiti.photos.map((photo) => (
						<img className="CardImage" src={photo.url} alt="GraffitiImage" />
					))}
				</div>

				<div className="ContentContainer">
					{/* <h3 className="Title">{graffiti.name}</h3> <br />
					<h4 className="Location">{props.location}</h4> <br />
					<h6 className="Date">{props.startDate}</h6> <br />
					<p className="Description"> {props.description}</p> */}
				</div>
			</div>
		</>
	);
}
