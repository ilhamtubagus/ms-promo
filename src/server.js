import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';
import { buildPromoModule } from './container.js';

const { logger } = buildPromoModule();

const PORT = process.env.PORT || 3000;

try {
  await mongoose.connect(process.env.MONGODB_URI);
  logger.info('MongoDB connected');
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
} catch (err) {
  logger.error('MongoDB connection error:', err);
  process.exit(1);
}
