import express from 'express';
import { createValidator } from 'express-joi-validation';

import { buildPromoModule } from '../container.js';
import { promoSchema } from '../validators/promo.validator.js';

const router = express.Router();
const { promoController } = buildPromoModule();
const validator = createValidator({ passError: true });

router.get('/', promoController.getPromos);

router.post('/', validator.body(promoSchema), promoController.createPromo);

export default router;
