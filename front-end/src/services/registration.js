import { API_BASE_URL } from "../env";

const delay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const registrationService = {
  // =========================================
  // SUBMIT RESTAURANT REGISTRATION
  // =========================================
  async submitRegistration(registrationData) {
    try {
      await delay();

      // =========================================
      // FETCH EXISTING DATA
      // =========================================
      const [
        usersResponse,
        restaurantsResponse,
        locationsResponse,
        verificationsResponse,
      ] = await Promise.all([
        fetch(`${API_BASE_URL}/users`),
        fetch(`${API_BASE_URL}/restaurants`),
        fetch(`${API_BASE_URL}/restaurant_locations`),
        fetch(`${API_BASE_URL}/restaurant_verifications`),
      ]);

      if (
        !usersResponse.ok ||
        !restaurantsResponse.ok ||
        !locationsResponse.ok ||
        !verificationsResponse.ok
      ) {
        throw new Error("Failed to fetch existing data");
      }

      const users = await usersResponse.json();
      const restaurants = await restaurantsResponse.json();
      const locations = await locationsResponse.json();
      const verifications = await verificationsResponse.json();

      // =========================================
      // CHECK DUPLICATE EMAIL
      // =========================================
      const existingUser = users.find(
        (user) => user.email === registrationData.email
      );

      if (existingUser) {
        return {
          success: false,
          data: null,
          error: "Email already registered",
        };
      }

      // =========================================
      // GENERATE IDS
      // =========================================
      const newUserId =
        Math.max(0, ...users.map((u) => Number(u.id))) + 1;

      const newRestaurantId =
        Math.max(0, ...restaurants.map((r) => Number(r.id))) + 1;

      const newLocationId =
        Math.max(0, ...locations.map((l) => Number(l.id))) + 1;

      const newVerificationId =
        Math.max(0, ...verifications.map((v) => Number(v.id))) + 1;

      // =========================================
      // CREATE USER
      // =========================================
      const newUser = {
        id: newUserId,
        name: registrationData.owner_name,
        email: registrationData.email,
        phone: registrationData.phone,
        password: registrationData.password,
        role: "restaurant_admin",
        restaurant_id: newRestaurantId,
        created_at: new Date().toISOString(),
      };

      // =========================================
      // CREATE RESTAURANT
      // =========================================
      const newRestaurant = {
        id: newRestaurantId,
        name: registrationData.restaurant_name,
        email: registrationData.business_email,
        phone: registrationData.business_phone,
        description: registrationData.description || "",
        logo: registrationData.logo || "",
        banner: registrationData.banner || "",
        qr_code: registrationData.qr_code || "",
        status: "pending",
        owner_id: newUserId,
        created_at: new Date().toISOString(),
      };

      // =========================================
      // CREATE LOCATION
      // =========================================
      const newLocation = {
        id: newLocationId,
        restaurant_id: newRestaurantId,
        country: registrationData.country,
        city: registrationData.city,
        sub_city: registrationData.sub_city,
        street_address: registrationData.street_address,
        map_link: registrationData.map_link,
      };

      // =========================================
      // CREATE VERIFICATION
      // =========================================
      const newVerification = {
        id: newVerificationId,
        restaurant_id: newRestaurantId,
        owner_name: registrationData.owner_name,
        business_license_number:
          registrationData.business_license_number,

        tin_number: registrationData.tin_number,

        business_license_document:
          registrationData.business_license_document || "",

        legal_document:
          registrationData.legal_document || "",

        verification_status: "pending",

        reviewed_by: null,
        reviewed_at: null,
      };

      // =========================================
      // SAVE DATA
      // =========================================
      const [
        userSave,
        restaurantSave,
        locationSave,
        verificationSave,
      ] = await Promise.all([
        fetch(`${API_BASE_URL}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }),

        fetch(`${API_BASE_URL}/restaurants`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRestaurant),
        }),

        fetch(`${API_BASE_URL}/restaurant_locations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newLocation),
        }),

        fetch(`${API_BASE_URL}/restaurant_verifications`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newVerification),
        }),
      ]);

      const allSaved =
        userSave.ok &&
        restaurantSave.ok &&
        locationSave.ok &&
        verificationSave.ok;

      if (!allSaved) {
        throw new Error("Failed to save registration");
      }

      // REMOVE PASSWORD FROM RESPONSE
      const { password: _, ...safeUser } = newUser;

      return {
        success: true,
        data: {
          user: safeUser,
          restaurant: newRestaurant,
          location: newLocation,
          verification: newVerification,
          message:
            "Restaurant registration submitted successfully.",
        },
        error: null,
      };
    } catch (error) {
      console.error("Registration error:", error);

      return {
        success: false,
        data: null,
        error: "Registration failed. Please try again.",
      };
    }
  },

  // =========================================
  // GET PENDING REGISTRATIONS
  // =========================================
  async getPendingRegistrations() {
    try {
      await delay();

      const [
        restaurantsResponse,
        verificationsResponse,
        usersResponse,
        locationsResponse,
      ] = await Promise.all([
        fetch(`${API_BASE_URL}/restaurants`),
        fetch(`${API_BASE_URL}/restaurant_verifications`),
        fetch(`${API_BASE_URL}/users`),
        fetch(`${API_BASE_URL}/restaurant_locations`),
      ]);

      const restaurants = await restaurantsResponse.json();
      const verifications = await verificationsResponse.json();
      const users = await usersResponse.json();
      const locations = await locationsResponse.json();

      const pendingRestaurants = restaurants
        .filter(
          (restaurant) => restaurant.status === "pending"
        )
        .map((restaurant) => {
          const verification = verifications.find(
            (v) =>
              Number(v.restaurant_id) ===
              Number(restaurant.id)
          );

          const owner = users.find(
            (u) =>
              Number(u.id) ===
              Number(restaurant.owner_id)
          );

          const location = locations.find(
            (l) =>
              Number(l.restaurant_id) ===
              Number(restaurant.id)
          );

          return {
            ...restaurant,
            verification,
            owner,
            location,
          };
        });

      return {
        success: true,
        data: pendingRestaurants,
        error: null,
      };
    } catch (error) {
      console.error(
        "Pending registration fetch error:",
        error
      );

      return {
        success: false,
        data: [],
        error: "Failed to fetch registrations",
      };
    }
  },

  // =========================================
  // APPROVE REGISTRATION
  // =========================================
  async approveRegistration(
    restaurantId,
    platformAdminId
  ) {
    try {
      await delay();

      // UPDATE RESTAURANT
      const restaurantResponse = await fetch(
        `${API_BASE_URL}/restaurants/${restaurantId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "active",
          }),
        }
      );

      // GET VERIFICATION
      const verificationResponse = await fetch(
        `${API_BASE_URL}/restaurant_verifications`
      );

      const verifications =
        await verificationResponse.json();

      const verification = verifications.find(
        (v) =>
          Number(v.restaurant_id) ===
          Number(restaurantId)
      );

      // UPDATE VERIFICATION
      if (verification) {
        await fetch(
          `${API_BASE_URL}/restaurant_verifications/${verification.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              verification_status: "approved",
              reviewed_by: platformAdminId,
              reviewed_at: new Date().toISOString(),
            }),
          }
        );
      }

      return {
        success: restaurantResponse.ok,
        data: {
          message:
            "Restaurant approved successfully",
        },
        error: restaurantResponse.ok
          ? null
          : "Approval failed",
      };
    } catch (error) {
      console.error("Approval error:", error);

      return {
        success: false,
        data: null,
        error: "Failed to approve registration",
      };
    }
  },

  // =========================================
  // REJECT REGISTRATION
  // =========================================
  async rejectRegistration(
    restaurantId,
    platformAdminId,
    reason = "Rejected by platform admin"
  ) {
    try {
      await delay();

      // UPDATE RESTAURANT STATUS
      const restaurantResponse = await fetch(
        `${API_BASE_URL}/restaurants/${restaurantId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "suspended",
          }),
        }
      );

      // GET VERIFICATION
      const verificationResponse = await fetch(
        `${API_BASE_URL}/restaurant_verifications`
      );

      const verifications =
        await verificationResponse.json();

      const verification = verifications.find(
        (v) =>
          Number(v.restaurant_id) ===
          Number(restaurantId)
      );

      // UPDATE VERIFICATION
      if (verification) {
        await fetch(
          `${API_BASE_URL}/restaurant_verifications/${verification.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              verification_status: "rejected",
              reviewed_by: platformAdminId,
              reviewed_at: new Date().toISOString(),
              rejection_reason: reason,
            }),
          }
        );
      }

      return {
        success: restaurantResponse.ok,
        data: {
          message:
            "Restaurant rejected successfully",
        },
        error: restaurantResponse.ok
          ? null
          : "Rejection failed",
      };
    } catch (error) {
      console.error("Rejection error:", error);

      return {
        success: false,
        data: null,
        error: "Failed to reject registration",
      };
    }
  },
};

export default registrationService;