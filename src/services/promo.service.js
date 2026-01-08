class PromoService {
  constructor(promoRepository, logger) {
    this.promoRepository = promoRepository;
    this.logger = logger;
  }

  async getPromos(){
    return this.promoRepository.findPromos();
  }

  async createPromo(data) {
    this.logger.info(
      { promoCode: data.promoCode, type: data.type },
      '[PromoService] Validating promo',
    );

    if (new Date(data.expiryDate) <= new Date()) {
      this.logger.warn('[PromoService] Invalid expiry date');

      throw new Error('Expiry date must be in the future');
    }

    return this.promoRepository.insertPromo(data);
  }
}

export default PromoService;
