import prisma from '../config/prisma.js';

export const createFeedback = async (restaurantId, feedbackData) => {
  const { customer_name, rating, comment } = feedbackData;
  
  if (rating && (rating < 1 || rating > 5)) {
    throw new Error('Rating must be between 1 and 5');
  }
  
  const feedback = await prisma.feedbacks.create({
    data: {
      restaurant_id: restaurantId,
      customer_name: customer_name || 'Anonymous',
      rating: rating ? parseInt(rating) : null,
      comment
    }
  });
  
  return feedback;
};

export const getAllFeedbacks = async (restaurantId, page = 1, limit = 20, minRating = null) => {
  const skip = (page - 1) * limit;
  
  const where = { restaurant_id: restaurantId };
  if (minRating) {
    where.rating = { gte: parseInt(minRating) };
  }
  
  const [feedbacks, total] = await Promise.all([
    prisma.feedbacks.findMany({
      where,
      orderBy: { created_at: 'desc' },
      skip,
      take: limit
    }),
    prisma.feedbacks.count({ where })
  ]);
  
  const ratingStats = await prisma.feedbacks.aggregate({
    where: { restaurant_id: restaurantId },
    _avg: { rating: true },
    _count: true,
    _min: { rating: true },
    _max: { rating: true }
  });
  
  return {
    feedbacks,
    statistics: {
      average_rating: ratingStats._avg.rating || 0,
      total_reviews: ratingStats._count,
      min_rating: ratingStats._min.rating || 0,
      max_rating: ratingStats._max.rating || 0
    },
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const deleteFeedback = async (feedbackId, restaurantId, userRole) => {
  const feedback = await prisma.feedbacks.findFirst({
    where: { 
      id: feedbackId,
      ...(userRole !== 'platform_admin' && { restaurant_id: restaurantId })
    }
  });
  
  if (!feedback) {
    throw new Error('Feedback not found');
  }
  
  await prisma.feedbacks.delete({
    where: { id: feedbackId }
  });
  
  return { message: 'Feedback deleted successfully' };
};