import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Stack,
} from "@chakra-ui/react";
import Map from "../../../Components/Map";
import { useState } from "react";
import Marker from "../../../Components/Map/Marker";

type ModalMapaProps = {
  onConfirm: (coordenadas: google.maps.LatLng) => void;
} & Omit<ModalProps, "children">;

const ModalMapa = ({ onConfirm, onClose, ...props }: ModalMapaProps) => {
  const [coordenadas, setCoordenadas] = useState<google.maps.LatLng>();

  const handleClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setCoordenadas(e.latLng);
    }
  };

  const handleConfirm = () => {
    if (coordenadas) {
      onConfirm(coordenadas);
    }
    onClose();
  };

  return (
    <Modal onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <Map
              height="60vh"
              center={{ lat: 0, lng: 0 }}
              zoom={2}
              onClick={handleClick}
            >
              {!!coordenadas && <Marker position={coordenadas} />}
            </Map>
            <Button disabled={!coordenadas} onClick={handleConfirm}>
              Confirmar
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalMapa;
