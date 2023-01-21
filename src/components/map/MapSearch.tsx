interface MapSearchProps {
	panTo: (coords: google.maps.LatLngLiteral) => void;
}

const MapSearch = (props: MapSearchProps) => {
	// const { panTo } = props;
	// const { init } = usePlacesAutocomplete({
	// 	initOnMount: false, // Disable initializing when the component mounts, default is true
	//   });

	// const {
	// 	ready,
	// 	value,
	// 	suggestions: { status, data },
	// 	setValue,
	// 	clearSuggestions,
	// } = usePlacesAutocomplete({
	// 	requestOptions: {
	// 		// location: { lat: () => 43.6532, lng: () => -79.3832 },
	// 		radius: 100 * 1000,
	// 	},
	// });

	// https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

	// const handleInput = (e: { target: { value: string } }) => {
	// 	setValue(e.target.value);
	// };

	// const handleSelect = async (address: string) => {
	// 	setValue(address, false);
	// 	clearSuggestions();

	// 	try {
	// 		let results = await getGeocode({ address });
	// 		let coords = getLatLng(results[0]);
	// 		panTo(coords);
	// 	} catch (error) {
	// 		console.log("😱 Error: ", error);
	// 	}
	// };
	return <div></div>;

	// return (
	// 	<div className='search'>
	// 		<Combobox onSelect={handleSelect}>
	// 			<ComboboxInput
	// 				value={value}
	// 				onChange={handleInput}
	// 				disabled={!ready}
	// 				placeholder='Search your location'
	// 			/>
	// 			<ComboboxPopover>
	// 				<ComboboxList>
	// 					{status === "OK" &&
	// 						data.map(({ id, description }) => (
	// 							<ComboboxOption key={id} value={description} />
	// 						))}
	// 				</ComboboxList>
	// 			</ComboboxPopover>
	// 		</Combobox>
	// 	</div>
	// );
};

export default MapSearch;
