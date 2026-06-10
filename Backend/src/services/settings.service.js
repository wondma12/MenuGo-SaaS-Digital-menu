import prisma from '../config/prisma.js';

export const getSettings = async () => {
  let settings = await prisma.settings.findFirst();
  
  if (!settings) {
    // Create default settings
    settings = await prisma.settings.create({
      data: {
        platform_name: 'MenuGo Digital Menu',
        support_email: 'support@menugo.com',
        contact_phone: '+1-234-567-8900',
        allow_self_registration: true,
        require_verification_documents: true,
        minimum_password_length: 8,
        session_timeout: 30
      }
    });
  }
  
  return settings;
};

export const updateSettings = async (settingsData) => {
  const settings = await prisma.settings.findFirst();
  
  if (!settings) {
    return await prisma.settings.create({
      data: settingsData
    });
  }
  
  const updated = await prisma.settings.update({
    where: { id: settings.id },
    data: settingsData
  });
  
  return updated;
};