import React from "react";
import MenuItemRow from "./MenuItemRow";

const MenuItemList = ({
  items,
  onEdit,
  onDelete,
  onToggleAvailability,
  searchTerm,
  categoryFilter,
}) => {
  const filteredItems = items.filter((item) => {
    const matchesSearch = [item.name, item.description, item.category]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter
      ? item.category === categoryFilter
      : true;
    return matchesSearch && matchesCategory;
  });

  if (!filteredItems.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-500">
        No matching menu items found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm text-slate-800">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
          <tr>
            <th className="px-4 py-3">Item</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Availability</th>
            <th className="px-4 py-3">Popular</th>
            <th className="px-4 py-3">Updated</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <MenuItemRow
              key={item.id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleAvailability={onToggleAvailability}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuItemList;
