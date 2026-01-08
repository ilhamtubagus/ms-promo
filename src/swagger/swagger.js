import swaggerUi from 'swagger-ui-express';
import { promoSwagger } from '../validators/promo.validator.js';

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Promo API',
    version: '1.0.0',
    description: 'API documentation for Promo service with Joi validation',
  },
  servers: [{ url: 'http://localhost:3000' }],
  paths: {
    '/promos': {
      get: {
        summary: 'Get all active promos with pagination',
        tags: ['Promos'],
        parameters: [
          {
            name: 'page',
            in: 'query',
            schema: { type: 'integer', default: 1 },
            description: 'Page number',
          },
          {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', default: 10 },
            description: 'Number of items per page',
          },
        ],
        responses: {
          200: {
            description: 'Paginated list of promos',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { type: 'array', items: promoSwagger },
                    total: { type: 'integer' },
                    page: { type: 'integer' },
                    limit: { type: 'integer' },
                    totalPages: { type: 'integer' },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a new promo',
        tags: ['Promos'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: promoSwagger,
            },
          },
        },
        responses: {
          201: { description: 'Promo created' },
          400: { description: 'Validation error' },
        },
      },
    },
  },
};

export function setupSwagger(app) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}