import SwipeableTextMobileStepper from "components/common/ImageSlider";
import LikeButton from "components/common/LikeButton";
import React from "react";
import './GraffitiFulView.css'

export default function GraffitiFullView() {
    return (
        <div className="PeperStepper">
            <SwipeableTextMobileStepper />
            <LikeButton />
        </div>
    )
}