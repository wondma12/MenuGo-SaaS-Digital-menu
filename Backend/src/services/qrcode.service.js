import prisma from '../config/prisma.js';
import QRCode from 'qrcode';

export const generateQRCode = async (restaurantId, tableNumber = null, qrType = 'menu') => {
  // Generate unique identifier
  const qrIdentifier = `${restaurantId}-${tableNumber || 'menu'}-${Date.now()}`;
  
  // Create QR code data URL (for restaurant menu)
  const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const qrData = tableNumber 
    ? `${baseUrl}/menu/${restaurantId}?table=${tableNumber}`
    : `${baseUrl}/menu/${restaurantId}`;
  
  // Generate QR code as data URL
  const qrImageUrl = await QRCode.toDataURL(qrData);
  
  // Save to database
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