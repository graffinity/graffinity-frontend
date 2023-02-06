// export const initGeocoder = () => {
// 	const geocoder = new google.maps.Geocoder();
// 	return geocoder;
// };

export const getAddress = async (
	geocoder: google.maps.Geocoder,
	latitude: string,
	longitude: string
) => {
	const latlng = {
		lat: Number(+latitude),
		lng: Number(+longitude),
	};

	let result = await geocoder.geocode(
		{ location: latlng },
		(results, status) => {
			if (status === "OK" && results) {
				if (results[0]) {
					return results[0].formatted_address;
				}
			}
			return "No results found...";
		}
	);
	return result.results[0].formatted_address;
};

export const getCoordinates = async (
	geocoder: google.maps.Geocoder,
	address: string
) => {
	let result = await geocoder.geocode(
		{ address: address },
		(results, status) => {
			if (status === "OK" && results) {
				if (results[0]) {
					return results[0].geometry.location;
				}
			}
			return "No results found...";
		}
	);
	return result.results[0].geometry.location;
};
