// src/services/staffServices.js
const generateMockStaff = () => {
  const baseStaff = [
    {
      id: 1,
      name: 'Alexander Thorne',
      email: 'alex.thorne@restaurant.com',
      role: 'Admin',
      status: 'On Shift',
      joinDate: 'Oct 12, 2023',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1ilusT4-QHx4nHgDDMfUahv1YZH0mcnHTlpUxkX66jMrIETx6ZhVlbdSK93NrQ2hjoV0vytM66zIH0HLYl10uuGSPJKbmqf2WZ2JGdm2CE45mKjCxllUAcH1NUrX7Y7R92CFXp5x5luSB9RzclVmmLC3qhdvN9v-nR4rj37714qiV32GvPEtA3zSvAoZaJ2hvClvxX1CpGVmKvWDnLSN6VCiQB4tiFo1Ti59zohCd83Qv5z2RFJv8yjvhVmTUAv3kBegoAEzFVSY',
    },
    {
      id: 2,
      name: 'Elena Rodriguez',
      email: 'elena.r@restaurant.com',
      role: 'Waiter',
      status: 'Offline',
      joinDate: 'Jan 05, 2024',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1XbwIQ0d8pXtN9ObrxdAYFFXomNxWdBjr5bnATx7sXgWw-p5II4QQB7vR4qhv50p8qLPrAY1wqHdhcYv5dOPw5_KKmeiMW6p-sDJjnb0KUYFvuPQRMuHeHtUMwUBNW18xMpgR8wlL7cgYiTySHYsJfYygOmq2j1lFbUfaQr8f9wATW8ijbHH0jKdVryaVUVxbFVwHXzZ8gm8dHEdNyFn5Ja4gmv9JiAikvwOFgG8yOC-TfsN_F-GzihoSaGzZTtKUsvs5VT4xRNk',
    },
    {
      id: 3,
      name: 'Marcus Chen',
      email: 'm.chen@restaurant.com',
      role: 'Waiter',
      status: 'On Shift',
      joinDate: 'Feb 20, 2024',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfNHT7St6zJPk-bN7cDAlNoc1hPEWXT_7txgPhWqOlNl6sNrgO7oclGdoD3YU-L18NMEyL78XwaQdHDcNyzAeWDCSODCoPQeRISXCB8G7aBTGCWf43SgRqxI7yL4bVg_0NxBO5Jpd3Udjo-NomURbToLwc84MjZ4q6QyJtVQoFvQE7tUnTvKyx9FqWRCpnTbcfK4EedVYzgu155fgzSxP6GrpcIg2aCdbr0FOmQl4THvT-EIOxoPeX75vzYZBoOdtiuFAfQs1lrpg',
    },
  ]

  // Generate additional staff to reach 24 total
  const additionalStaff = []
  const firstNames = ['James', 'Sarah', 'Michael', 'Jessica', 'David', 'Lisa', 'Robert', 'Maria', 'William', 'Jennifer']
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Martinez', 'Hernandez']
  const roles = ['Waiter', 'Waiter', 'Waiter', 'Waiter', 'Admin']
  const statuses = ['On Shift', 'Offline']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  for (let i = 4; i <= 24; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const role = roles[Math.floor(Math.random() * roles.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const month = months[Math.floor(Math.random() * months.length)]
    const day = Math.floor(Math.random() * 28) + 1
    const year = 2023 + Math.floor(Math.random() * 2)

    additionalStaff.push({
      id: i,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@restaurant.com`,
      role: role,
      status: status,
      joinDate: `${month} ${day}, ${year}`,
      avatar: null,
    })
  }

  return [...baseStaff, ...additionalStaff]
}

let staffData = generateMockStaff()

export const fetchStaff = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...staffData])
    }, 300)
  })
}

export const addStaff = async (newStaff) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const staff = {
        id: staffData.length + 1,
        ...newStaff,
        avatar: null,
      }
      staffData.push(staff)
      resolve(staff)
    }, 300)
  })
}

export const updateStaff = async (id, updatedData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = staffData.findIndex((s) => s.id === id)
      if (index !== -1) {
        staffData[index] = { ...staffData[index], ...updatedData }
        resolve(staffData[index])
      } else {
        reject(new Error('Staff not found'))
      }
    }, 300)
  })
}

export const deleteStaff = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      staffData = staffData.filter((s) => s.id !== id)
      resolve(id)
    }, 300)
  })
}

// Compatibility wrapper expected by pages: provide a `staffService` named export
export const staffService = {
  getAll: async () => {
    return await fetchStaff()
  },
  getStats: async () => {
    const data = await fetchStaff()
    const totalStaff = data.length
    const activeNow = data.filter((s) => {
      const st = (s.status || '').toString().toLowerCase()
      return st === 'on shift' || st === 'active' || st === 'on_shift'
    }).length
    const admins = data.filter((s) => (s.role || '').toString().toLowerCase().includes('admin')).length
    const waitstaff = data.filter((s) => (s.role || '').toString().toLowerCase().includes('wait')).length

    return { totalStaff, activeNow, admins, waitstaff }
  },
  add: async (payload) => await addStaff(payload),
  update: async (id, payload) => await updateStaff(id, payload),
  delete: async (id) => await deleteStaff(id),
}

export default staffService