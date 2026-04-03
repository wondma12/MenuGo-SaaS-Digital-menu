menugo/
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   │
│   ├── layouts/
│   │   ├── RootLayout.jsx
│   │   ├── AdminLayout.jsx          # Main admin layout with sidebar
│   │   ├── CustomerLayout.jsx
│   │   └── WaiterLayout.jsx
│   │
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── Dashboard.jsx        # ✅ Beza's Task
│   │   │   ├── MenuManagement.jsx   # ✅ Hayimanot's Task
│   │   │   ├── Orders.jsx           # ✅ Beza's Task
│   │   │   ├── StaffManagement.jsx  # Staff Management
│   │   │   ├── Appearance.jsx       # Restaurant Appearance
│   │   │   ├── QRCodePage.jsx       # QR Code Download
│   │   │   └── Settings.jsx         # Profile Settings
│   │   │
│   │   ├── customer/
│   │   │   └── MenuPage.jsx
│   │   │
│   │   └── waiter/
│   │       └── WaiterOrders.jsx
│   │
│   ├── components/
│   │   ├── ui/                      # Global UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Alert.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── Toggle.jsx
│   │   │   └── ColorPicker.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx
│   │   │   └── Header.jsx
│   │   │
│   │   ├── admin/
│   │   │   ├── dashboard/           # ✅ Beza's Components
│   │   │   │   ├── StatCard.jsx
│   │   │   │   ├── PopularItems.jsx
│   │   │   │   ├── RecentOrders.jsx
│   │   │   │   ├── AnalyticsChart.jsx
│   │   │   │   └── OrdersSummary.jsx
│   │   │   │
│   │   │   ├── orders/              # ✅ Beza's Components
│   │   │   │   ├── OrdersTable.jsx
│   │   │   │   ├── OrderRow.jsx
│   │   │   │   ├── OrderStatusBadge.jsx
│   │   │   │   └── OrderFilter.jsx
│   │   │   │
│   │   │   ├── menu/                # ✅ Hayimanot's Components
│   │   │   │   ├── MenuItemList.jsx
│   │   │   │   ├── MenuItemRow.jsx
│   │   │   │   ├── MenuForm.jsx
│   │   │   │   ├── MenuFormModal.jsx
│   │   │   │   ├── CategoryManager.jsx
│   │   │   │   ├── ImageUpload.jsx
│   │   │   │   ├── AvailabilityToggle.jsx
│   │   │   │   ├── MenuStatsBar.jsx
│   │   │   │   └── EmptyMenuState.jsx
│   │   │   │
│   │   │   ├── staff/               # Staff Management Components
│   │   │   │   ├── StaffList.jsx
│   │   │   │   ├── StaffRow.jsx
│   │   │   │   ├── AddStaffModal.jsx
│   │   │   │   ├── RoleBadge.jsx
│   │   │   │   └── StaffStats.jsx
│   │   │   │
│   │   │   ├── appearance/          # Appearance Components
│   │   │   │   ├── LogoUpload.jsx
│   │   │   │   ├── ColorCustomizer.jsx
│   │   │   │   ├── BackgroundUpload.jsx
│   │   │   │   ├── ThemePreview.jsx
│   │   │   │   └── RestaurantInfoForm.jsx
│   │   │   │
│   │   │   └── settings/            # Settings Components
│   │   │       ├── ProfileForm.jsx
│   │   │       ├── ChangePasswordForm.jsx
│   │   │       ├── SubscriptionCard.jsx
│   │   │       └── DeleteAccountModal.jsx
│   │   │
│   │   ├── customer/
│   │   │   ├── MenuItemCard.jsx
│   │   │   └── CategoryFilter.jsx
│   │   │
│   │   └── waiter/
│   │       └── OrderSelector.jsx
│   │
│   ├── hooks/
│   │   ├── useMenu.js               # ✅ Hayimanot's Hook
│   │   ├── useOrders.js             # ✅ Beza's Hook
│   │   ├── useStaff.js
│   │   ├── useRestaurant.js
│   │   └── useAuth.js
│   │
│   ├── context/
│   │   ├── OrderContext.jsx         # ✅ Beza's Context
│   │   ├── StaffContext.jsx
│   │   ├── RestaurantContext.jsx
│   │   └── AuthContext.jsx
│   │
│   ├── services/
│   │   ├── menuService.js
│   │   ├── orderService.js
│   │   ├── staffService.js
│   │   └── storageService.js
│   │
│   ├── utils/
│   │   ├── mockData.js
│   │   ├── formatters.js
│   │   └── validators.js
│   │
│   └── styles/
│       └── globals.css
│
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── index.html   ... based on this folder and file structure please give me complete backend folder and file structure (node+express)  and complate database.sql  ?



