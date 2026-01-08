import Joi from 'joi';
import j2s from 'joi-to-swagger';
import { PROMO_TYPE } from '../constants/index.js';

export const promoSchema = Joi.object({
  promoCode: Joi.string().required().uppercase().example('DISC10'),
  title: Joi.string().required().example('10% Discount'),
  type: Joi.string()
    .valid(PROMO_TYPE.DISCOUNT, PROMO_TYPE.AMOUNT_REDUCTION, PROMO_TYPE.FIRST_USER, PROMO_TYPE.FREE_SHIPPING)
    .required()
    .example('DISCOUNT'),
  expiryDate: Joi.date().iso().required().example('2026-01-31T00:00:00.000Z'),
  quota: Joi.number().integer().min(0).required().example(100),
  tnc: Joi.string().required().example('Max discount applies'),
  benefit: Joi.object({
    discountPercentage: Joi.when('type', {
      is: Joi.valid(PROMO_TYPE.DISCOUNT, PROMO_TYPE.FIRST_USER),
      then: Joi.number().min(1).max(100).required(),
    }),
    maxAmount: Joi.when('type', {
      is: Joi.valid(PROMO_TYPE.DISCOUNT, PROMO_TYPE.FIRST_USER),
      then: Joi.number().min(1).required(),
    }),
    reductionAmount: Joi.when('type', {
      is: PROMO_TYPE.AMOUNT_REDUCTION,
      then: Joi.number().min(1).required(),
    }),
    freeShipping: Joi.when('type', {
      is: PROMO_TYPE.FREE_SHIPPING,
      then: Joi.boolean().required(),
    }),
    minimumAmount: Joi.number().min(1).optional(),
  }).required(),
});

export const { swagger: promoSwagger } = j2s(promoSchema);