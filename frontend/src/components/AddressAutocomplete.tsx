import React, { useRef } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const libraries: "places"[] = ["places"];

interface Props {
  onSelect: (data: {
    address: string;
    lat?: number;
    lng?: number;
    details?: any;
  }) => void;
}

const AddressAutocomplete: React.FC<Props> = ({ onSelect }) => {
  const autocompleteRef = useRef<any>(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.formatted_address) {
      onSelect({
        address: place.formatted_address,
        lat: place.geometry?.location?.lat(),
        lng: place.geometry?.location?.lng(),
        details: place,
      });
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
      loadingElement={<div>Loading...</div>}
    >
      <Autocomplete
        onLoad={(auto) => (autocompleteRef.current = auto)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          placeholder="Enter address"
          className="sp-address__input"
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 8,
            border: "1px solid #e1e6ea",
          }}
        />
      </Autocomplete>
    </LoadScript>
  );
};

export default AddressAutocomplete;
