import Joi from "joi";
import { IFormRegister } from ".";

export const schema = Joi.object<IFormRegister>({
  name: Joi.string().required().messages({
    "string.empty": "Campo obrigatório",
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
