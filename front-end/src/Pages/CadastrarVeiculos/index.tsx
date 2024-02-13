import React, { useState } from "react";
import Page from "../../Components/Page";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Grid,
  GridItem,
  IconButton,
  Input,
  Select,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Formik } from "formik";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { VeiculoValues } from "./Types";
import { valdationSchema } from "./validationSchema";
import ModalMapa from "./ModalMapa";
import { veiculoServiceInstance } from "../../Services/VeiculoService";

const CadastrarVeiculos = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { mutate } = useMutation({
    mutationFn: veiculoServiceInstance.setVeiculo,
    onError: (error: AxiosError) => {
      setError(error.message);
    },
    onSuccess: () => {
      setSuccess("Veículo cadastrado com sucesso!");
    },
  });

  const { onOpen, isOpen, onClose } = useDisclosure();

  const handleSubmit = (values: VeiculoValues) => {
    setSuccess("");
    setError("");

    mutate({
      chassi: values.chassi,
      cor: values.cor,
      placa: values.placa,
      tipoVeiculo: Number(values.tipo ?? 1),
      coordenada: {
        latitude: Number(values.latitude ?? 0),
        longitude: Number(values.longitude ?? 0),
      },
    });
  };

  return (
    <Page title="Cadastrar Veículos">
      <Formik<VeiculoValues>
        initialValues={{
          chassi: "",
          placa: "",
          cor: "",
          latitude: "",
          longitude: "",
        }}
        initialErrors={{}}
        onSubmit={handleSubmit}
        validationSchema={valdationSchema}
      >
        {({
          handleSubmit,
          handleReset,
          getFieldProps,
          setFieldValue,
          errors,
        }) => (
          <form onSubmit={handleSubmit}>
            <Stack>
              <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                <GridItem justifyContent={"center"} colSpan={1}>
                  <Text>Chassi</Text>
                </GridItem>
                <GridItem colSpan={11}>
                  <Input
                    {...getFieldProps("chassi")}
                    type="text"
                    maxLength={20}
                    placeholder="Chassi"
                    isInvalid={!!errors["chassi"]}
                  />
                  {!!errors["chassi"] && (
                    <Text fontSize="sm" color="red">
                      {errors["chassi"]}
                    </Text>
                  )}
                </GridItem>
                <GridItem justifyContent={"center"} colSpan={1}>
                  <Text>Placa</Text>
                </GridItem>
                <GridItem colSpan={11}>
                  <Input
                    {...getFieldProps("placa")}
                    type="text"
                    maxLength={9}
                    placeholder="Placa"
                    isInvalid={!!errors["placa"]}
                  />
                  {!!errors["placa"] && (
                    <Text fontSize="sm" color="red">
                      {errors["placa"]}
                    </Text>
                  )}
                </GridItem>
                <GridItem justifyContent={"center"} colSpan={1}>
                  <Text>Tipo</Text>
                </GridItem>
                <GridItem colSpan={11}>
                  <Select
                    {...getFieldProps("tipo")}
                    isInvalid={!!errors["tipo"]}
                    placeholder="Tipo do Veículo"
                    data-testid="tipo-veiculo"
                  >
                    <option value="1">Ônibus</option>
                    <option value="2">Caminhão</option>
                  </Select>
                  {!!errors["tipo"] && (
                    <Text fontSize="sm" color="red">
                      {errors["tipo"]}
                    </Text>
                  )}
                </GridItem>
                <GridItem justifyContent={"center"} colSpan={1}>
                  <Text>Cor</Text>
                </GridItem>
                <GridItem justifyContent={"center"} colSpan={11}>
                  <Input
                    {...getFieldProps("cor")}
                    isInvalid={!!errors["cor"]}
                    type="text"
                    maxLength={20}
                    placeholder="Cor"
                  />
                  {!!errors["cor"] && (
                    <Text fontSize="sm" color="red">
                      {errors["cor"]}
                    </Text>
                  )}
                </GridItem>
                <GridItem justifyContent={"center"} colSpan={1}>
                  <Text>Coordenadas</Text>
                </GridItem>
                <GridItem justifyContent={"center"} colSpan={11}>
                  <Stack direction={"row"} spacing={1}>
                    <Input
                      {...getFieldProps("latitude")}
                      type="number"
                      placeholder="Latitude"
                      isInvalid={!!errors["latitude"]}
                    />
                    <Input
                      {...getFieldProps("longitude")}
                      type="number"
                      placeholder="Longitude"
                      isInvalid={!!errors["longitude"]}
                    />
                    <IconButton
                      aria-label="Selecionar Coordenadas"
                      icon={<SearchIcon />}
                      onClick={onOpen}
                    />
                  </Stack>
                  {(!!errors["latitude"] || !!errors["longitude"]) && (
                    <Text fontSize="sm" color="red">
                      {errors["latitude"] || errors["longitude"]}
                    </Text>
                  )}
                </GridItem>
                <GridItem justifyContent={"center"} colSpan={12}>
                  <Stack direction={"row"} spacing={1} justifyContent={"end"}>
                    <Button variant="text" onClick={handleReset}>
                      Cancelar
                    </Button>
                    <Button type="submit">Confirmar</Button>
                  </Stack>
                </GridItem>
              </Grid>
              {!!error && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Erro ao cadastrar o veículo</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {!!success && (
                <Alert status="success">
                  <AlertIcon />
                  <AlertTitle>Sucesso</AlertTitle>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
            </Stack>
            <ModalMapa
              size="4xl"
              isOpen={isOpen}
              onClose={onClose}
              onConfirm={(e) => {
                setFieldValue("latitude", e.lat());
                setFieldValue("longitude", e.lng());
              }}
            />
          </form>
        )}
      </Formik>
    </Page>
  );
};

export default CadastrarVeiculos;
