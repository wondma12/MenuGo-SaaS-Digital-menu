// src/components/Restaurant_admin/staff/AddStaffModal.jsx

import React, { useState, useEffect } from 'react'

const AddStaffModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  editingStaff, 
  restaurantId,  // ✅ Add this prop
  isSubmitting = false 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'waiter',
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingStaff) {
      setFormData({
        name: editingStaff.name || '',
        email: editingStaff.email || '',
        phone: editingStaff.phone || '',
        password: '',
        role: editingStaff.role || 'waiter',
      })
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'waiter',
      })
    }
    setErrors({})
  }, [editingStaff, isOpen])

  if (!isOpen) return null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: undefined })
    }
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    
    if (!editingStaff && !formData.password) {
      newErrors.password = 'Password is required'
    } else if (!editingStaff && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validate()) return

    // ✅ Build the correct payload for the backend
    const staffData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '',
      role: 'waiter',  // ✅ Always lowercase for ENUM
      restaurant_id: restaurantId,  // ✅ Include restaurant_id
    }

    // ✅ Only include password if it's provided (for new staff)
    if (formData.password) {
      staffData.password = formData.password
    }

    // ✅ If editing, include the ID
    if (editingStaff) {
      staffData.id = editingStaff.id
    }

    console.log('[AddStaffModal] Submitting staff data:', staffData)
    onSubmit(staffData)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-modal w-full max-w-md p-6 mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-h1 text-h1">
            {editingStaff ? 'Edit Staff Member' : 'Add New Staff'}
          </h2>
          <button
            onClick={onClose}
            className="material-symbols-outlined text-neutral-400 hover:text-black"
          >
            close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-label-caps text-label-caps text-secondary mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-black transition-colors ${
                errors.name ? 'border-red-500' : 'border-neutral-200'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-label-caps text-label-caps text-secondary mb-1">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-black transition-colors ${
                errors.email ? 'border-red-500' : 'border-neutral-200'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone (Optional) */}
          <div>
            <label className="block font-label-caps text-label-caps text-secondary mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-black transition-colors"
              placeholder="Optional"
            />
          </div>

          {/* Password (only for new staff) */}
          {!editingStaff && (
            <div>
              <label className="block font-label-caps text-label-caps text-secondary mb-1">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-black transition-colors ${
                  errors.password ? 'border-red-500' : 'border-neutral-200'
                }`}
                placeholder="Min 6 characters"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          )}

          {/* Role - Only show if platform admin */}
          <div>
            <label className="block font-label-caps text-label-caps text-secondary mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-black transition-colors"
              disabled={true}  // ✅ Restaurant admin can only create waiters
            >
              <option value="waiter">Waiter</option>
            </select>
            <p className="text-xs text-gray-400 mt-1">Only waiters can be created</p>
          </div>

          <div className="flex gap-3 pt-4 border-t border-neutral-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors font-button text-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors font-button text-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting 
                ? (editingStaff ? 'Updating...' : 'Adding...') 
                : (editingStaff ? 'Update Staff' : 'Add Staff')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddStaffModal