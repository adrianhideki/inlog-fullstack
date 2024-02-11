import React, { memo } from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { Wrapper } from "@googlemaps/react-wrapper";
import GoogleMap from "./GoogleMap";
import styles from "./styles";

type MapProps = {
  onClick?: (e: google.maps.MapMouseEvent) => void;
  center: google.maps.LatLngLiteral;
  zoom?: number;
} & Omit<BoxProps, "onClick">;

const Map = memo<MapProps>(({ children, center, zoom, onClick, ...props }) => {
  return (
    <Box {...props}>
      <div style={{ display: "flex", height: "100%", width: "100%" }}>
        <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? ""}>
          <GoogleMap
            center={center}
            onClick={onClick}
            zoom={zoom ?? 1}
            style={styles}
            streetViewControl={false}
            mapTypeControl={false}
          >
            {children}
          </GoogleMap>
        </Wrapper>
      </div>
    </Box>
  );
});

export default Map;
