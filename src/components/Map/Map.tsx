/* eslint-disable @typescript-eslint/no-unused-vars */
import { width } from "@mui/system";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React, { useState } from "react";
import './map.css';



const center = {
    lat: 54.730012,
    lng: 25.262638,
};

const center2 = {
    lat: 25.262648,
    lng: 54.730012,
};

export default function Map() {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "api_key_placeholder",
    });


    const [map, setMap] = useState<google.maps.Map | null>(null);

    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(
        map: google.maps.Map
    ) {
        setMap(null);
    },
        []);

    return (


        <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
        }} >
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "16px",
                    marginBottom: "16px",
                    marginRight: "32px",
                }}>
                {isLoaded ? (
                    <GoogleMap
                        mapContainerClassName="map"
                        center={center}
                        zoom={10}
                        onLoad={onLoad}
                        onUnmount={onUnmount}>

                        <Marker position={center2} />
                        <Marker position={center} />
                    </GoogleMap>
                ) : (
                    <></>
                )}
            </div>
        </div >
    );
}

