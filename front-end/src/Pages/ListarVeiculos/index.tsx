import React, { useCallback } from "react";
import { useQuery } from "react-query";
import { Heading, Spinner } from "@chakra-ui/react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { TriangleDownIcon } from "@chakra-ui/icons";
import Page from "../../Components/Page";
import { useApi } from "../../Hooks/useApi";
import {
  IVeiculoService,
  VEICULO_SERVICE_NAME,
  veiculoServiceInstance,
} from "../../Services/VeiculoService";
import { OutVeiculo } from "../../Services/VeiculoService/Models/OutVeiculo";

const displayMapContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "400px",
  top: 0,
  left: 0,
};

const ListarVeiculos = () => {
  const [, setMap] = React.useState<google.maps.Map>();

  const api = veiculoServiceInstance;
  const { data } = useQuery("listar-veiculos", api.getVeiculos);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "",
  });

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds({
      lat: -25.43247,
      lng: -49.27845,
    });

    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(undefined);
  }, []);

  console.log(data);

  return (
    <Page>
      <Heading size="md">Listar Veículos</Heading>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={displayMapContainerStyle}
          zoom={4}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      ) : (
        <Spinner />
      )}
    </Page>
  );
};

export default ListarVeiculos;
