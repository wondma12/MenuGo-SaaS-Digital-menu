// services/registration.js
import { authAPI, restaurantAPI, verificationAPI, locationAPI } from './api.js';

const registrationService = {
  // =========================================
  // SUBMIT RESTAURANT REGISTRATION
  // =========================================
  async submitRegistration(registrationData) {
    try {
      // 1. Register the user
      const userResult = await authAPI.register({
        name: registrationData.fullName,
        email: registrationData.email,
        password: registrationData.password,
        phone: registrationData.phoneNumber,
        role: 'restaurant_admin',
      });

      if (!userResult.success) {
        return {
          success: false,
          data: null,
          error: userResult.error || 'User registration failed',
        };
      }

      const user = userResult.data.user;

      // 2. Create the restaurant
      const restaurantResult = await restaurantAPI.create({
        name: registrationData.restaurantName,
        email: registrationData.businessEmail,
        phone: registrationData.businessPhone,
        description: registrationData.slogan || '',
        logo: registrationData.logo || '',
        banner: registrationData.banner || '',
        // The backend will set status to 'pending' by default
      });

      if (!restaurantResult.success) {
        return {
          success: false,
          data: null,
          error: restaurantResult.error || 'Restaurant creation failed',
        };
      }

      const restaurant = restaurantResult;

      // 3. Add location
      const locationResult = await locationAPI.add({
        restaurant_id: restaurant.id,
        country: registrationData.country,
        city: registrationData.city,
        sub_city: registrationData.subCity,
        street_address: registrationData.streetAddress,
        map_link: registrationData.googleMapsLink,
        latitude: registrationData.latitude || null,
        longitude: registrationData.longitude || null,
      });

      if (!locationResult.success) {
        return {
          success: false,
          data: null,
          error: locationResult.error || 'Location creation failed',
        };
      }

      // 4. Submit verification
      const verificationResult = await verificationAPI.submit({
        restaurant_id: restaurant.id,
        owner_name: registrationData.ownerName || registrationData.fullName,
        business_license_number: registrationData.businessLicenseNumber,
        tin_number: registrationData.tinNumber,
        business_license_document: registrationData.businessLicenseDocument || '',
        legal_document: registrationData.legalDocument || '',
      });

      if (!verificationResult.success) {
        return {
          success: false,
          data: null,
          error: verificationResult.error || 'Verification submission failed',
        };
      }

      // Remove password from response
      const { password: _, ...safeUser } = user;

      return {
        success: true,
        data: {
          user: safeUser,
          restaurant,
          location: locationResult,
          verification: verificationResult,
          message: 'Restaurant registration submitted successfully. Please wait for approval.',
        },
        error: null,
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        data: null,
        error: error.message || 'Registration failed. Please try again.',
      };
    }
  },

  // =========================================
  // GET PENDING REGISTRATIONS
  // =========================================
  async getPendingRegistrations() {
    try {
      const result = await verificationAPI.getAll({ status: 'pending' });
      
      return {
        success: true,
        data: result.verifications || result,
        error: null,
      };
    } catch (error) {
      console.error('Pending registration fetch error:', error);
      return {
        success: false,
        data: [],
        error: error.message || 'Failed to fetch registrations',
      };
    }
  },

  // =========================================
  // APPROVE REGISTRATION
  // =========================================
  async approveRegistration(restaurantId, platformAdminId) {
    try {
      // Find the verification for this restaurant
      const verifications = await verificationAPI.getAll({ restaurant_id: restaurantId });
      const verification = (verifications.verifications || verifications || [])[0];
      
      if (!verification) {
        return {
          success: false,
          data: null,
          error: 'Verification record not found',
        };
      }

      const result = await verificationAPI.review(
        verification.id,
        'approved',
        'Approved by platform admin'
      );

      // Also update restaurant status
      await restaurantAPI.updateStatus(restaurantId, 'active');

      return {
        success: true,
        data: {
          message: 'Restaurant approved successfully',
        },
        error: null,
      };
    } catch (error) {
      console.error('Approval error:', error);
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to approve registration',
      };
    }
  },

  // =========================================
  // REJECT REGISTRATION
  // =========================================
  async rejectRegistration(restaurantId, platformAdminId, reason = 'Rejected by platform admin') {
    try {
      // Find the verification for this restaurant
      const verifications = await verificationAPI.getAll({ restaurant_id: restaurantId });
      const verification = (verifications.verifications || verifications || [])[0];
      
      if (!verification) {
        return {
          success: false,
          data: null,
          error: 'Verification record not found',
        };
      }

      const result = await verificationAPI.review(
        verification.id,
        'rejected',
        reason
      );

      // Also update restaurant status
      await restaurantAPI.updateStatus(restaurantId, 'suspended');

      return {
        success: true,
        data: {
          message: 'Restaurant rejected successfully',
        },
        error: null,
      };
    } catch (error) {
      console.error('Rejection error:', error);
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to reject registration',
      };
    }
  }
};

export default registrationService;