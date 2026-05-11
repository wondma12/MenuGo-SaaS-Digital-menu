// src/components/admin/Staff/AddStaffModal.jsx
import React, { useState, useEffect } from 'react'

const AddStaffModal = ({ isOpen, onClose, onSubmit, editingStaff }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Waiter',
    status: 'Offline',
    joinDate: '',
  })

  useEffect(() => {
    if (editingStaff) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: editingStaff.name,
        email: editingStaff.email,
        role: editingStaff.role,
        status: editingStaff.status,
        joinDate: editingStaff.joinDate,
      })
    } else {
      setFormData({
        name: '',
        email: '',
        role: 'Waiter',
        status: 'Offline',
        joinDate: '',
      })
    }
  }, [editingStaff, isOpen])

  if (!isOpen) return null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
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
          <div>
            <label className="block font-label-caps text-label-caps text-secondary mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div>
            <label className="block font-label-caps text-label-caps text-secondary mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div>
            <label className="block font-label-caps text-label-caps text-secondary mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-black transition-colors"
            >
              <option value="Admin">Admin</option>
              <option value="Waiter">Waiter</option>
            </select>
          </div>

          <div>
            <label className="block font-label-caps text-label-caps text-secondary mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-black transition-colors"
            >
              <option value="On Shift">On Shift</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          <div>
            <label className="block font-label-caps text-label-caps text-secondary mb-1">
              Join Date
            </label>
            <input
              type="date"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary"
            >
              {editingStaff ? 'Update' : 'Add'} Staff
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddStaffModal