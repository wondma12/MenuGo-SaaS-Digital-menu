import express from 'express';
import v1Routes from './v1/index.js';
import docsRoutes from './docs.routes.js';

const router = express.Router();

// API documentation
router.use('/docs', docsRoutes);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

// API root
router.get('/', (req, res) => {
  res.status(200).json({
    name: 'MenuGo Digital Menu API',
    version: '1.0.0',
    documentation: '/api/docs',
    api: '/api/v1'
  });
});

// Version 1 routes
router.use('/v1', v1Routes);

export default router;