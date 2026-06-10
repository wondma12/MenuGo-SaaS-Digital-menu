import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    api: 'MenuGo Digital Menu API',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/v1/auth/register',
        login: 'POST /api/v1/auth/login',
        me: 'GET /api/v1/auth/me'
      },
      restaurants: {
        create: 'POST /api/v1/restaurants',
        getAll: 'GET /api/v1/restaurants/all',
        getMyRestaurant: 'GET /api/v1/restaurants/my-restaurant',
        getById: 'GET /api/v1/restaurants/:id',
        update: 'PUT /api/v1/restaurants/:id',
        updateStatus: 'PUT /api/v1/restaurants/:id/status'
      },
      menu: {
        categories: {
          create: 'POST /api/v1/menu/categories',
          getAll: 'GET /api/v1/menu/categories',
          getById: 'GET /api/v1/menu/categories/:id',
          update: 'PUT /api/v1/menu/categories/:id',
          delete: 'DELETE /api/v1/menu/categories/:id'
        },
        items: {
          create: 'POST /api/v1/menu/items',
          getAll: 'GET /api/v1/menu/items',
          getFeatured: 'GET /api/v1/menu/items/featured',
          getByCategory: 'GET /api/v1/menu/items/menu-by-category',
          getById: 'GET /api/v1/menu/items/:id',
          update: 'PUT /api/v1/menu/items/:id',
          delete: 'DELETE /api/v1/menu/items/:id',
          updateStatus: 'PATCH /api/v1/menu/items/:id/status'
        },
        public: 'GET /api/v1/menu/public/:restaurantId'
      },
      orders: {
        create: 'POST /api/v1/orders',
        getAll: 'GET /api/v1/orders',
        getActive: 'GET /api/v1/orders/active',
        getHistory: 'GET /api/v1/orders/history',
        getToday: 'GET /api/v1/orders/today',
        getKitchenDisplay: 'GET /api/v1/orders/kitchen-display',
        getById: 'GET /api/v1/orders/:id',
        updateStatus: 'PATCH /api/v1/orders/:id/status',
        assignWaiter: 'PUT /api/v1/orders/:id/assign-waiter',
        track: 'GET /api/v1/orders/track/:orderNumber'
      },
      qrcodes: {
        generate: 'POST /api/v1/qrcodes/generate',
        generateTables: 'POST /api/v1/qrcodes/generate-tables',
        getAll: 'GET /api/v1/qrcodes',
        updateStatus: 'PATCH /api/v1/qrcodes/:id/status',
        delete: 'DELETE /api/v1/qrcodes/:id'
      },
      verification: {
        submit: 'POST /api/v1/verification/submit',
        myStatus: 'GET /api/v1/verification/my-status',
        getAll: 'GET /api/v1/verification/all',
        review: 'PUT /api/v1/verification/:id/review'
      },
      feedbacks: {
        public: 'POST /api/v1/feedbacks/public/:restaurantId',
        getAll: 'GET /api/v1/feedbacks',
        delete: 'DELETE /api/v1/feedbacks/:id'
      },
      analytics: {
        dashboard: 'GET /api/v1/analytics/dashboard',
        revenue: 'GET /api/v1/analytics/revenue-chart',
        distribution: 'GET /api/v1/analytics/order-distribution'
      },
      settings: {
        get: 'GET /api/v1/settings',
        update: 'PUT /api/v1/settings'
      },
      locations: {
        add: 'POST /api/v1/locations',
        update: 'PUT /api/v1/locations',
        get: 'GET /api/v1/locations',
        nearby: 'GET /api/v1/locations/nearby'
      }
    }
  });
});

export default router;