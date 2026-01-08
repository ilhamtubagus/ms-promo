import express from 'express';
import promoRoutes from './routes/promo.routes.js';
import { buildPromoModule } from './container.js';
import createHttpLogger from './logger/httpLogger.js';

const app = express();
const { logger } = buildPromoModule();

app.use(express.json());
app.use(createHttpLogger(logger));

app.use('/promos', promoRoutes);

export default app;
