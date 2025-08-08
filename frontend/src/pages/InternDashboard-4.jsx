import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import InternLayout from '../components/InternLayout';

const UserSettings = ({ onBack, user }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    department: 'Engineering',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    preferences: {
      theme: 'light',
      language: 'en',
      timezone: 'UTC-5'
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [name]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  return (
    <InternLayout title="User Settings" user={user}>
      <style>{`
        /* Settings Container */
        .settings-container {
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 2rem;
          height: calc(100vh - 200px);
        }
        
        /* Sidebar Tabs */
        .settings-sidebar {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: var(--card-shadow);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          height: fit-content;
        }
        
        .tab-button {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
          padding: 1rem 1.5rem;
          border: none;
          background: none;
          color: var(--secondary);
          font-weight: 600;
          cursor: pointer;
          border-radius: 12px;
          transition: all 0.3s ease;
          margin-bottom: 0.5rem;
          text-align: left;
        }
        
        .tab-button:hover {
          background: var(--primary-light);
          color: var(--primary-dark);
          transform: translateX(4px);
        }
        
        .tab-button.active {
          background: var(--primary-light);
          color: var(--primary-dark);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
        }
        
        .tab-button i {
          font-size: 18px;
          width: 20px;
        }
        
        /* Content Area */
        .settings-content {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: var(--card-shadow);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          overflow-y: auto;
        }
        
        .tab-content {
          display: none;
        }
        
        .tab-content.active {
          display: block;
        }
        
        .section-title {
          font-size: 24px;
          font-weight: 700;
          color: var(--dark);
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid var(--border);
        }
        
        /* Form Styles */
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
        }
        
        .form-label {
          font-weight: 600;
          color: var(--dark);
          margin-bottom: 0.5rem;
          font-size: 14px;
        }
        
        .form-input,
        .form-select {
          padding: 0.75rem 1rem;
          border: 2px solid var(--border);
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.9);
        }
        
        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .form-textarea {
          min-height: 100px;
          resize: vertical;
        }
        
        /* Checkbox Styles */
        .checkbox-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.5);
          transition: all 0.3s ease;
        }
        
        .checkbox-item:hover {
          background: var(--primary-light);
        }
        
        .checkbox-input {
          width: 18px;
          height: 18px;
          accent-color: var(--primary);
        }
        
        .checkbox-label {
          font-weight: 500;
          color: var(--dark);
          cursor: pointer;
        }
        
        /* Buttons */
        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
        }
        
        .btn-outline {
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid var(--border);
          color: var(--secondary);
        }
        
        .btn-outline:hover {
          background: var(--gray);
          border-color: var(--primary);
          color: var(--primary-dark);
        }
        
        .btn-danger {
          background: linear-gradient(135deg, var(--danger) 0%, #dc2626 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }
        
        .btn-danger:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
        }
        
        /* Action Buttons */
        .action-buttons {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 2px solid var(--border);
        }
        
        /* Responsive */
        @media (max-width: 992px) {
          .settings-container {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .settings-sidebar {
            order: 2;
          }
          
          .settings-content {
            order: 1;
          }
        }
        
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .action-buttons {
            flex-direction: column;
          }
        }
      `}</style>
      
      <div className="settings-container">
        {/* Settings Sidebar */}
        <div className="settings-sidebar">
          <button
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <i className="fas fa-user"></i>
            Profile
          </button>
          <button
            className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <i className="fas fa-bell"></i>
            Notifications
          </button>
          <button
            className={`tab-button ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            <i className="fas fa-cog"></i>
            Preferences
          </button>
          <button
            className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <i className="fas fa-shield-alt"></i>
            Security
          </button>
        </div>
        
        {/* Settings Content */}
        <div className="settings-content">
          {/* Profile Tab */}
          <div className={`tab-content ${activeTab === 'profile' ? 'active' : ''}`}>
            <h2 className="section-title">Profile Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          
          {/* Notifications Tab */}
          <div className={`tab-content ${activeTab === 'notifications' ? 'active' : ''}`}>
            <h2 className="section-title">Notification Preferences</h2>
            <div className="checkbox-group">
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  name="email"
                  checked={formData.notifications.email}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                <label className="checkbox-label">Email Notifications</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  name="push"
                  checked={formData.notifications.push}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                <label className="checkbox-label">Push Notifications</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  name="sms"
                  checked={formData.notifications.sms}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                <label className="checkbox-label">SMS Notifications</label>
              </div>
            </div>
          </div>
          
          {/* Preferences Tab */}
          <div className={`tab-content ${activeTab === 'preferences' ? 'active' : ''}`}>
            <h2 className="section-title">App Preferences</h2>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Theme</label>
                <select
                  name="theme"
                  value={formData.preferences.theme}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Language</label>
                <select
                  name="language"
                  value={formData.preferences.language}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Timezone</label>
                <select
                  name="timezone"
                  value={formData.preferences.timezone}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="UTC-5">Eastern Time (UTC-5)</option>
                  <option value="UTC-6">Central Time (UTC-6)</option>
                  <option value="UTC-7">Mountain Time (UTC-7)</option>
                  <option value="UTC-8">Pacific Time (UTC-8)</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Security Tab */}
          <div className={`tab-content ${activeTab === 'security' ? 'active' : ''}`}>
            <h2 className="section-title">Security Settings</h2>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  className="form-input"
                  placeholder="Enter current password"
                />
              </div>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  className="form-input"
                  placeholder="Enter new password"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-input"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            <div className="action-buttons">
              <button className="btn btn-danger">
                <i className="fas fa-trash"></i> Delete Account
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="btn btn-outline">
              <i className="fas fa-times"></i> Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              <i className="fas fa-save"></i> Save Changes
            </button>
          </div>
        </div>
      </div>
    </InternLayout>
  );
};

export default UserSettings;
