import Promo from './models/Promo.js';
import PromoRepository from './repositories/promo.repository.js';
import PromoService from './services/promo.service.js';
import PromoController from './controllers/promo.controller.js';
import createLogger from './logger/logger.js';

let logger, promoController;

export function buildPromoModule() {
  if(logger && promoController){
    return { promoController, logger };
  }

  logger = createLogger();

  const promoRepository = new PromoRepository(Promo, logger.child({ layer: 'repository' }));
  const promoService = new PromoService(promoRepository, logger.child({ layer: 'service' }));
  promoController = new PromoController(promoService, logger.child({ layer: 'controller' }));

  return { promoController, logger };
}
