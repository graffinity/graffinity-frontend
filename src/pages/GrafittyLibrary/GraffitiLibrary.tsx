import React from "react";
import './GrafittiLibrary.css'
import LibraryComponent from 'components/common/Gallery'
import data from 'components/common/imagesTesting';
export default function GraffitiLibrary() {
    const card = data.map(item => {
        return (
            <LibraryComponent
                img={item.imageUrl}
                location={item.location}
                title={item.title}
                startDate={item.startDate}
                description={item.description}
            />
        )
    })
    return (
        <div className="GridContainer">
            {card}
        </div>
    )
}