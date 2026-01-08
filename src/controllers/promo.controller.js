class PromoController {
  constructor(promoService, logger) {
    this.promoService = promoService;
    this.logger = logger;

    this.getPromos = this.getPromos.bind(this);
    this.createPromo = this.createPromo.bind(this);
  }

  async getPromos(req, res) {
    this.logger.info({ requestId: req.id }, 'GET /promos');

    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;

      const result = await this.promoService.getPromos(page, limit);
      res.json(result);
    } catch (err) {
      this.logger.error(err, 'Failed to fetch promos');

      throw err;
    }
  }

  async createPromo(req, res, next) {
    this.logger.info(
      { promoCode: req.body?.promoCode },
      'POST /promos',
    );

    try {
      const promo = await this.promoService.createPromo(req.body);

      res.status(201).json(promo);
    } catch (err) {
      this.logger.warn(err, 'Failed to create promo');

      next(err);
    }
  }
}

export default PromoController;