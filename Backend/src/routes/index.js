import express from 'express';
import v1Routes from './v1/index.js';
import docsRoutes from './docs.routes.js';

const router = express.Router();

router.use('/docs', docsRoutes);

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

router.get('/', (req, res) => {
  res.status(200).json({
    name: 'MenuGo Digital Menu API',
    version: '1.0.0',
    documentation: '/api/docs',
    api: '/api/v1'
  });
});

router.use('/v1', v1Routes);

export default router;