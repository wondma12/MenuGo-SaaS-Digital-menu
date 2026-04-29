import React, { useState } from "react";
import Card from "../../ui/card";
import Input from "../../ui/Input";
import Button from "../../ui/button";
import { Edit2, Save, X, Building } from "lucide-react";

const RestaurantNameForm = ({ currentName, onUpdate }) => {
  const [name, setName] = useState(currentName || "");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Restaurant name is required");
      return;
    }
    if (name.length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }
    onUpdate(name);
    setIsEditing(false);
    setError("");
  };

  const handleCancel = () => {
    setName(currentName || "");
    setIsEditing(false);
    setError("");
  };

  return (
    <Card title="Restaurant Information">
      {isEditing ? (
        <div className="space-y-4">
          <Input
            label="Restaurant Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter restaurant name"
            error={error}
            icon={<Building size={16} />}
          />
          <div className="flex gap-2">
            <Button
              label="Save"
              variant="primary"
              onClick={handleSubmit}
              icon={Save}
            />
            <Button
              label="Cancel"
              variant="secondary"
              onClick={handleCancel}
              icon={X}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Restaurant Name</p>
            <p className="text-xl font-semibold text-gray-900">
              {name || "Not set"}
            </p>
          </div>
          <Button
            label="Edit"
            variant="secondary"
            onClick={() => setIsEditing(true)}
            icon={Edit2}
          />
        </div>
      )}
    </Card>
  );
};

export default RestaurantNameForm;
