import express from 'express';

const router = express.Router();

router.get('/openapi.json', (req, res) => {
  const openApiSpec = {
    openapi: '3.0.0',
    info: {
      title: 'MenuGo Digital Menu API',
      description: 'Complete API for restaurant digital menu system',
      version: '1.0.0',
      contact: {
        name: 'MenuGo Support',
        email: 'support@menugo.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development Server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    paths: {
      '/auth/register': {
        post: {
          summary: 'Register new user',
          tags: ['Authentication'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'email', 'password'],
                  properties: {
                    name: { type: 'string', example: 'John Doe' },
                    email: { type: 'string', example: 'john@example.com' },
                    password: { type: 'string', example: 'password123' },
                    role: { type: 'string', enum: ['platform_admin', 'restaurant_admin', 'waiter'] }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'User registered successfully' },
            400: { description: 'Bad request' }
          }
        }
      },
      '/auth/login': {
        post: {
          summary: 'Login to account',
          tags: ['Authentication'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: { type: 'string', example: 'john@example.com' },
                    password: { type: 'string', example: 'password123' }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Login successful' },
            401: { description: 'Invalid credentials' }
          }
        }
      },
      '/restaurants/my-restaurant': {
        get: {
          summary: 'Get my restaurant',
          tags: ['Restaurants'],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Restaurant retrieved successfully' },
            401: { description: 'Unauthorized' },
            403: { description: 'Access denied' }
          }
        }
      },
      '/menu/categories': {
        get: {
          summary: 'Get all categories',
          tags: ['Menu'],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Categories retrieved successfully' }
          }
        },
        post: {
          summary: 'Create category',
          tags: ['Menu'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name'],
                  properties: {
                    name: { type: 'string', example: 'Appetizers' },
                    display_order: { type: 'integer', example: 1 }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'Category created successfully' }
          }
        }
      },
      '/menu/items': {
        get: {
          summary: 'Get all menu items',
          tags: ['Menu'],
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'category_id', in: 'query', schema: { type: 'string' } },
            { name: 'status', in: 'query', schema: { type: 'string', enum: ['available', 'unavailable'] } },
            { name: 'search', in: 'query', schema: { type: 'string' } }
          ],
          responses: {
            200: { description: 'Menu items retrieved successfully' }
          }
        },
        post: {
          summary: 'Create menu item',
          tags: ['Menu'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['category_id', 'name', 'price'],
                  properties: {
                    category_id: { type: 'string', example: 'uuid' },
                    name: { type: 'string', example: 'Spicy Chicken Wings' },
                    price: { type: 'number', example: 12.99 },
                    description: { type: 'string' },
                    preparation_time: { type: 'integer', example: 15 },
                    is_featured: { type: 'boolean', example: true }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'Menu item created successfully' }
          }
        }
      },
      '/orders': {
        get: {
          summary: 'Get all orders',
          tags: ['Orders'],
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'status', in: 'query', schema: { type: 'string', enum: ['pending', 'verified', 'preparing', 'served'] } },
            { name: 'page', in: 'query', schema: { type: 'integer', example: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', example: 20 } }
          ],
          responses: {
            200: { description: 'Orders retrieved successfully' }
          }
        },
        post: {
          summary: 'Create order',
          tags: ['Orders'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['items'],
                  properties: {
                    table_number: { type: 'string', example: 'Table 5' },
                    order_type: { type: 'string', enum: ['dine_in', 'takeaway'], example: 'dine_in' },
                    customer_note: { type: 'string' },
                    items: {
                      type: 'array',
                      items: {
                        type: 'object',
                        required: ['menu_item_id'],
                        properties: {
                          menu_item_id: { type: 'string' },
                          quantity: { type: 'integer', example: 1 }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'Order created successfully' }
          }
        }
      },
      '/orders/kitchen-display': {
        get: {
          summary: 'Kitchen display view',
          tags: ['Orders'],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Kitchen orders retrieved successfully' }
          }
        }
      },
      '/orders/track/{orderNumber}': {
        get: {
          summary: 'Track order status',
          tags: ['Orders'],
          parameters: [
            { name: 'orderNumber', in: 'path', required: true, schema: { type: 'string' } }
          ],
          responses: {
            200: { description: 'Order status retrieved successfully' }
          }
        }
      },
      '/qrcodes/generate': {
        post: {
          summary: 'Generate QR code',
          tags: ['QR Codes'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    table_number: { type: 'string', example: 'Table 1' },
                    qr_type: { type: 'string', enum: ['menu', 'table'], example: 'table' }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'QR code generated successfully' }
          }
        }
      },
      '/feedbacks/public/{restaurantId}': {
        post: {
          summary: 'Submit public feedback',
          tags: ['Feedbacks'],
          parameters: [
            { name: 'restaurantId', in: 'path', required: true, schema: { type: 'string' } }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    customer_name: { type: 'string', example: 'Jane Smith' },
                    rating: { type: 'integer', minimum: 1, maximum: 5, example: 5 },
                    comment: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'Feedback submitted successfully' }
          }
        }
      },
      '/analytics/dashboard': {
        get: {
          summary: 'Get dashboard statistics',
          tags: ['Analytics'],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Dashboard stats retrieved successfully' }
          }
        }
      }
    }
  };
  
  res.json(openApiSpec);
});

export default router;