menugo-backend/
├── src/
│   ├── index.js                    # Entry point
│   ├── app.js                      # Express app setup
│   │
│   ├── config/
│   │   ├── database.js             # Database connection
│   │   └── dotenv.js               # Environment variables
│   │
│   ├── models/
│   │   ├── User.js                 # User model
│   │   ├── Restaurant.js           # Restaurant model
│   │   ├── MenuItem.js             # Menu item model
│   │   ├── Category.js             # Category model
│   │   ├── Order.js                # Order model
│   │   ├── Staff.js                # Staff model
│   │   └── QRCode.js               # QR Code model
│   │
│   ├── controllers/
│   │   ├── authController.js       # Authentication
│   │   ├── menuController.js       # Menu operations
│   │   ├── orderController.js      # Order operations
│   │   ├── staffController.js      # Staff management
│   │   ├── restaurantController.js # Restaurant settings
│   │   └── qrController.js         # QR code generation
│   │
│   ├── routes/
│   │   ├── authRoutes.js           # Auth endpoints
│   │   ├── menuRoutes.js           # Menu endpoints
│   │   ├── orderRoutes.js          # Order endpoints
│   │   ├── staffRoutes.js          # Staff endpoints
│   │   ├── restaurantRoutes.js     # Restaurant endpoints
│   │   └── qrRoutes.js             # QR endpoints
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js       # JWT verification
│   │   ├── errorMiddleware.js      # Error handling
│   │   └── validationMiddleware.js # Input validation
│   │
│   ├── utils/
│   │   ├── generateQR.js           # QR code generator
│   │   ├── jwtHelper.js            # JWT helpers
│   │   └── bcryptHelper.js         # Password hashing
│   │
│   └── validators/
│       ├── authValidator.js
│       ├── menuValidator.js
│       └── orderValidator.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── database.sql
-- Create Database
CREATE DATABASE IF NOT EXISTS menugo_db;
USE menugo_db;

-- =============================================
-- 1. USERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'restaurant_admin', 'waiter', 'customer') DEFAULT 'customer',
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- =============================================
-- 2. RESTAURANTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS restaurants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(100),
    logo_url VARCHAR(255),
    background_url VARCHAR(255),
    primary_color VARCHAR(7) DEFAULT '#4f46e5',
    secondary_color VARCHAR(7) DEFAULT '#6b7280',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_owner (owner_id),
    INDEX idx_is_active (is_active)
);

-- =============================================
-- 3. CATEGORIES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
    INDEX idx_restaurant (restaurant_id),
    UNIQUE KEY unique_category (restaurant_id, name)
);

-- =============================================
-- 4. MENU_ITEMS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS menu_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_id INT NOT NULL,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    is_available BOOLEAN DEFAULT TRUE,
    is_popular BOOLEAN DEFAULT FALSE,
    order_count INT DEFAULT 0,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    INDEX idx_restaurant (restaurant_id),
    INDEX idx_category (category_id),
    INDEX idx_is_available (is_available),
    INDEX idx_is_popular (is_popular)
);

-- =============================================
-- 5. STAFF TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS staff (
    id INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_id INT NOT NULL,
    user_id INT NOT NULL,
    role ENUM('manager', 'waiter') DEFAULT 'waiter',
    status ENUM('active', 'inactive') DEFAULT 'active',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_restaurant (restaurant_id),
    INDEX idx_user (user_id),
    UNIQUE KEY unique_staff (restaurant_id, user_id)
);

-- =============================================
-- 6. ORDERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_id INT NOT NULL,
    table_number INT NOT NULL,
    customer_name VARCHAR(100),
    status ENUM('pending', 'verified', 'preparing', 'ready', 'served', 'cancelled') DEFAULT 'pending',
    total_amount DECIMAL(10, 2) NOT NULL,
    special_instructions TEXT,
    verified_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
    FOREIGN KEY (verified_by) REFERENCES staff(id) ON DELETE SET NULL,
    INDEX idx_restaurant (restaurant_id),
    INDEX idx_status (status),
    INDEX idx_table (table_number),
    INDEX idx_created (created_at)
);

-- =============================================
-- 7. ORDER_ITEMS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    special_requests TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE,
    INDEX idx_order (order_id),
    INDEX idx_menu_item (menu_item_id)
);

-- =============================================
-- 8. QR_CODES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS qr_codes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_id INT NOT NULL,
    code VARCHAR(255) UNIQUE NOT NULL,
    url VARCHAR(500) NOT NULL,
    scan_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_scanned_at TIMESTAMP NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
    INDEX idx_restaurant (restaurant_id),
    INDEX idx_code (code)
);

-- =============================================
-- 9. RESTAURANT_SETTINGS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS restaurant_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_id INT NOT NULL,
    setting_key VARCHAR(100) NOT NULL,
    setting_value TEXT,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
    INDEX idx_restaurant (restaurant_id),
    UNIQUE KEY unique_setting (restaurant_id, setting_key)
);

