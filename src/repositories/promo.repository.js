class PromoRepository {
  constructor(PromoModel, logger) {
    this.Promo = PromoModel;
    this.logger = logger;
  }

  async findPromos(){
    this.logger.info('[PromoRepository] Retrieving promos');

    return this.Promo.find();
  }

  async insertPromo(payload) {
    this.logger.info({ promoCode: payload.promoCode }, '[PromoRepository] Creating promo');

    return this.Promo.insertOne(payload);
  }
}

export default PromoRepository;
