import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MenuProvider } from './context/MenuContext';
import MenuManagement from './pages/admin/MenuManagement';
import Button from './global-component/ui/button';
import MenuCard from './global-component/ui/menucard';

// Sample menu items for display
const menuItems = [
  {
    id: 1,
    title: "BBQ Ribs Plate",
    description: "Slow-cooked, fall-off-the-bone pork ribs glazed in smoky sauce.",
    price: "$14.99",
    category: "Main Dish",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400",
  },
  {
    id: 2,
    title: "Caesar Salad",
    description: "Fresh romaine lettuce with parmesan cheese and croutons.",
    price: "$8.99",
    category: "Appetizer",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54dd8a9?w=400",
  },
  {
    id: 3,
    title: "Iced Latte",
    description: "Smooth espresso blended with cold milk.",
    price: "$4.99",
    category: "Beverage",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
  },
  {
    id: 4,
    title: "Chocolate Cake",
    description: "Rich chocolate layer cake with ganache.",
    price: "$6.99",
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
  }
];
 export default function App() {
  return (
    <MenuProvider>
      <div className="min-h-screen bg-gray-50">
        
        <Routes>
          <Route path="/" element={<MenuManagement />} />
          <Route path="/admin/menu" element={<MenuManagement />} />
        </Routes>

        {/* Demo Section */}
        <div className="border-t mt-8 pt-8">
          <h1 className="text-3xl font-bold text-center text-blue-900 mb-4">
            MenuGo Digital Menu Demo
          </h1>

          <div className="flex justify-center mb-4">
            <Button
              className="btn-primary"
              label="Click me"
              onClick={() => console.log("Clicked!")}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 p-6">
            {menuItems.map((item) => (
              <MenuCard
                key={item.id}
                image={item.image}
                title={item.title}
                description={item.description}
                price={item.price}
                category={item.category}
                onOrder={() => console.log(`Ordered: ${item.title}`)}
              />
            ))}
          </div>
        </div>

      </div>
    </MenuProvider>
  );
}
