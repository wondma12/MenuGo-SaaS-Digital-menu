import prisma from '../config/prisma.js';


export const createCategory = async (categoryData, userId, restaurantId) => {
  const { name, display_order = 0 } = categoryData;

  // Check if category already exists in this restaurant
  const existingCategory = await prisma.categories.findFirst({
    where: {
      name,
      restaurant_id: restaurantId
    }
  });

  if (existingCategory) {
    throw new Error('Category with this name already exists in your restaurant');
  }

  const category = await prisma.categories.create({
    data: {
      name,
      display_order,
      restaurant_id: restaurantId,
      created_by: userId
    },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });

  return category;
};

export const getAllCategories = async (restaurantId, page = 1, limit = 50) => {
  const skip = (page - 1) * limit;

  const [categories, total] = await Promise.all([
    prisma.categories.findMany({
      where: { restaurant_id: restaurantId },
      include: {
        users: {
          select: {
            id: true,
            name: true
          }
        },
        _count: {
          select: {
            menu_items: true
          }
        }
      },
      orderBy: [
        { display_order: 'asc' },
        { created_at: 'desc' }
      ],
      skip,
      take: limit
    }),
    prisma.categories.count({
      where: { restaurant_id: restaurantId }
    })
  ]);

  return {
    categories,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const getCategoryById = async (categoryId, restaurantId) => {
  const category = await prisma.categories.findFirst({
    where: {
      id: categoryId,
      restaurant_id: restaurantId
    },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      menu_items: {
        where: { status: 'available' },
        orderBy: { created_at: 'desc' }
      }
    }
  });

  if (!category) {
    throw new Error('Category not found in your restaurant');
  }

  return category;
};

export const updateCategory = async (categoryId, restaurantId, updateData) => {
  const category = await prisma.categories.findFirst({
    where: {
      id: categoryId,
      restaurant_id: restaurantId
    }
  });

  if (!category) {
    throw new Error('Category not found in your restaurant');
  }

  const updatedCategory = await prisma.categories.update({
    where: { id: categoryId },
    data: updateData,
    include: {
      users: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  return updatedCategory;
};

export const deleteCategory = async (categoryId, restaurantId) => {
  // Check if category exists and belongs to restaurant
  const category = await prisma.categories.findFirst({
    where: {
      id: categoryId,
      restaurant_id: restaurantId
    },
    include: {
      menu_items: {
        select: { id: true }
      }
    }
  });

  if (!category) {
    throw new Error('Category not found in your restaurant');
  }

  if (category.menu_items.length > 0) {
    throw new Error('Cannot delete category with existing menu items. Remove or reassign menu items first.');
  }

  await prisma.categories.delete({
    where: { id: categoryId }
  });

  return { message: 'Category deleted successfully' };
};


export const createMenuItem = async (itemData, userId, restaurantId) => {
  const { 
    category_id, 
    name, 
    description, 
    price, 
    image, 
    preparation_time, 
    is_featured = false,
    status = 'available'
  } = itemData;

  // Verify category belongs to restaurant
  const category = await prisma.categories.findFirst({
    where: {
      id: category_id,
      restaurant_id: restaurantId
    }
  });

  if (!category) {
    throw new Error('Category not found in your restaurant');
  }

  // Check if item with same name exists in this category
  const existingItem = await prisma.menu_items.findFirst({
    where: {
      name,
      category_id,
      categories: {
        restaurant_id: restaurantId
      }
    }
  });

  if (existingItem) {
    throw new Error('Menu item with this name already exists in this category');
  }

  const menuItem = await prisma.menu_items.create({
    data: {
      category_id,
      name,
      description,
      price: parseFloat(price),
      image,
      preparation_time: parseInt(preparation_time),
      is_featured,
      status,
      created_by: userId
    },
    include: {
      categories: {
        include: {
          restaurants: {
            select: {
              id: true,
              name: true
            }
          }
        }
      },
      users: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  return menuItem;
};

export const getAllMenuItems = async (restaurantId, filters = {}, page = 1, limit = 50) => {
  const skip = (page - 1) * limit;
  
  const where = {
    categories: {
      restaurant_id: restaurantId
    }
  };

  // Apply filters
  if (filters.category_id) {
    where.category_id = filters.category_id;
  }

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.is_featured !== undefined) {
    where.is_featured = filters.is_featured === 'true';
  }

  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search } },
      { description: { contains: filters.search } }
    ];
  }

  if (filters.min_price || filters.max_price) {
    where.price = {};
    if (filters.min_price) where.price.gte = parseFloat(filters.min_price);
    if (filters.max_price) where.price.lte = parseFloat(filters.max_price);
  }

  const [menuItems, total] = await Promise.all([
    prisma.menu_items.findMany({
      where,
      include: {
        categories: {
          select: {
            id: true,
            name: true,
            display_order: true
          }
        },
        users: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: [
        { is_featured: 'desc' },
        { created_at: 'desc' }
      ],
      skip,
      take: limit
    }),
    prisma.menu_items.count({ where })
  ]);

  return {
    menuItems,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const getMenuItemById = async (itemId, restaurantId) => {
  const menuItem = await prisma.menu_items.findFirst({
    where: {
      id: itemId,
      categories: {
        restaurant_id: restaurantId
      }
    },
    include: {
      categories: {
        include: {
          restaurants: {
            select: {
              id: true,
              name: true,
              logo: true
            }
          }
        }
      },
      users: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  if (!menuItem) {
    throw new Error('Menu item not found in your restaurant');
  }

  return menuItem;
};

export const updateMenuItem = async (itemId, restaurantId, updateData) => {
  // Verify item exists and belongs to restaurant
  const existingItem = await prisma.menu_items.findFirst({
    where: {
      id: itemId,
      categories: {
        restaurant_id: restaurantId
      }
    }
  });

  if (!existingItem) {
    throw new Error('Menu item not found in your restaurant');
  }

  // If updating category, verify new category belongs to restaurant
  if (updateData.category_id) {
    const category = await prisma.categories.findFirst({
      where: {
        id: updateData.category_id,
        restaurant_id: restaurantId
      }
    });

    if (!category) {
      throw new Error('New category not found in your restaurant');
    }
  }

  // Parse price if provided
  if (updateData.price) {
    updateData.price = parseFloat(updateData.price);
  }

  const updatedItem = await prisma.menu_items.update({
    where: { id: itemId },
    data: updateData,
    include: {
      categories: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  return updatedItem;
};

export const deleteMenuItem = async (itemId, restaurantId) => {
  // Verify item exists and belongs to restaurant
  const menuItem = await prisma.menu_items.findFirst({
    where: {
      id: itemId,
      categories: {
        restaurant_id: restaurantId
      }
    },
    include: {
      order_items: {
        select: { id: true }
      }
    }
  });

  if (!menuItem) {
    throw new Error('Menu item not found in your restaurant');
  }

  if (menuItem.order_items.length > 0) {
    throw new Error('Cannot delete menu item that has been ordered. Consider marking it as unavailable instead.');
  }

  await prisma.menu_items.delete({
    where: { id: itemId }
  });

  return { message: 'Menu item deleted successfully' };
};

export const updateMenuItemStatus = async (itemId, restaurantId, status) => {
  const menuItem = await prisma.menu_items.findFirst({
    where: {
      id: itemId,
      categories: {
        restaurant_id: restaurantId
      }
    }
  });

  if (!menuItem) {
    throw new Error('Menu item not found in your restaurant');
  }

  const updatedItem = await prisma.menu_items.update({
    where: { id: itemId },
    data: { status },
    include: {
      categories: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  return updatedItem;
};

export const getFeaturedItems = async (restaurantId, limit = 10) => {
  const featuredItems = await prisma.menu_items.findMany({
    where: {
      categories: {
        restaurant_id: restaurantId
      },
      is_featured: true,
      status: 'available'
    },
    include: {
      categories: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: { created_at: 'desc' },
    take: limit
  });

  return featuredItems;
};

export const getMenuByCategory = async (restaurantId) => {
  const categories = await prisma.categories.findMany({
    where: {
      restaurant_id: restaurantId
    },
    include: {
      menu_items: {
        where: { status: 'available' },
        orderBy: { created_at: 'desc' }
      }
    },
    orderBy: { display_order: 'asc' }
  });

  return categories;
};