class PromoRepository {
  constructor(PromoModel, logger) {
    this.Promo = PromoModel;
    this.logger = logger;
  }

  async findPromos(page = 1, limit = 10) {
    this.logger.info({ page, limit }, '[PromoRepository] Retrieving promos');

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.Promo.find().skip(skip).limit(limit),
      this.Promo.countDocuments(),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async insertPromo(payload) {
    this.logger.info({ promoCode: payload.promoCode }, '[PromoRepository] Creating promo');

    return this.Promo.insertOne(payload);
  }
}

export default PromoRepository;