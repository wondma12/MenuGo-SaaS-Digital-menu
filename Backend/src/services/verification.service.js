import prisma from '../config/prisma.js';

export const submitVerification = async (restaurantId, verificationData) => {
  const {
    owner_name,
    business_license_number,
    tin_number,
    business_license_document,
    legal_document
  } = verificationData;
  
  // Check if verification already exists
  const existingVerification = await prisma.restaurant_verification.findFirst({
    where: { restaurant_id: restaurantId }
  });
  
  if (existingVerification) {
    throw new Error('Verification already submitted for this restaurant');
  }
  
  const verification = await prisma.restaurant_verification.create({
    data: {
      restaurant_id: restaurantId,
      owner_name,
      business_license_number,
      tin_number,
      business_license_document,
      legal_document,
      verification_status: 'pending'
    },
    include: {
      restaurants: {
        select: {
          name: true,
          email: true,
          phone: true
        }
      }
    }
  });
  
  return verification;
};

export const getVerificationStatus = async (restaurantId) => {
  const verification = await prisma.restaurant_verification.findFirst({
    where: { restaurant_id: restaurantId },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
  
  if (!verification) {
    return { status: 'not_submitted' };
  }
  
  return verification;
};

export const getAllVerifications = async (status = null, page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  
  const where = {};
  if (status) {
    where.verification_status = status;
  }
  
  const [verifications, total] = await Promise.all([
    prisma.restaurant_verification.findMany({
      where,
      include: {
        restaurants: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            status: true
          }
        },
        users: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { created_at: 'asc' },
      skip,
      take: limit
    }),
    prisma.restaurant_verification.count({ where })
  ]);
  
  return {
    verifications,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const reviewVerification = async (verificationId, status, reviewedBy, notes = null) => {
  if (!['approved', 'rejected'].includes(status)) {
    throw new Error('Status must be approved or rejected');
  }
  
  const verification = await prisma.restaurant_verification.findUnique({
    where: { id: verificationId },
    include: {
      restaurants: true
    }
  });
  
  if (!verification) {
    throw new Error('Verification request not found');
  }
  
  // Update verification status
  const updated = await prisma.restaurant_verification.update({
    where: { id: verificationId },
    data: {
      verification_status: status,
      reviewed_by: reviewedBy,
      reviewed_at: new Date()
    }
  });
  
  // If approved, update restaurant status to active
  if (status === 'approved') {
    await prisma.restaurants.update({
      where: { id: verification.restaurant_id },
      data: { status: 'active' }
    });
  }
  
  return updated;
};