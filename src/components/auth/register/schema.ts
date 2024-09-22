import Joi from "joi";
import { IRegisterRequest } from "./services/types";

export const schema = Joi.object<IRegisterRequest>({
  name: Joi.string().min(5).required().messages({
    "string.empty": "Campo obrigatório",
    "string.min": "O nome deve ter no mínimo 5 letras",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Campo obrigatório",
      "string.email": "Email inválido",
    }),
  password: Joi.string().min(6).required().messages({
    "string.min": "A senha deve ter pelo menos 6 digitos",
    "string.empty": "Campo obrigatório",
  }),
  passwordConfirmation: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Senhas diferentes",
      "string.empty": "Campo obrigatório",
    }),
});
