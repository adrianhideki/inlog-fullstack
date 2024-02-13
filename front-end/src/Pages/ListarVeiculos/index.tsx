import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import haversine from "haversine-distance";
import { Button, Stack } from "@chakra-ui/react";
import Page from "../../Components/Page";
import DataGrid from "./Components/DataGrid";
import { DataGridColumnProps } from "./Components/DataGrid/Types";
import Map from "../../Components/Map";
import Marker from "../../Components/Map/Marker";
import { veiculoServiceInstance } from "../../Services/VeiculoService";

const ListarVeiculos = () => {
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const [zoom, setZoom] = useState<number>(2);

  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 0,
    longitude: 0,
  });
  const api = veiculoServiceInstance;
  const { data, isLoading } = useQuery("listar-veiculos", api.getVeiculos);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  const veiculos = useMemo(() => {
    const list =
      data?.data.map((v) => ({
        ...v.coordenada,
        id: v.id,
        chassi: v.chassi,
        placa: v.placa,
        cor: v.cor,
        descricaoVeiculo: v.tipoVeiculo === 1 ? "Onibus" : "Caminhão",
        distancia: haversine(currentLocation, v.coordenada) / 1000,
      })) ?? [];

    return list?.sort((a, b) => a.distancia - b.distancia);
  }, [data?.data, currentLocation]);

  useEffect(() => {
    if (veiculos.length === 0) {
      return;
    }

    setCenter({
      lat: veiculos[0].latitude,
      lng: veiculos[0].longitude,
    });

    setZoom(4);
  }, [veiculos]);

  const columns: DataGridColumnProps[] = useMemo(
    () => [
      {
        id: "chassi",
        name: "Chassi",
      },
      {
        id: "descricaoVeiculo",
        name: "Tipo do Veículo",
      },
      {
        id: "cor",
        name: "Cor",
      },
      {
        id: "placa",
        name: "Placa",
      },
      {
        id: "distancia",
        name: "Distância em KM",
      },
      {
        id: "ver-no-mapa",
        name: "",
        handleRender: (data) => {
          const handleClick = () => {
            setCenter({
              lat: Number(data["latitude"]),
              lng: Number(data["longitude"]),
            });

            setZoom(4);
          };

          return (
            <Button variant="text" onClick={handleClick}>
              Ver no mapa
            </Button>
          );
        },
      },
    ],
    [setCenter, setZoom]
  );

  return (
    <Page title="Veículos">
      <Stack spacing={2}>
        <Map
          center={center}
          zoom={zoom}
          width="100%"
          height="50vh"
          borderRadius={2}
        >
          <Marker
            position={{
              lat: currentLocation.latitude,
              lng: currentLocation.longitude,
            }}
            icon="/images/home.svg"
            title={"Sua Localização"}
            clickable={true}
          />
          {data?.data.map((x) => (
            <Marker
              key={x.id}
              icon={`images/${x.tipoVeiculo === 1 ? "bus" : "truck"}.svg`}
              position={{
                lat: x.coordenada.latitude,
                lng: x.coordenada.longitude,
              }}
              title={`Chassi: ${x.chassi}`}
            />
          ))}
        </Map>
        <DataGrid
          keyColumn="id"
          columns={columns}
          data={veiculos}
          isLoading={isLoading}
        />
      </Stack>
    </Page>
  );
};

export default ListarVeiculos;
