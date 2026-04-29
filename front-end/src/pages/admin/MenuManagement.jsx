import React, { useEffect, useMemo, useState } from "react";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import Button from "../../components/ui/button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Card from "../../components/ui/card";
import CreateMenuItemModal from "../../components/admin/menu/CreateMenuItemModal";
import MenuItemList from "../../components/admin/menu/MenuItemList";
import menuService from "../../services/menuService";
import { useDebounce } from "../../hooks/useDebounce";

const MenuManagement = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  const loadData = async () => {
    const [menuResponse, categoriesResponse] = await Promise.all([
      menuService.getMenuItems(),
      menuService.getCategories(),
    ]);

    if (menuResponse.success) {
      setItems(menuResponse.data);
    }
    if (categoriesResponse.success) {
      setCategories(categoriesResponse.data);
      if (!categoryFilter && categoriesResponse.data.length) {
        setCategoryFilter(categoriesResponse.data[0]);
      }
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = (item = null) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleSaveItem = async (payload) => {
    setIsSaving(true);
    const response = selectedItem
      ? await menuService.updateMenuItem(selectedItem.id, payload)
      : await menuService.createMenuItem(payload);

    if (response.success) {
      await loadData();
      setStatusMessage(
        selectedItem ? "Menu item updated." : "Menu item created.",
      );
      closeModal();
    } else {
      setStatusMessage(response.error || "Failed to save item.");
    }
    setIsSaving(false);
  };

  const handleDeleteItem = async (id) => {
    const response = await menuService.deleteMenuItem(id);
    if (response.success) {
      setItems((current) => current.filter((item) => item.id !== id));
      setStatusMessage("Menu item removed.");
    } else {
      setStatusMessage(response.error || "Failed to delete item.");
    }
  };

  const handleToggleAvailability = async (id) => {
    const item = items.find((item) => item.id === id);
    if (!item) {
      setStatusMessage("Menu item not found.");
      return;
    }

    const response = await menuService.updateAvailability(
      id,
      !item.isAvailable,
    );
    if (response.success) {
      setItems((current) =>
        current.map((item) =>
          item.id === id ? { ...item, isAvailable: !item.isAvailable } : item,
        ),
      );
      setStatusMessage("Availability updated.");
    } else {
      setStatusMessage(response.error || "Failed to update availability.");
    }
  };

  const handleClearFilter = () => {
    setSearchTerm("");
    setCategoryFilter("");
  };

  const filteredCategoryOptions = useMemo(
    () => [
      { label: "All categories", value: "" },
      ...categories.map((category) => ({ label: category, value: category })),
    ],
    [categories],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Menu management
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage your menu items, availability, and categories from one place.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 sm:flex-nowrap sm:items-center">
          <Button onClick={() => openModal()} className="flex items-center">
            <Plus size={18} className="mr-2 flex-shrink-0" /> Add menu item
          </Button>
          <Button
            variant="secondary"
            onClick={handleClearFilter}
            className="flex items-center"
          >
            <SlidersHorizontal size={16} className="mr-2 flex-shrink-0" /> Reset
            filters
          </Button>
        </div>
      </div>

      <Card>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex-1 min-w-0">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Search
            </label>
            <div className="relative rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 shrink-0"
              />
              <Input
                className="pl-9"
                placeholder="Search menu items"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:w-auto lg:flex lg:items-end lg:gap-4">
            <div className="lg:w-48">
              <Select
                label="Category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                options={filteredCategoryOptions}
              />
            </div>
            <div className="lg:pb-2.5">
              <p className="text-sm text-slate-500">
                Showing {items.length} items
              </p>
            </div>
          </div>
        </div>
      </Card>

      {statusMessage ? (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          {statusMessage}
        </div>
      ) : null}

      <MenuItemList
        items={items}
        onEdit={openModal}
        onDelete={handleDeleteItem}
        onToggleAvailability={handleToggleAvailability}
        searchTerm={debouncedSearchTerm}
        categoryFilter={categoryFilter}
      />

      <CreateMenuItemModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveItem}
        categories={categories}
        menuItem={selectedItem}
        isSaving={isSaving}
      />
    </div>
  );
};

export default MenuManagement;
