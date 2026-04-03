import React, { useState } from "react";
import ProfileForm from "../../components/admin/settings/ProfileForm";
import PasswordForm from "../../components/admin/settings/PasswordForm";
import SubscriptionPanel from "../../components/admin/settings/SubscriptionPanel";
import DeleteAccount from "../../components/admin/settings/DeleteAccount";
import { 
  Settings as SettingsIcon, 
  Shield, 
  CreditCard, 
  AlertCircle,
  User,
  Lock,
  Bell,
  Globe,
  Database,
  Activity,
  CheckCircle
} from "lucide-react";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@menugo.com",
    phone: "+1 234 567 8900",
    restaurantName: "MenuGo Restaurant",
    address: "123 Main Street, New York, NY 10001",
  });

  const [activeSection, setActiveSection] = useState("profile");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleProfileUpdate = (newProfile) => {
    setProfile(newProfile);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Statistics
  const stats = {
    accountAge: "3 months",
    lastLogin: "Today, 10:30 AM",
    devices: 2,
    dataUsage: "156 MB",
    securityScore: "92%",
    backups: "Daily",
  };

  const sections = [
    { 
      id: "profile", 
      title: "Profile Information", 
      icon: User, 
      description: "Manage your personal and restaurant details",
      color: "blue"
    },
    { 
      id: "password", 
      title: "Security Settings", 
      icon: Lock, 
      description: "Update your password and security preferences",
      color: "green"
    },
    { 
      id: "subscription", 
      title: "Billing & Plan", 
      icon: CreditCard, 
      description: "Manage your subscription and payment methods",
      color: "purple"
    },
    { 
      id: "danger", 
      title: "Danger Zone", 
      icon: AlertCircle, 
      description: "Permanent actions like account deletion",
      color: "red"
    },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileForm profile={profile} onUpdate={handleProfileUpdate} />;
      case "password":
        return <PasswordForm />;
      case "subscription":
        return <SubscriptionPanel currentPlan="Pro" />;
      case "danger":
        return <DeleteAccount />;
      default:
        return <ProfileForm profile={profile} onUpdate={handleProfileUpdate} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Save Notification */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account and restaurant settings</p>
        </div>
        {saveSuccess && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg animate-fade-in">
            <CheckCircle size={18} />
            <span className="text-sm font-medium">Profile updated successfully!</span>
          </div>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
          <p className="text-xs text-gray-500">Account Age</p>
          <p className="text-lg font-semibold text-gray-900">{stats.accountAge}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500">
          <p className="text-xs text-gray-500">Last Login</p>
          <p className="text-lg font-semibold text-gray-900">{stats.lastLogin}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-purple-500">
          <p className="text-xs text-gray-500">Active Devices</p>
          <p className="text-lg font-semibold text-gray-900">{stats.devices}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-orange-500">
          <p className="text-xs text-gray-500">Data Usage</p>
          <p className="text-lg font-semibold text-gray-900">{stats.dataUsage}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-indigo-500">
          <p className="text-xs text-gray-500">Security Score</p>
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold text-gray-900">{stats.securityScore}</p>
            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: stats.securityScore }} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-teal-500">
          <p className="text-xs text-gray-500">Backups</p>
          <p className="text-lg font-semibold text-gray-900">{stats.backups}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
          <Bell size={20} className="text-blue-500" />
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900">Notifications</p>
            <p className="text-xs text-gray-500">Manage alerts</p>
          </div>
        </button>
        <button className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
          <Globe size={20} className="text-green-500" />
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900">Language</p>
            <p className="text-xs text-gray-500">English (US)</p>
          </div>
        </button>
        <button className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
          <Database size={20} className="text-purple-500" />
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900">Data Export</p>
            <p className="text-xs text-gray-500">Download data</p>
          </div>
        </button>
        <button className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
          <Activity size={20} className="text-orange-500" />
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900">Activity Log</p>
            <p className="text-xs text-gray-500">View history</p>
          </div>
        </button>
      </div>

      {/* Settings Sections with Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-6">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-gray-900">Settings Menu</h3>
              <p className="text-xs text-gray-500 mt-1">Choose a section to manage</p>
            </div>
            <nav className="p-2">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                const colorClasses = {
                  blue: isActive ? "bg-blue-50 text-blue-700 border-blue-500" : "text-gray-600",
                  green: isActive ? "bg-green-50 text-green-700 border-green-500" : "text-gray-600",
                  purple: isActive ? "bg-purple-50 text-purple-700 border-purple-500" : "text-gray-600",
                  red: isActive ? "bg-red-50 text-red-700 border-red-500" : "text-gray-600",
                };
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-start gap-3 p-3 rounded-lg transition-all mb-1 text-left ${
                      isActive 
                        ? `${colorClasses[section.color]} border-l-4` 
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={20} className={`flex-shrink-0 mt-0.5 ${isActive ? "" : "text-gray-400"}`} />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${isActive ? "" : "text-gray-700"}`}>
                        {section.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{section.description}</p>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {renderSection()}
        </div>
      </div>

      {/* Support Footer */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 text-center">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900">Need assistance?</p>
            <p className="text-sm text-gray-600">Our support team is here to help 24/7</p>
          </div>
          <div className="flex gap-3">
            <a 
              href="mailto:support@menugo.com" 
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
            >
              Contact Support
            </a>
            <a 
              href="#" 
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              View Documentation
            </a>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">System Status</p>
              <p className="text-xs text-gray-500">All systems operational</p>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            Last checked: Just now • Version 2.0.1
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;