-- =============================================
-- 10. ACTIVITY_LOGS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS activity_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_id INT,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    details TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_restaurant (restaurant_id),
    INDEX idx_user (user_id),
    INDEX idx_created (created_at)
);

-- =============================================
-- INSERT SAMPLE DATA
-- =============================================

-- Insert Super Admin
INSERT INTO users (name, email, password_hash, role) VALUES 
('Super Admin', 'admin@menugo.com', '$2a$10$YourHashedPasswordHere', 'super_admin');

-- Insert Restaurant Owner
INSERT INTO users (name, email, password_hash, role) VALUES 
('John Owner', 'owner@restaurant.com', '$2a$10$YourHashedPasswordHere', 'restaurant_admin');

-- Insert Restaurant
INSERT INTO restaurants (owner_id, name, description, address, phone, email, primary_color) VALUES 
(2, 'MenuGo Restaurant', 'Your digital menu platform', '123 Main Street, City', '+1 234 567 8900', 'info@menugorestaurant.com', '#4f46e5');

-- Insert Categories
INSERT INTO categories (restaurant_id, name, display_order) VALUES 
(1, 'Food', 1),
(1, 'Drinks', 2),
(1, 'Desserts', 3),
(1, 'Appetizers', 4),
(1, 'Specials', 5);

-- Insert Menu Items
INSERT INTO menu_items (restaurant_id, category_id, name, description, price, is_available, is_popular, order_count) VALUES 
(1, 1, 'Margherita Pizza', 'Fresh mozzarella, tomato sauce, and basil', 12.99, TRUE, TRUE, 156),
(1, 1, 'Pepperoni Pizza', 'Pepperoni, mozzarella, and tomato sauce', 14.99, TRUE, TRUE, 203),
(1, 4, 'Caesar Salad', 'Crispy romaine, parmesan, croutons', 8.99, TRUE, FALSE, 89),
(1, 2, 'Iced Latte', 'Espresso with cold milk and ice', 4.99, TRUE, TRUE, 178),
(1, 2, 'Fresh Lemonade', 'Hand-squeezed lemons with mint', 3.99, TRUE, FALSE, 67),
(1, 3, 'Chocolate Cake', 'Rich chocolate layer cake', 6.99, TRUE, TRUE, 134),
(1, 3, 'Tiramisu', 'Classic Italian dessert', 7.99, TRUE, FALSE, 92),
(1, 5, 'Chef Special Burger', 'Double patty with special sauce', 13.99, TRUE, TRUE, 198);

-- Insert Staff
INSERT INTO staff (restaurant_id, user_id, role) VALUES 
(1, 2, 'manager');

-- Insert QR Code
INSERT INTO qr_codes (restaurant_id, code, url) VALUES 
(1, 'restaurant_001_uuid', 'https://menugo.app/restaurant_001');

-- =============================================
-- STORED PROCEDURES
-- =============================================

-- Get Dashboard Statistics
DELIMITER //
CREATE PROCEDURE GetDashboardStats(IN p_restaurant_id INT)
BEGIN
    -- Total menu items
    SELECT COUNT(*) as total_menu_items FROM menu_items WHERE restaurant_id = p_restaurant_id;
    
    -- Total orders today
    SELECT COUNT(*) as orders_today FROM orders 
    WHERE restaurant_id = p_restaurant_id AND DATE(created_at) = CURDATE();
    
    -- Popular items
    SELECT name, order_count FROM menu_items 
    WHERE restaurant_id = p_restaurant_id 
    ORDER BY order_count DESC LIMIT 5;
    
    -- Order status summary
    SELECT status, COUNT(*) as count FROM orders 
    WHERE restaurant_id = p_restaurant_id 
    GROUP BY status;
END //
DELIMITER ;

-- Get Menu Items with Category
DELIMITER //
CREATE PROCEDURE GetMenuItemsWithCategory(IN p_restaurant_id INT)
BEGIN
    SELECT m.*, c.name as category_name 
    FROM menu_items m
    JOIN categories c ON m.category_id = c.id
    WHERE m.restaurant_id = p_restaurant_id
    ORDER BY c.display_order, m.display_order;
END //
DELIMITER ;

-- =============================================
-- TRIGGERS
-- =============================================

-- Update order count when order is placed
DELIMITER //
CREATE TRIGGER update_order_count
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE menu_items 
    SET order_count = order_count + NEW.quantity 
    WHERE id = NEW.menu_item_id;
END //
DELIMITER ;

-- Update QR code scan count
DELIMITER //
CREATE TRIGGER update_qr_scan
BEFORE UPDATE ON qr_codes
FOR EACH ROW
BEGIN
    IF NEW.scan_count != OLD.scan_count THEN
        SET NEW.last_scanned_at = NOW();
    END IF;
END //
DELIMITER ;