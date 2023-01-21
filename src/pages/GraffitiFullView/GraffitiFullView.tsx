import SwipeableTextMobileStepper from "components/common/ImageSlider";
import LikeButton from "components/common/LikeButton";
import "./GraffitiFulView.css";

export default function GraffitiFullView() {
	// const getPictures = async () => {
	// 	if (id) {
	// 		const graffiti = await GraffitiPostAPI.findById(+id);
	// 	}
	// };

	return (
		<div className="PeperStepper">
			<SwipeableTextMobileStepper />
			<div className="Button">
				<LikeButton />
			</div>
		</div>
	);
}
