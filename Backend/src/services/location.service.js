import prisma from '../config/prisma.js';

export const addRestaurantLocation = async (restaurantId, locationData) => {
  const {
    country,
    city,
    sub_city,
    street_address,
    map_link,
    latitude,
    longitude
  } = locationData;
  
  // Check if location already exists
  const existingLocation = await prisma.restaurant_location.findFirst({
    where: { restaurant_id: restaurantId }
  });
  
  if (existingLocation) {
    throw new Error('Location already exists for this restaurant. Use update instead.');
  }
  
  const location = await prisma.restaurant_location.create({
    data: {
      restaurant_id: restaurantId,
      country,
      city,
      sub_city,
      street_address,
      map_link,
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null
    }
  });
  
  return location;
};

export const updateRestaurantLocation = async (restaurantId, locationData) => {
  const location = await prisma.restaurant_location.findFirst({
    where: { restaurant_id: restaurantId }
  });
  
  if (!location) {
    throw new Error('Location not found for this restaurant');
  }
  
  const updated = await prisma.restaurant_location.update({
    where: { id: location.id },
    data: locationData
  });
  
  return updated;
};

export const getRestaurantLocation = async (restaurantId) => {
  const location = await prisma.restaurant_location.findFirst({
    where: { restaurant_id: restaurantId }
  });
  
  return location;
};

export const getNearbyRestaurants = async (latitude, longitude, radius = 10) => {
  // Find restaurants within radius (in kilometers)
  const restaurants = await prisma.$queryRaw`
    SELECT 
      r.*,
      l.*,
      (
        6371 * acos(
          cos(radians(${latitude})) * 
          cos(radians(l.latitude)) * 
          cos(radians(l.longitude) - radians(${longitude})) + 
          sin(radians(${latitude})) * 
          sin(radians(l.latitude))
        )
      ) AS distance
    FROM restaurants r
    JOIN restaurant_location l ON r.id = l.restaurant_id
    WHERE r.status = 'active'
    HAVING distance < ${radius}
    ORDER BY distance
    LIMIT 20
  `;
  
  return restaurants;
};