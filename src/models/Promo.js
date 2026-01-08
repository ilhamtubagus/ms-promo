import { PROMO_TYPE } from '../constants/index.js';

import mongoose from 'mongoose';

const promoSchema = new mongoose.Schema(
  {
      promoCode: {
          type: String,
          required: true,
          uppercase: true,
          index: true,
          unique: true,
      },
      title: {
          type: String,
          required: true,
      },
      type: {
          type: String,
          required: true,
          enum: Object.values(PROMO_TYPE),
      },
      expiryDate: {
          type: Date,
          required: true,
      },
      quota: {
          type: Number,
          required: true,
          min: 0,
      },
      tnc: {
          type: String,
          required: true,
      },
      benefit: {
          discountPercentage: {
              type: Number,
              min: 1,
              max: 100,
              required() {
                  return this.type === PROMO_TYPE.DISCOUNT || this.type === PROMO_TYPE.FIRST_USER;
              },
          },
          maxAmount: {
              type: Number,
              min: 1,
              required() {
                  return this.type === PROMO_TYPE.DISCOUNT || this.type === PROMO_TYPE.FIRST_USER;
              },
          },
          reductionAmount: {
              type: Number,
              min: 1,
              required() {
                  return this.type === PROMO_TYPE.AMOUNT_REDUCTION;
              },
          },
          freeShipping: {
              type: Boolean,
              default: false,
              required() {
                  return this.type === PROMO_TYPE.FREE_SHIPPING;
              },
          },
      },
  },
  {
      timestamps: true,
  },
);

promoSchema.pre('validate', async function () {
  if (this.type === PROMO_TYPE.FREE_SHIPPING) {
    this.benefit = { freeShipping: true };
  }
});

export default mongoose.model('Promo', promoSchema);