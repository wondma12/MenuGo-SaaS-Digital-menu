import prisma from '../config/prisma.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';

export const registerUser = async (userData) => {
  const { name, email, password, role = 'restaurant_admin', restaurant_id = null } = userData;

  // Check if user exists
  const existingUser = await prisma.users.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      restaurant_id,
      is_active: true,
      is_email_verified: true // Set to false if email verification is needed
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      restaurant_id: true,
      is_active: true,
      created_at: true
    }
  });

  // Generate token
  const token = generateToken(user.id, user.email, user.role, user.restaurant_id);

  return { user, token };
};

export const loginUser = async (email, password) => {
  // Find user
  const user = await prisma.users.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  if (!user.is_active) {
    throw new Error('Account is deactivated');
  }

  // Check password
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  // Update last login
  await prisma.users.update({
    where: { id: user.id },
    data: { last_login: new Date() }
  });

  // Generate token
  const token = generateToken(user.id, user.email, user.role, user.restaurant_id);

  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
};

export const getCurrentUser = async (userId) => {
  const user = await prisma.users.findUnique({
    where: { id: userId },
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
      restaurants_users_restaurant_idTorestaurants: {
        select: {
          id: true,
          name: true,
          logo: true,
          status: true
        }
      }
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};