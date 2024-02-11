import * as yup from "yup";

const valdationSchema = yup.object().shape({
  chassi: yup
    .string()
    .min(10, "Deve ter no mínimo 10 caracteres!")
    .max(20, "Deve ter no máximo 10 caracteres!")
    .required("Obrigatório"),
  placa: yup
    .string()
    .min(7, "Deve ter no mínimo 7 caracteres!")
    .max(9, "Deve ter no máximo 9 caracteres!")
    .required("Obrigatório"),
  cor: yup.string().required("Obrigatório"),
  tipo: yup.number().equals([1, 2]).required("Selecione um tipo válido"),
  latitude: yup.number().required("Obrigatório"),
  longitude: yup.number().required("Obrigatório"),
});

export { valdationSchema };
