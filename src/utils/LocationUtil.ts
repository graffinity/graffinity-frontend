export const initGeocoder = () => {
	const geocoder = new google.maps.Geocoder();
	return geocoder;
};

export const getAddress = async (latitude: string, longitude: string) => {
	const geocoder = initGeocoder();

	const latlng = {
		lat: Number(latitude),
		lng: Number(longitude),
	};

	let result = await geocoder.geocode(
		{ location: latlng },
		(results, status) => {
			if (status === "OK" && results) {
				if (results[0]) {
					console.log(results[0].formatted_address);
					return results[0].formatted_address;
				}
			}
			return "No results found...";
		}
	);
	console.log("result", result);
	return result.results[0].formatted_address;
};

export const getCoordinates = async (address: string) => {
	const geocoder = initGeocoder();

	let result = await geocoder.geocode(
		{ address: address },
		(results, status) => {
			if (status === "OK" && results) {
				if (results[0]) {
					console.log(results[0].geometry.location);
					return results[0].geometry.location;
				}
			}
			return "No results found...";
		}
	);
	console.log("result", result);
	return result.results[0].geometry.location;
};
