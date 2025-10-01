import React, { useRef } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const libraries: "places"[] = ["places"];

interface Props {
  onSelect?: (data: {
    address: string;
    lat?: number;
    lng?: number;
    details?: any;
  }) => void;
  value?: string;
  onChange?: (address: string) => void;
  placeholder?: string;
}

const AddressAutocomplete: React.FC<Props> = ({ onSelect, value, onChange, placeholder = "Enter address" }) => {
  const autocompleteRef = useRef<any>(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.formatted_address) {
      const address = place.formatted_address;
      if (onChange) onChange(address);
      if (onSelect) {
        onSelect({
          address,
          lat: place.geometry?.location?.lat(),
          lng: place.geometry?.location?.lng(),
          details: place,
        });
      }
    }
  };

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <LoadScript
        googleMapsApiKey={apiKey}
        libraries={libraries}
        loadingElement={<div style={{ padding: "10px" }}>Loading address search...</div>}
        preventGoogleFontsLoading={true}
        onError={() => {
          // Suppress misleading "can't load Google Maps" errors for Places API only usage
          console.warn("Google Maps API loaded with warnings - this is normal for address autocomplete");
        }}
      >
        <Autocomplete
          onLoad={(auto) => (autocompleteRef.current = auto)}
          onPlaceChanged={handlePlaceChanged}
          options={{
            componentRestrictions: { country: "us" },
            fields: ["formatted_address", "geometry"],
          }}
        >
          <input
            type="text"
            placeholder={placeholder}
            value={value || ""}
            onChange={(e) => onChange?.(e.target.value)}
            className="sp-wizard-input"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #e1e6ea",
              fontSize: "1rem",
              boxSizing: "border-box",
              backgroundColor: "#fff",
            }}
            autoComplete="off"
          />
        </Autocomplete>
      </LoadScript>
    </div>
  );
};

export default AddressAutocomplete;
