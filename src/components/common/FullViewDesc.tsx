import { Typography } from "@mui/material";
import { useJsApiLoader } from "@react-google-maps/api";
import googleDefaultConfig from "constants/googleDefaultConfig";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getAddress } from "utils/LocationUtil";
interface DescriptionProps {
    graffiti: GraffitiResponse;
}

export default function Description(props: DescriptionProps) {
    const { graffiti } = props;
    const google = window.google;

    let { isLoaded } = useJsApiLoader({ ...googleDefaultConfig });
    const [address, setAddress] = useState<string>();

    async function getGraffitiAddress() {
        const lat = graffiti.latitude.toString();
        const lng = graffiti.longitude.toString();
        const geoCoder = new google.maps.Geocoder();
        let address = await getAddress(geoCoder, lat, lng);
        setAddress(address);
    }

    useEffect(() => {

        getGraffitiAddress();
    }, [google]);

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
            {address && (
                <Typography
                    variant="h3"
                    style={{
                        color: "white",
                        marginBottom: "16px",
                        marginTop: "16px",
                    }}
                >
                    {address}
                </Typography>
            )}

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
