import { Joi } from "express-validation";

export default {
  login: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
  register: {
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
  updateProfile: {
    body: Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
    }),
  },
};
