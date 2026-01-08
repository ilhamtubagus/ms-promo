import express from 'express';
import promoRoutes from './routes/promo.routes.js';
import { buildPromoModule } from './container.js';
import createHttpLogger from './logger/httpLogger.js';
import { setupSwagger } from './swagger/swagger.js';
import { errorMiddleware } from './middleware/error.middleware.js';

const app = express();
const { logger } = buildPromoModule();

app.use(express.json());
app.use(createHttpLogger(logger));

app.use('/promos', promoRoutes);


setupSwagger(app);
app.use(errorMiddleware(logger));

export default app;
