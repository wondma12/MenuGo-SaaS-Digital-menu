// Backend/src/services/users.service.js

import prisma from '../config/prisma.js';
import bcrypt from 'bcryptjs';  // ✅ Add this import

/**
 * Users Service
 * Handles all user-related operations
 */

// ============================================================
// GET ALL USERS
// ============================================================

export const getAllUsers = async (params = {}) => {
  const { role, restaurant_id, is_active, search, page = 1, limit = 100 } = params;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const where = {};

  if (role) {
    where.role = role;
  }

  if (restaurant_id) {
    where.restaurant_id = restaurant_id;
  }

  if (is_active !== undefined) {
    where.is_active = is_active === 'true';
  }

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { email: { contains: search } },
      { phone: { contains: search } },
    ];
  }

  const [users, total] = await Promise.all([
    prisma.users.findMany({
      where,
      skip,
      take: parseInt(limit),
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        restaurant_id: true,
        profile_image: true,
        is_active: true,
        is_email_verified: true,
        last_login: true,
        created_at: true,
        updated_at: true,
        restaurants_users_restaurant_idTorestaurants: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            status: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    }),
    prisma.users.count({ where }),
  ]);

  return {
    users,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
    },
  };
};

// ============================================================
// GET USER BY ID
// ============================================================

export const getUserById = async (id) => {
  const user = await prisma.users.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      restaurant_id: true,
      profile_image: true,
      is_active: true,
      is_email_verified: true,
      last_login: true,
      created_at: true,
      updated_at: true,
      restaurants_users_restaurant_idTorestaurants: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          status: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

// ============================================================
// GET USERS BY RESTAURANT
// ============================================================

export const getUsersByRestaurant = async (restaurantId, params = {}) => {
  const { role, is_active, page = 1, limit = 100 } = params;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const where = {
    restaurant_id: restaurantId,
  };

  if (role) {
    where.role = role;
  }

  if (is_active !== undefined) {
    where.is_active = is_active === 'true';
  }

  const [users, total] = await Promise.all([
    prisma.users.findMany({
      where,
      skip,
      take: parseInt(limit),
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        restaurant_id: true,
        profile_image: true,
        is_active: true,
        is_email_verified: true,
        last_login: true,
        created_at: true,
        updated_at: true,
      },
      orderBy: { created_at: 'desc' },
    }),
    prisma.users.count({ where }),
  ]);

  return {
    users,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
    },
  };
};

// ============================================================
// CREATE USER - ✅ FIXED
// ============================================================

export const createUser = async (userData) => {
  const { name, email, phone, password, role, restaurant_id, profile_image } = userData;

  // Check if user already exists
  const existingUser = await prisma.users.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // ✅ Hash the password before saving
  let hashedPassword = password;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  }

  const user = await prisma.users.create({
    data: {
      name,
      email,
      phone,
      password: hashedPassword, // ✅ Store hashed password
      role: role || 'waiter',
      restaurant_id: restaurant_id || null,
      profile_image: profile_image || null,
      is_active: true,
      is_email_verified: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      restaurant_id: true,
      profile_image: true,
      is_active: true,
      is_email_verified: true,
      created_at: true,
      updated_at: true,
    },
  });

  return user;
};

// ============================================================
// UPDATE USER
// ============================================================

export const updateUser = async (id, userData) => {
  const { name, email, phone, role, restaurant_id, profile_image, is_active, is_email_verified } = userData;

  // Check if user exists
  const existingUser = await prisma.users.findUnique({
    where: { id },
  });

  if (!existingUser) {
    throw new Error('User not found');
  }

  // If email is being changed, check if it's already taken
  if (email && email !== existingUser.email) {
    const emailTaken = await prisma.users.findUnique({
      where: { email },
    });

    if (emailTaken) {
      throw new Error('Email already taken');
    }
  }

  const user = await prisma.users.update({
    where: { id },
    data: {
      name,
      email,
      phone,
      role,
      restaurant_id,
      profile_image,
      is_active,
      is_email_verified,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      restaurant_id: true,
      profile_image: true,
      is_active: true,
      is_email_verified: true,
      last_login: true,
      created_at: true,
      updated_at: true,
    },
  });

  return user;
};

// ============================================================
// DELETE USER (Soft Delete)
// ============================================================

export const deleteUser = async (id) => {
  // Check if user exists
  const existingUser = await prisma.users.findUnique({
    where: { id },
  });

  if (!existingUser) {
    throw new Error('User not found');
  }

  // Soft delete - deactivate user
  const user = await prisma.users.update({
    where: { id },
    data: { is_active: false },
    select: {
      id: true,
      name: true,
      email: true,
      is_active: true,
    },
  });

  return user;
};

// ============================================================
// PERMANENTLY DELETE USER (Hard Delete)
// ============================================================

export const permanentlyDeleteUser = async (id) => {
  // Check if user exists
  const existingUser = await prisma.users.findUnique({
    where: { id },
  });

  if (!existingUser) {
    throw new Error('User not found');
  }

  await prisma.users.delete({
    where: { id },
  });

  return { id, message: 'User permanently deleted' };
};

// ============================================================
// UPDATE USER PASSWORD - ✅ FIXED
// ============================================================

export const updateUserPassword = async (id, newPassword) => {
  // Check if user exists
  const existingUser = await prisma.users.findUnique({
    where: { id },
  });

  if (!existingUser) {
    throw new Error('User not found');
  }

  // ✅ Hash the new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  const user = await prisma.users.update({
    where: { id },
    data: { password: hashedPassword },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return user;
};

// ============================================================
// GET USERS STATS
// ============================================================

export const getUserStats = async () => {
  const [total, platformAdmins, restaurantAdmins, waiters, active, inactive] = await Promise.all([
    prisma.users.count(),
    prisma.users.count({ where: { role: 'platform_admin' } }),
    prisma.users.count({ where: { role: 'restaurant_admin' } }),
    prisma.users.count({ where: { role: 'waiter' } }),
    prisma.users.count({ where: { is_active: true } }),
    prisma.users.count({ where: { is_active: false } }),
  ]);

  return {
    total,
    platformAdmins,
    restaurantAdmins,
    waiters,
    active,
    inactive,
  };
};