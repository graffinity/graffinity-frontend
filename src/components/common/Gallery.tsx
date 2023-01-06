/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./Common.css";

interface GalleryComponentProps {
    img: string;
    location: string;
    title: string
    startDate: string;
    description: string;
}

export default function GalleryComponent(props: GalleryComponentProps) {
    return (
        <>
            <div className="WholeContainer">
                {/* Image part */}
                <div className="ImageContainer" >
                    <img className="CardImage" src={props.img} />
                </div>
                {/* Content part */}
                <div className="ContentContainer">
                    <h3 className="Title">{props.title}</h3> <br />
                    <h4 className="Location">{props.location}</h4> <br />
                    <h6 className="Date">{props.startDate}</h6> <br />
                    <p className="Description"> {props.description}</p>
                </div>
            </div>
        </>
    )
}