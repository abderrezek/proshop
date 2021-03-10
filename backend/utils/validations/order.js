import { Joi } from "express-validation";

export default {
  add: {
    body: Joi.object({
      orderItems: Joi.array().items(Joi.object()).required(),
      shippingAddress: Joi.object().required(),
      paymentMethod: Joi.string().required(),
      itemsPrice: Joi.string().required(),
      shippingPrice: Joi.string().required(),
      taxPrice: Joi.string().required(),
      totalPrice: Joi.string().required(),
    }),
  },
};
