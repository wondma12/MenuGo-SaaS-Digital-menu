// Backend/src/services/qrCode.service.js

import prisma from '../config/prisma.js';
import QRCode from 'qrcode';

export const generateQRCode = async (restaurantId, tableNumber = null, qrType = 'menu') => {
  // ✅ First, deactivate any existing active QR code for this restaurant
  await prisma.qr_codes.updateMany({
    where: {
      restaurant_id: restaurantId,
      is_active: true
    },
    data: {
      is_active: false
    }
  });
  
  // Generate unique identifier
  const qrIdentifier = `${restaurantId}-${tableNumber || 'menu'}-${Date.now()}`;
  
  // Create QR code data URL (for restaurant menu)
  const baseUrl = process.env.CORS_ORIGIN || 'https://menu-go-digital-menu.vercel.app';
  const qrData = tableNumber 
    ? `${baseUrl}/customer/${restaurantId}?table=${tableNumber}`
    : `${baseUrl}/customer/${restaurantId}`;
  
  // Generate QR code as data URL
// Generate high-quality QR code
const qrImageUrl = await QRCode.toDataURL(qrData, {
  errorCorrectionLevel: 'H',
  margin: 2,
  width: 500,
  color: {
    dark: '#000000',
    light: '#FFFFFF',
  },
});
  // Save to database (always active since we deactivated others)
  const qrCode = await prisma.qr_codes.create({
    data: {
      restaurant_id: restaurantId,
      qr_identifier: qrIdentifier,
      qr_image_url: qrImageUrl,
      qr_type: qrType,
      is_active: true,
      scan_count: 0
    }
  });
  
  return qrCode;
};

export const getAllQRCodes = async (restaurantId, page = 1, limit = 50) => {
  const skip = (page - 1) * limit;
  
  const [qrCodes, total] = await Promise.all([
    prisma.qr_codes.findMany({
      where: { restaurant_id: restaurantId },
      orderBy: { created_at: 'desc' },
      skip,
      take: limit
    }),
    prisma.qr_codes.count({ where: { restaurant_id: restaurantId } })
  ]);
  
  return {
    qrCodes,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const getActiveQRCode = async (restaurantId) => {
  const qrCode = await prisma.qr_codes.findFirst({
    where: {
      restaurant_id: restaurantId,
      is_active: true
    }
  });
  
  return qrCode;
};

export const getQRCodeById = async (qrId, restaurantId) => {
  const qrCode = await prisma.qr_codes.findFirst({
    where: {
      id: qrId,
      restaurant_id: restaurantId
    }
  });
  
  if (!qrCode) {
    throw new Error('QR code not found');
  }
  
  return qrCode;
};

export const updateQRCodeStatus = async (qrId, restaurantId, isActive) => {
  const qrCode = await prisma.qr_codes.findFirst({
    where: {
      id: qrId,
      restaurant_id: restaurantId
    }
  });
  
  if (!qrCode) {
    throw new Error('QR code not found');
  }
  
  // ✅ If activating this QR code, deactivate all others first
  if (isActive === true) {
    await prisma.qr_codes.updateMany({
      where: {
        restaurant_id: restaurantId,
        is_active: true,
        id: { not: qrId }
      },
      data: {
        is_active: false
      }
    });
  }
  
  const updated = await prisma.qr_codes.update({
    where: { id: qrId },
    data: { is_active: isActive }
  });
  
  return updated;
};

export const incrementScanCount = async (qrIdentifier) => {
  const qrCode = await prisma.qr_codes.findFirst({
    where: { qr_identifier: qrIdentifier }
  });
  
  if (qrCode) {
    await prisma.qr_codes.update({
      where: { id: qrCode.id },
      data: { scan_count: { increment: 1 } }
    });
  }
};

export const deleteQRCode = async (qrId, restaurantId) => {
  const qrCode = await prisma.qr_codes.findFirst({
    where: {
      id: qrId,
      restaurant_id: restaurantId
    }
  });
  
  if (!qrCode) {
    throw new Error('QR code not found');
  }
  
  await prisma.qr_codes.delete({
    where: { id: qrId }
  });
  
  return { message: 'QR code deleted successfully' };
};

export const generateTableQRCodes = async (restaurantId, tableNumbers) => {
  const qrCodes = [];
  
  for (const tableNumber of tableNumbers) {
    const qrCode = await generateQRCode(restaurantId, tableNumber, 'table');
    qrCodes.push(qrCode);
  }
  
  return qrCodes;
};