import Joi from "joi";

export const schema = Joi.object({
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
});
