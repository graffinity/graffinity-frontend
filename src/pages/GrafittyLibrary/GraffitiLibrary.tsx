import LibraryComponent from "components/common/Gallery";
import data from "components/common/imagesTesting";
import "./GrafittiLibrary.css";
const GraffitiLibrary = () => {
	return (
		<div className="GridContainer">
			{data.map((item) => (
				<LibraryComponent
					img={item.imageUrl}
					location={item.location}
					title={item.title}
					startDate={item.startDate}
					description={item.description}
				/>
			))}
		</div>
	);
};

export default GraffitiLibrary;
