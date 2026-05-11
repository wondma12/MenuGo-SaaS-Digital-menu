import { API_BASE_URL } from "../env";

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const registrationService = {
  async submitRegistration(registrationData) {
    try {
      await delay();

      // Get current data from JSON server
      const [
        usersResponse,
        restaurantsResponse,
        locationsResponse,
        verificationsResponse,
      ] = await Promise.all([
        fetch(`${API_BASE_URL}/users`),
        fetch(`${API_BASE_URL}/restaurants`),
        fetch(`${API_BASE_URL}/restaurantLocations`),
        fetch(`${API_BASE_URL}/restaurantVerifications`),
      ]);

      const users = await usersResponse.json();
      const restaurants = await restaurantsResponse.json();
      const locations = await locationsResponse.json();
      const verifications = await verificationsResponse.json();

      // Check if email already exists
      const existingUser = users.find(
        (u) => u.email === registrationData.email,
      );
      if (existingUser) {
        return {
          success: false,
          data: null,
          error: "Email already registered",
        };
      }

      // Generate new IDs
      const newUserId = Math.max(...users.map((u) => u.id), 0) + 1;
      const newRestaurantId = Math.max(...restaurants.map((r) => r.id), 0) + 1;
      const newLocationId = Math.max(...locations.map((l) => l.id), 0) + 1;
      const newVerificationId =
        Math.max(...verifications.map((v) => v.id), 0) + 1;

      // Create user object with restaurant_admin role
      const newUser = {
        id: newUserId,
        name: registrationData.fullName,
        email: registrationData.email,
        phone: registrationData.phoneNumber,
        password: registrationData.password, // In real app, this would be hashed
        role: "restaurant_admin",
        restaurantId: newRestaurantId,
        createdAt: new Date().toISOString(),
      };

      // Create restaurant object with PENDING status
      const newRestaurant = {
        id: newRestaurantId,
        name: registrationData.restaurantName,
        email: registrationData.businessEmail,
        phone: registrationData.businessPhone,
        logo: registrationData.logo || "",
        slogan: registrationData.slogan || "",
        banner: registrationData.banner || "",
        status: "pending", // CRITICAL: New registrations start as pending
        ownerId: newUserId,
        createdAt: new Date().toISOString(),
      };

      // Create restaurant location
      const newLocation = {
        id: newLocationId,
        restaurantId: newRestaurantId,
        country: registrationData.country,
        city: registrationData.city,
        subCity: registrationData.subCity,
        streetAddress: registrationData.streetAddress,
        mapLink: registrationData.googleMapsLink,
      };

      // Create restaurant verification with PENDING status
      const newVerification = {
        id: newVerificationId,
        restaurantId: newRestaurantId,
        ownerName: registrationData.ownerName,
        businessLicenseNumber: registrationData.businessLicenseNumber,
        tinNumber: registrationData.tinNumber,
        businessLicenseDocument:
          registrationData.businessLicenseDocument?.name || "license.pdf",
        documentOfLegalRepresentative: "legal_rep.pdf", // Default for now
        verificationStatus: "pending", // CRITICAL: Starts as pending
        reviewedBy: null,
        reviewedAt: null,
      };

      // Save all data to JSON server
      const [
        userSaveResponse,
        restaurantSaveResponse,
        locationSaveResponse,
        verificationSaveResponse,
      ] = await Promise.all([
        fetch(`${API_BASE_URL}/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        }),
        fetch(`${API_BASE_URL}/restaurants`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRestaurant),
        }),
        fetch(`${API_BASE_URL}/restaurantLocations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newLocation),
        }),
        fetch(`${API_BASE_URL}/restaurantVerifications`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newVerification),
        }),
      ]);

      // Check if all saves were successful
      const allSuccessful = [
        userSaveResponse.ok,
        restaurantSaveResponse.ok,
        locationSaveResponse.ok,
        verificationSaveResponse.ok,
      ].every(Boolean);

      if (allSuccessful) {
        return {
          success: true,
          data: {
            user: { ...newUser, password: undefined }, // Remove password from response
            restaurant: newRestaurant,
            location: newLocation,
            verification: newVerification,
            message:
              "Registration submitted successfully! Your application is now pending review.",
          },
          error: null,
        };
      } else {
        throw new Error("Failed to save registration data");
      }
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        data: null,
        error: "Registration failed. Please try again.",
      };
    }
  },

  async getPendingRegistrations() {
    try {
      await delay();

      const [restaurantsResponse, verificationsResponse, usersResponse] =
        await Promise.all([
          fetch(`${API_BASE_URL}/restaurants`),
          fetch(`${API_BASE_URL}/restaurantVerifications`),
          fetch(`${API_BASE_URL}/users`),
        ]);

      const restaurants = await restaurantsResponse.json();
      const verifications = await verificationsResponse.json();
      const users = await usersResponse.json();

      // Get all pending restaurants with their verification and user data
      const pendingRegistrations = restaurants
        .filter((restaurant) => restaurant.status === "pending")
        .map((restaurant) => {
          const verification = verifications.find(
            (v) => v.restaurantId === restaurant.id,
          );
          const user = users.find((u) => u.id === restaurant.ownerId);

          return {
            ...restaurant,
            verification,
            owner: user ? { ...user, password: undefined } : null,
          };
        });

      return {
        success: true,
        data: pendingRegistrations,
        error: null,
      };
    } catch (error) {
      console.error("Error fetching pending registrations:", error);
      return {
        success: false,
        data: [],
        error: "Failed to fetch pending registrations",
      };
    }
  },

  async approveRegistration(restaurantId, reviewedBy) {
    try {
      await delay();

      // Update restaurant status to active
      const restaurantResponse = await fetch(
        `${API_BASE_URL}/restaurants/${restaurantId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: "active",
            updatedAt: new Date().toISOString(),
          }),
        },
      );

      // Update verification status
      const verificationsResponse = await fetch(
        `${API_BASE_URL}/restaurantVerifications`,
      );
      const verifications = await verificationsResponse.json();
      const verification = verifications.find(
        (v) => v.restaurantId === restaurantId,
      );

      if (verification) {
        await fetch(
          `${API_BASE_URL}/restaurantVerifications/${verification.id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              verificationStatus: "approved",
              reviewedBy: reviewedBy,
              reviewedAt: new Date().toISOString(),
            }),
          },
        );
      }

      const success = restaurantResponse.ok;

      return {
        success,
        data: success
          ? { message: "Registration approved successfully" }
          : null,
        error: success ? null : "Failed to approve registration",
      };
    } catch (error) {
      console.error("Error approving registration:", error);
      return {
        success: false,
        data: null,
        error: "Failed to approve registration",
      };
    }
  },

  async rejectRegistration(
    restaurantId,
    reviewedBy,
    reason = "Rejected by admin",
  ) {
    try {
      await delay();

      // Update restaurant status to suspended/rejected
      const restaurantResponse = await fetch(
        `${API_BASE_URL}/restaurants/${restaurantId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: "suspended",
            updatedAt: new Date().toISOString(),
          }),
        },
      );

      // Update verification status
      const verificationsResponse = await fetch(
        `${API_BASE_URL}/restaurantVerifications`,
      );
      const verifications = await verificationsResponse.json();
      const verification = verifications.find(
        (v) => v.restaurantId === restaurantId,
      );

      if (verification) {
        await fetch(
          `${API_BASE_URL}/restaurantVerifications/${verification.id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              verificationStatus: "rejected",
              reviewedBy: reviewedBy,
              reviewedAt: new Date().toISOString(),
              rejectionReason: reason,
            }),
          },
        );
      }

      const success = restaurantResponse.ok;

      return {
        success,
        data: success
          ? { message: "Registration rejected successfully" }
          : null,
        error: success ? null : "Failed to reject registration",
      };
    } catch (error) {
      console.error("Error rejecting registration:", error);
      return {
        success: false,
        data: null,
        error: "Failed to reject registration",
      };
    }
  },
};

export default registrationService;
