import React from "react";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";

interface Props {
  onSelect: (data: {
    address: string;
    lat?: number;
    lng?: number;
    details?: any;
  }) => void;
}

const AddressAutocomplete: React.FC<Props> = ({ onSelect }) => {
  return (
    <GooglePlacesAutocomplete
      apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      selectProps={{
        placeholder: "Enter address",
        classNamePrefix: "sp-address",
        menuPortalTarget: document.body, // makes menu popups render at body for z-index
        menuPosition: "fixed",
        onChange: async (val: any) => {
          if (val && val.value && val.value.place_id) {
            const results = await geocodeByPlaceId(val.value.place_id);
            const result = results[0];
            let lat, lng;
            if (result.geometry && result.geometry.location) {
              lat = result.geometry.location.lat();
              lng = result.geometry.location.lng();
            }
            onSelect({
              address: val.label,
              lat,
              lng,
              details: result,
            });
          }
        },
      }}
    />
  );
};

export default AddressAutocomplete;
