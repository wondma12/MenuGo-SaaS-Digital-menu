// src/services/registration.js
import { authAPI, restaurantAPI, verificationAPI, locationAPI } from "./api.js";
import { API_BASE_URL } from "../env.js";

const registrationService = {
  
  /**
   * Upload a single file to the server
   */
  async uploadFile(file, type) {
    try {
      if (!file || !(file instanceof File)) {
        console.log(`[Registration] No ${type} file to upload`);
        return null;
      }

      console.log(`[Registration] 📤 Uploading ${type}:`, file.name, file.size, file.type);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const token = localStorage.getItem('authToken') || localStorage.getItem('token');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      // IMPORTANT: Do NOT set Content-Type, browser sets it with boundary

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: headers,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to upload ${type}`);
      }

      const data = await response.json();
      console.log(`[Registration] ✅ ${type} uploaded successfully:`, data.url || data.filePath);
      
      // Return the URL or file path
      return data.url || data.filePath || data.file_url || null;
    } catch (error) {
      console.error(`[Registration] ❌ ${type} upload error:`, error);
      return null;
    }
  },

  /**
   * Main registration submission
   */
  async submitRegistration(registrationData) {
    try {
      console.log("[Registration] 🚀 Starting registration process...");

      // ============================================================
      // Step 1: Register the user
      // ============================================================
      console.log("[Registration] Step 1: Registering user...");
      const userResult = await authAPI.register({
        name: registrationData.fullName,
        email: registrationData.email,
        password: registrationData.password,
        phone: registrationData.phoneNumber,
        role: "restaurant_admin",
      });

      if (!userResult.success) {
        console.error("[Registration] ❌ User registration failed:", userResult.error);
        return {
          success: false,
          data: null,
          error: userResult.error || "User registration failed",
        };
      }

      const user = userResult.data.user;
      console.log("[Registration] ✅ User created successfully:", user.id);

      // ============================================================
      // Step 2: Login to get auth token
      // ============================================================
      console.log("[Registration] Step 2: Logging in to get authentication token...");
      const loginResult = await authAPI.login(
        registrationData.email,
        registrationData.password,
      );

      if (!loginResult.success) {
        console.warn("[Registration] ⚠️ Auto-login failed, continuing without token");
      } else {
        console.log("[Registration] ✅ Auto-login successful");
        const authToken = loginResult.token;
        if (authToken) {
          localStorage.setItem('authToken', authToken);
          localStorage.setItem('token', authToken);
          if (loginResult.user) {
            localStorage.setItem('user', JSON.stringify(loginResult.user));
          }
        }
      }

      // ============================================================
      // Step 3: Upload files (logo, banner, documents)
      // ============================================================
      console.log("[Registration] Step 3: Uploading files...");
      
      // Upload logo if it's a File object
      let logoUrl = null;
      if (registrationData.logo instanceof File) {
        logoUrl = await this.uploadFile(registrationData.logo, 'logo');
        console.log("[Registration] Logo URL:", logoUrl);
      }

      // Upload banner if it's a File object
      let bannerUrl = null;
      if (registrationData.banner instanceof File) {
        bannerUrl = await this.uploadFile(registrationData.banner, 'banner');
        console.log("[Registration] Banner URL:", bannerUrl);
      }

      // Upload business license document if it's a File object
      let documentUrl = null;
      if (registrationData.businessLicenseDocument instanceof File) {
        documentUrl = await this.uploadFile(
          registrationData.businessLicenseDocument, 
          'business_license'
        );
        console.log("[Registration] Document URL:", documentUrl);
      }

      // ============================================================
      // Step 4: Create restaurant with file URLs
      // ============================================================
      console.log("[Registration] Step 4: Creating restaurant...");

      const restaurantData = {
        name: registrationData.restaurantName,
        email: registrationData.businessEmail,
        phone: registrationData.businessPhone,
        description: registrationData.slogan || registrationData.description || "",
        // Use the uploaded file URLs, not the File objects
        logo: logoUrl || null,
        banner: bannerUrl || null,
        slogan: registrationData.slogan || null,
        website_url: registrationData.websiteUrl || null,
        owner_id: user.id,
        status: "pending",
      };

      console.log("[Registration] Restaurant data:", {
        ...restaurantData,
        logo: logoUrl ? '✅ Uploaded' : '❌ Not provided',
        banner: bannerUrl ? '✅ Uploaded' : '❌ Not provided',
      });

      const restaurantResult = await restaurantAPI.create(restaurantData);

      if (!restaurantResult || !restaurantResult.success) {
        console.error("[Registration] ❌ Restaurant creation failed:", restaurantResult?.error);
        return {
          success: false,
          data: null,
          error: restaurantResult?.error || "Restaurant creation failed",
        };
      }

      const restaurant = restaurantResult.data;
      console.log("[Registration] ✅ Restaurant created successfully:", restaurant.id);

      // ============================================================
      // Step 5: Add location
      // ============================================================
      console.log("[Registration] Step 5: Adding restaurant location...");
      const locationData = {
        restaurant_id: restaurant.id,
        country: registrationData.country || "",
        city: registrationData.city || "",
        sub_city: registrationData.subCity || "",
        street_address: registrationData.streetAddress || "",
        map_link: registrationData.googleMapsLink || "",
        latitude: registrationData.latitude ? parseFloat(registrationData.latitude) : null,
        longitude: registrationData.longitude ? parseFloat(registrationData.longitude) : null,
      };

      const locationResult = await locationAPI.add(locationData);

      if (!locationResult.success) {
        console.warn("[Registration] ⚠️ Location creation failed, but continuing...");
      } else {
        console.log("[Registration] ✅ Location added successfully");
      }

      // ============================================================
      // Step 6: Submit verification documents
      // ============================================================
      console.log("[Registration] Step 6: Submitting verification documents...");
      const verificationData = {
        restaurant_id: restaurant.id,
        owner_name: registrationData.ownerName || registrationData.fullName,
        business_license_number: registrationData.businessLicenseNumber || "",
        tin_number: registrationData.tinNumber || "",
        // Use the uploaded document URL
        business_license_document: documentUrl || null,
        legal_document: null,
      };

      console.log("[Registration] Verification data:", {
        ...verificationData,
        business_license_document: documentUrl ? '✅ Uploaded' : '❌ Not provided',
      });

      const verificationResult = await verificationAPI.submit(verificationData);

      if (!verificationResult.success) {
        console.warn("[Registration] ⚠️ Verification submission failed, but continuing...");
      } else {
        console.log("[Registration] ✅ Verification submitted successfully");
      }

      // ============================================================
      // Success!
      // ============================================================
      const { password: _, ...safeUser } = user;

      console.log("[Registration] 🎉 Registration completed successfully!");
      console.log("[Registration] Summary:", {
        user: user.id,
        restaurant: restaurant.id,
        logo: logoUrl ? '✅' : '❌',
        banner: bannerUrl ? '✅' : '❌',
        document: documentUrl ? '✅' : '❌',
        location: locationResult.success ? '✅' : '⚠️',
        verification: verificationResult.success ? '✅' : '⚠️',
      });

      return {
        success: true,
        data: {
          user: safeUser,
          restaurant,
          location: locationResult.success ? locationResult : null,
          verification: verificationResult.success ? verificationResult : null,
          message: "Restaurant registration submitted successfully. Please wait for approval.",
        },
        error: null,
      };
    } catch (error) {
      console.error("[Registration] ❌ Unexpected error:", error);
      return {
        success: false,
        data: null,
        error: error.message || "Registration failed. Please try again.",
      };
    }
  },

  // ============================================================
  // Other methods remain the same
  // ============================================================
  
  async getPendingRegistrations() {
    try {
      const result = await verificationAPI.getAll({ status: "pending" });
      return {
        success: true,
        data: result.verifications || result,
        error: null,
      };
    } catch (error) {
      console.error("[Registration] Pending registration fetch error:", error);
      return {
        success: false,
        data: [],
        error: error.message || "Failed to fetch registrations",
      };
    }
  },

  async approveRegistration(restaurantId, platformAdminId) {
    try {
      const verifications = await verificationAPI.getAll({
        restaurant_id: restaurantId,
      });
      const verification = (verifications.verifications || verifications || [])[0];

      if (!verification) {
        return {
          success: false,
          data: null,
          error: "Verification record not found",
        };
      }

      await verificationAPI.review(
        verification.id,
        "approved",
        "Approved by platform admin",
      );

      await restaurantAPI.updateStatus(restaurantId, "active");

      return {
        success: true,
        data: { message: "Restaurant approved successfully" },
        error: null,
      };
    } catch (error) {
      console.error("[Registration] Approval error:", error);
      return {
        success: false,
        data: null,
        error: error.message || "Failed to approve registration",
      };
    }
  },

  async rejectRegistration(
    restaurantId,
    platformAdminId,
    reason = "Rejected by platform admin",
  ) {
    try {
      const verifications = await verificationAPI.getAll({
        restaurant_id: restaurantId,
      });
      const verification = (verifications.verifications || verifications || [])[0];

      if (!verification) {
        return {
          success: false,
          data: null,
          error: "Verification record not found",
        };
      }

      await verificationAPI.review(verification.id, "rejected", reason);

      await restaurantAPI.updateStatus(restaurantId, "suspended");

      return {
        success: true,
        data: { message: "Restaurant rejected successfully" },
        error: null,
      };
    } catch (error) {
      console.error("[Registration] Rejection error:", error);
      return {
        success: false,
        data: null,
        error: error.message || "Failed to reject registration",
      };
    }
  },
};

export default registrationService;