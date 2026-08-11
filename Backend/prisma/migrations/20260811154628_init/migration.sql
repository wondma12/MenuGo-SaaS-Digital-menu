-- CreateEnum
CREATE TYPE "orders_order_type" AS ENUM ('dine_in', 'takeaway');

-- CreateEnum
CREATE TYPE "menu_items_status" AS ENUM ('available', 'unavailable');

-- CreateEnum
CREATE TYPE "orders_status" AS ENUM ('pending', 'verified', 'preparing', 'served');

-- CreateEnum
CREATE TYPE "users_role" AS ENUM ('platform_admin', 'restaurant_admin', 'waiter');

-- CreateEnum
CREATE TYPE "restaurant_verification_verification_status" AS ENUM ('pending', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "restaurants_status" AS ENUM ('pending', 'active', 'suspended');

-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "display_order" INTEGER DEFAULT 0,
    "created_by" UUID,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedbacks" (
    "id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "customer_name" VARCHAR(255),
    "rating" INTEGER,
    "comment" TEXT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_items" (
    "id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "image" VARCHAR(500),
    "status" "menu_items_status" DEFAULT 'available',
    "preparation_time" INTEGER,
    "is_featured" BOOLEAN DEFAULT false,
    "created_by" UUID,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "menu_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "menu_item_id" UUID NOT NULL,
    "item_name" VARCHAR(255),
    "item_price" DECIMAL(10,2),
    "quantity" INTEGER DEFAULT 1,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "served_by" UUID,
    "order_number" VARCHAR(100),
    "table_number" VARCHAR(50),
    "order_type" "orders_order_type" DEFAULT 'dine_in',
    "status" "orders_status" DEFAULT 'pending',
    "customer_note" TEXT,
    "total_price" DECIMAL(10,2) DEFAULT 0.00,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qr_codes" (
    "id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "qr_identifier" VARCHAR(255),
    "qr_image_url" TEXT,
    "qr_type" VARCHAR(100),
    "is_active" BOOLEAN DEFAULT true,
    "scan_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "qr_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_location" (
    "id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "country" VARCHAR(100),
    "city" VARCHAR(100),
    "sub_city" VARCHAR(100),
    "street_address" VARCHAR(255),
    "map_link" VARCHAR(500) NOT NULL,
    "latitude" DECIMAL(10,8),
    "longitude" DECIMAL(11,8),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "restaurant_location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_verification" (
    "id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "owner_name" VARCHAR(255),
    "business_license_number" VARCHAR(255),
    "tin_number" VARCHAR(255),
    "business_license_document" VARCHAR(500),
    "legal_document" VARCHAR(500),
    "verification_status" "restaurant_verification_verification_status" DEFAULT 'pending',
    "reviewed_by" UUID,
    "reviewed_at" TIMESTAMP(0),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "restaurant_verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurants" (
    "id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "phone" VARCHAR(50),
    "logo" VARCHAR(500),
    "banner" VARCHAR(500),
    "slogan" VARCHAR(255),
    "description" TEXT,
    "website_url" VARCHAR(500),
    "qr_code" VARCHAR(500),
    "subscription_plan" VARCHAR(100),
    "subscription_start" DATE,
    "subscription_end" DATE,
    "status" "restaurants_status" DEFAULT 'pending',
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" UUID NOT NULL,
    "platform_name" VARCHAR(255) NOT NULL,
    "support_email" VARCHAR(255),
    "contact_phone" VARCHAR(50),
    "allow_self_registration" BOOLEAN DEFAULT true,
    "require_verification_documents" BOOLEAN DEFAULT true,
    "minimum_password_length" INTEGER DEFAULT 8,
    "session_timeout" INTEGER DEFAULT 30,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "restaurant_id" UUID,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(50),
    "password" VARCHAR(255) NOT NULL,
    "role" "users_role" NOT NULL,
    "profile_image" VARCHAR(500),
    "is_active" BOOLEAN DEFAULT true,
    "is_email_verified" BOOLEAN DEFAULT false,
    "reset_password_token" VARCHAR(255),
    "reset_password_expires" TIMESTAMP(0),
    "last_login" TIMESTAMP(0),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "fk_category_creator" ON "categories"("created_by");

-- CreateIndex
CREATE INDEX "fk_category_restaurant" ON "categories"("restaurant_id");

-- CreateIndex
CREATE INDEX "fk_feedback_restaurant" ON "feedbacks"("restaurant_id");

-- CreateIndex
CREATE INDEX "fk_menu_category" ON "menu_items"("category_id");

-- CreateIndex
CREATE INDEX "fk_menu_creator" ON "menu_items"("created_by");

-- CreateIndex
CREATE INDEX "fk_orderitem_menu" ON "order_items"("menu_item_id");

-- CreateIndex
CREATE INDEX "fk_orderitem_order" ON "order_items"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_number" ON "orders"("order_number");

-- CreateIndex
CREATE INDEX "fk_order_restaurant" ON "orders"("restaurant_id");

-- CreateIndex
CREATE INDEX "fk_order_waiter" ON "orders"("served_by");

-- CreateIndex
CREATE UNIQUE INDEX "qr_identifier" ON "qr_codes"("qr_identifier");

-- CreateIndex
CREATE INDEX "fk_qr_restaurant" ON "qr_codes"("restaurant_id");

-- CreateIndex
CREATE INDEX "fk_location_restaurant" ON "restaurant_location"("restaurant_id");

-- CreateIndex
CREATE INDEX "fk_verification_restaurant" ON "restaurant_verification"("restaurant_id");

-- CreateIndex
CREATE INDEX "fk_verification_reviewer" ON "restaurant_verification"("reviewed_by");

-- CreateIndex
CREATE INDEX "fk_restaurant_owner" ON "restaurants"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "email" ON "users"("email");

-- CreateIndex
CREATE INDEX "fk_user_restaurant" ON "users"("restaurant_id");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_served_by_fkey" FOREIGN KEY ("served_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "qr_codes" ADD CONSTRAINT "qr_codes_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "restaurant_location" ADD CONSTRAINT "restaurant_location_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "restaurant_verification" ADD CONSTRAINT "restaurant_verification_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "restaurant_verification" ADD CONSTRAINT "restaurant_verification_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE SET NULL ON UPDATE RESTRICT;
