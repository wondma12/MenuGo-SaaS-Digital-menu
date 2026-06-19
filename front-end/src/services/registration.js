// services/registration.js
import { authAPI, restaurantAPI, verificationAPI, locationAPI } from './api.js';

const registrationService = {
  // =========================================
  // SUBMIT RESTAURANT REGISTRATION
  // =========================================
  async submitRegistration(registrationData) {
    try {
      console.log('[Registration] 🚀 Starting registration process...');

      // =========================================
      // 1. REGISTER THE USER
      // =========================================
      console.log('[Registration] Step 1: Registering user...');
      const userResult = await authAPI.register({
        name: registrationData.fullName,
        email: registrationData.email,
        password: registrationData.password,
        phone: registrationData.phoneNumber,
        role: 'restaurant_admin',
      });

      if (!userResult.success) {
        console.error('[Registration] ❌ User registration failed:', userResult.error);
        return {
          success: false,
          data: null,
          error: userResult.error || 'User registration failed',
        };
      }

      const user = userResult.data.user;
      console.log('[Registration] ✅ User created successfully:', user.id);

      // =========================================
      // 2. LOGIN THE USER TO GET A TOKEN
      // =========================================
      console.log('[Registration] Step 2: Logging in user to get authentication token...');
      const loginResult = await authAPI.login(
        registrationData.email,
        registrationData.password
      );

      if (!loginResult.success) {
        console.warn('[Registration] ⚠️ Auto-login failed, continuing without token');
      } else {
        console.log('[Registration] ✅ Auto-login successful');
      }

      // =========================================
      // 3. CREATE THE RESTAURANT - FIXED
      // =========================================
      console.log('[Registration] Step 3: Creating restaurant...');

      // ✅ FIX 1: Properly define restaurantData
      const restaurantData = {
        name: registrationData.restaurantName,
        email: registrationData.businessEmail,
        phone: registrationData.businessPhone,
        description: registrationData.slogan || registrationData.description || '',
        logo: registrationData.logo && typeof registrationData.logo === 'string' 
          ? registrationData.logo 
          : null,
        banner: registrationData.banner && typeof registrationData.banner === 'string' 
          ? registrationData.banner 
          : null,
        slogan: registrationData.slogan || null,
        website_url: registrationData.websiteUrl || null,
        owner_id: user.id,
        status: 'pending',
      };

      console.log('[Registration] Cleaned restaurant data:', {
        name: restaurantData.name,
        email: restaurantData.email,
        owner_id: restaurantData.owner_id,
        logo_type: typeof restaurantData.logo,
        banner_type: typeof restaurantData.banner,
        slogan: restaurantData.slogan,
      });

      // ✅ restaurantResult = { success: true, data: restaurant }
      const restaurantResult = await restaurantAPI.create(restaurantData);
      console.log('[Registration] Restaurant API response:', restaurantResult);

      // ✅ Check if restaurant creation failed
      if (!restaurantResult || !restaurantResult.success) {
        console.error('[Registration] ❌ Restaurant creation failed:', restaurantResult?.error);
        return {
          success: false,
          data: null,
          error: restaurantResult?.error || 'Restaurant creation failed',
        };
      }

      // ✅ FIX 2: Extract restaurant from restaurantResult.data
      const restaurant = restaurantResult.data;
      console.log('[Registration] ✅ Restaurant created successfully:', restaurant.id);

      // =========================================
      // 4. ADD LOCATION
      // =========================================
      console.log('[Registration] Step 4: Adding restaurant location...');
      const locationData = {
        restaurant_id: restaurant.id,
        country: registrationData.country || '',
        city: registrationData.city || '',
        sub_city: registrationData.subCity || '',
        street_address: registrationData.streetAddress || '',
        map_link: registrationData.googleMapsLink || '',
        latitude: registrationData.latitude ? parseFloat(registrationData.latitude) : null,
        longitude: registrationData.longitude ? parseFloat(registrationData.longitude) : null,
      };

      const locationResult = await locationAPI.add(locationData);

      if (!locationResult.success) {
        console.warn('[Registration] ⚠️ Location creation failed, but continuing...');
      } else {
        console.log('[Registration] ✅ Location added successfully');
      }

      // =========================================
      // 5. SUBMIT VERIFICATION
      // =========================================
      console.log('[Registration] Step 5: Submitting verification documents...');
      const verificationData = {
        restaurant_id: restaurant.id,
        owner_name: registrationData.ownerName || registrationData.fullName,
        business_license_number: registrationData.businessLicenseNumber || '',
        tin_number: registrationData.tinNumber || '',
        business_license_document: registrationData.businessLicenseDocument || '',
        legal_document: registrationData.legalDocument || '',
      };

      const verificationResult = await verificationAPI.submit(verificationData);

      if (!verificationResult.success) {
        console.warn('[Registration] ⚠️ Verification submission failed, but continuing...');
      } else {
        console.log('[Registration] ✅ Verification submitted successfully');
      }

      // Remove password from response
      const { password: _, ...safeUser } = user;

      console.log('[Registration] 🎉 Registration completed successfully!');

      return {
        success: true,
        data: {
          user: safeUser,
          restaurant,
          location: locationResult.success ? locationResult : null,
          verification: verificationResult.success ? verificationResult : null,
          message: 'Restaurant registration submitted successfully. Please wait for approval.',
        },
        error: null,
      };
    } catch (error) {
      console.error('[Registration] ❌ Unexpected error:', error);
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
      console.error('[Registration] Pending registration fetch error:', error);
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
      const verifications = await verificationAPI.getAll({ restaurant_id: restaurantId });
      const verification = (verifications.verifications || verifications || [])[0];

      if (!verification) {
        return {
          success: false,
          data: null,
          error: 'Verification record not found',
        };
      }

      await verificationAPI.review(
        verification.id,
        'approved',
        'Approved by platform admin'
      );

      await restaurantAPI.updateStatus(restaurantId, 'active');

      return {
        success: true,
        data: { message: 'Restaurant approved successfully' },
        error: null,
      };
    } catch (error) {
      console.error('[Registration] Approval error:', error);
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
      const verifications = await verificationAPI.getAll({ restaurant_id: restaurantId });
      const verification = (verifications.verifications || verifications || [])[0];

      if (!verification) {
        return {
          success: false,
          data: null,
          error: 'Verification record not found',
        };
      }

      await verificationAPI.review(
        verification.id,
        'rejected',
        reason
      );

      await restaurantAPI.updateStatus(restaurantId, 'suspended');

      return {
        success: true,
        data: { message: 'Restaurant rejected successfully' },
        error: null,
      };
    } catch (error) {
      console.error('[Registration] Rejection error:', error);
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to reject registration',
      };
    }
  },
};

export default registrationService;