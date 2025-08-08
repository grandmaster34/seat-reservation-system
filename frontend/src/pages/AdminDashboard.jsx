import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
  const [seatForm, setSeatForm] = useState({
    seatNumber: '',
    location: '',
    status: 'available',
    seatType: 'standard'
  });
  const [showAddSeatForm, setShowAddSeatForm] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Sample data
  const occupancyData = [
    { day: 'Mon', occupancy: 65 },
    { day: 'Tue', occupancy: 72 },
    { day: 'Wed', occupancy: 80 },
    { day: 'Thu', occupancy: 85 },
    { day: 'Fri', occupancy: 82 },
    { day: 'Sat', occupancy: 78 },
    { day: 'Sun', occupancy: 45 }
  ];

  const reservations = [
    { id: 'RES-001', intern: 'Sarah Johnson', seat: 'D-12 (Zone A)', date: 'Aug 8, 2025', status: 'Active' },
    { id: 'RES-002', intern: 'Michael Brown', seat: 'C-07 (Zone B)', date: 'Aug 8, 2025', status: 'Active' },
    { id: 'RES-003', intern: 'Emily Davis', seat: 'A-23 (Zone C)', date: 'Aug 8, 2025', status: 'Pending' },
    { id: 'RES-004', intern: 'James Wilson', seat: 'F-15 (Zone A)', date: 'Aug 7, 2025', status: 'Cancelled' },
    { id: 'RES-005', intern: 'Emma Garcia', seat: 'B-09 (Zone B)', date: 'Aug 7, 2025', status: 'Active' }
  ];

  const seats = [
    { id: 'SEA-001', number: 'A-01', location: 'Zone A (Quiet Area)', status: 'Available' },
    { id: 'SEA-002', number: 'A-02', location: 'Zone A (Quiet Area)', status: 'Available' },
    { id: 'SEA-012', number: 'B-05', location: 'Zone B (Collaboration)', status: 'Occupied' },
    { id: 'SEA-023', number: 'C-12', location: 'Zone C (Window View)', status: 'Maintenance' },
    { id: 'SEA-034', number: 'D-08', location: 'Zone D (Private)', status: 'Available' }
  ];

  const menuItems = [
    { icon: 'fa-tachometer-alt', label: 'Dashboard', path: '/admin' },
    { icon: 'fa-chair', label: 'Seat Management', path: '/admin/seats' }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'available':
        return 'status-active';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
      case 'maintenance':
        return 'status-cancelled';
      case 'occupied':
        return 'status-occupied';
      default:
        return 'status-default';
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('New seat:', seatForm);
    // Reset form
    setSeatForm({
      seatNumber: '',
      location: '',
      status: 'available',
      seatType: 'standard'
    });
    setShowAddSeatForm(false);
    alert('Seat added successfully!');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSeatForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="sidebar-header">
          {!isSidebarCollapsed && (
            <div className="logo-section">
              <i className="fas fa-chair logo-icon"></i>
              <h3 className="logo-text">SeatReserve</h3>
            </div>
          )}
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <i className={`fas ${isSidebarCollapsed ? 'fa-bars' : 'fa-times'}`}></i>
          </button>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className={`menu-item ${activeMenuItem === item.label ? 'menu-item-active' : ''}`}
              onClick={() => {
                setActiveMenuItem(item.label);
                if (item.path) {
                  navigate(item.path);
                }
              }}
              title={isSidebarCollapsed ? item.label : ''}
            >
              <i className={`fas ${item.icon} menu-icon ${isSidebarCollapsed ? 'menu-icon-centered' : ''}`}></i>
              {!isSidebarCollapsed && <span className="menu-label">{item.label}</span>}
            </div>
          ))}
          <div 
            className="menu-item"
            onClick={() => console.log('Logout')}
            title={isSidebarCollapsed ? 'Logout' : ''}
          >
            <i className={`fas fa-sign-out-alt menu-icon ${isSidebarCollapsed ? 'menu-icon-centered' : ''}`}></i>
            {!isSidebarCollapsed && <span className="menu-label">Logout</span>}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <button className="mobile-toggle" onClick={toggleSidebar}>
              <i className="fas fa-bars"></i>
            </button>
            <h1 className="page-title">Admin Dashboard</h1>
          </div>
          <div className="header-right">
            <div className="search-box">
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
              />
            </div>
            <div className="notification-wrapper">
              <div className="notification-icon">
                <i className="fas fa-bell"></i>
                <span className="notification-badge">3</span>
              </div>
              <div className="notification-dropdown">
                <h4>Notifications</h4>
                <div className="notification-list">
                  <div className="notification-item">
                    <p>Sarah Johnson canceled her reservation</p>
                    <p className="notification-time">5 minutes ago</p>
                  </div>
                  <div className="notification-item">
                    <p>New intern registered: Michael Brown</p>
                    <p className="notification-time">2 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="user-profile">
              <img
                src="C:\Users\chathuranga\Desktop\SLT\Seat reservation system\frontend\public\images.jpeg"
                alt="Admin"
                className="user-avatar"
              />
              <div className="user-info">
                <h4 className="user-name">Robert Chen</h4>
                <p className="user-role">Administrator</p>
              </div>
              <div className="user-dropdown-wrapper">
                <i className="fas fa-chevron-down"></i>
                <div className="user-dropdown">
                  <div className="dropdown-item">My Profile</div>
                  <div className="dropdown-item">Settings</div>
                  <div className="dropdown-item dropdown-item-logout">Logout</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="content">
          <div className="content-header">
            <i className="fas fa-tachometer-alt content-header-icon"></i>
            <h2 className="content-title">Dashboard Overview</h2>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card stat-card-blue">
              <div className="stat-content">
                <div className="stat-icon-wrapper stat-icon-blue">
                  <i className="fas fa-chair"></i>
                </div>
                <div className="stat-info">
                  <h3 className="stat-number">78</h3>
                  <p className="stat-label">Total Seats</p>
                </div>
              </div>
              <div className="stat-trend">
                <span className="trend-positive">+5% </span>from last month
              </div>
            </div>
            <div className="stat-card stat-card-green">
              <div className="stat-content">
                <div className="stat-icon-wrapper stat-icon-green">
                  <i className="fas fa-calendar-check"></i>
                </div>
                <div className="stat-info">
                  <h3 className="stat-number">42</h3>
                  <p className="stat-label">Active Reservations</p>
                </div>
              </div>
              <div className="stat-trend">
                <span className="trend-positive">+12 </span>today
              </div>
            </div>
            <div className="stat-card stat-card-orange">
              <div className="stat-content">
                <div className="stat-icon-wrapper stat-icon-orange">
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-info">
                  <h3 className="stat-number">35</h3>
                  <p className="stat-label">Active Interns</p>
                </div>
              </div>
              <div className="stat-trend">
                <span className="trend-positive">+3 </span>this week
              </div>
            </div>
            <div className="stat-card stat-card-purple">
              <div className="stat-content">
                <div className="stat-icon-wrapper stat-icon-purple">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="stat-info">
                  <h3 className="stat-number">89%</h3>
                  <p className="stat-label">Current Occupancy</p>
                </div>
              </div>
              <div className="stat-trend">
                Peak time: 10am-2pm
              </div>
            </div>
          </div>

          {/* Two Columns Layout */}
          <div className="two-column-grid">
            {/* Recent Reservations */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Recent Reservations</h3>
                <button className="btn btn-outline">
                  <i className="fas fa-plus"></i>
                  New Reservation
                </button>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Intern</th>
                      <th>Seat</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((reservation) => (
                      <tr key={reservation.id}>
                        <td>
                          <div className="user-cell">
                            <div className="avatar-placeholder" />
                            <span>{reservation.intern}</span>
                          </div>
                        </td>
                        <td>{reservation.seat}</td>
                        <td>{reservation.date}</td>
                        <td>
                          <span className={`status-badge ${getStatusColor(reservation.status)}`}>
                            {reservation.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="action-btn action-btn-edit">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="action-btn action-btn-delete">
                              <i className="fas fa-trash"></i>
                            </button>
                            <button className="action-btn action-btn-view">
                              <i className="fas fa-eye"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="table-footer">
                <span className="table-info">Showing 5 of 42 reservations</span>
                <button className="view-all-btn">
                  View All <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>

            {/* Occupancy Chart */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Weekly Occupancy Rate</h3>
                <div className="chart-controls">
                  <button className="btn btn-small">This Week</button>
                  <button className="btn btn-outline btn-small">
                    <i className="fas fa-download"></i>
                    Export
                  </button>
                </div>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={occupancyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="day" 
                      stroke="#666" 
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="#666" 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `${value}%`} 
                      domain={[0, 100]}
                    />
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'Occupancy']}
                      labelStyle={{ color: '#333', fontWeight: 500 }}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="occupancy"
                      name="Occupancy Rate"
                      stroke="#4361ee"
                      strokeWidth={3}
                      dot={{ fill: '#4361ee', strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 7, stroke: '#4361ee', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-info">
                <i className="fas fa-info-circle chart-info-icon"></i>
                Peak occupancy on Thursdays at 85%
              </div>
            </div>
          </div>

          {/* Seat Management */}
          <div className="card seat-management-card">
            <div className="card-header">
              <h3 className="card-title">Seat Management</h3>
              <div className="seat-controls">
                <button 
                  onClick={() => setShowAddSeatForm(!showAddSeatForm)}
                  className="btn btn-primary"
                >
                  <i className={`fas ${showAddSeatForm ? 'fa-times' : 'fa-plus'}`}></i>
                  {showAddSeatForm ? 'Cancel' : 'Add New Seat'}
                </button>
                <button className="btn btn-outline">
                  <i className="fas fa-filter"></i>
                  Filter
                </button>
              </div>
            </div>

            {showAddSeatForm && (
              <div className="add-seat-form">
                <h3 className="form-title">Add New Seat</h3>
                <form onSubmit={handleFormSubmit}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="seatNumber" className="form-label">
                        Seat Number
                      </label>
                      <input
                        type="text"
                        id="seatNumber"
                        name="seatNumber"
                        value={seatForm.seatNumber}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="e.g., A-24"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="location" className="form-label">
                        Location/Area
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={seatForm.location}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="e.g., Zone B (Collaboration)"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="status" className="form-label">
                        Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={seatForm.status}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option value="available">Available</option>
                        <option value="occupied">Occupied</option>
                        <option value="maintenance">Under Maintenance</option>
                        <option value="reserved">Reserved</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="seatType" className="form-label">
                        Seat Type
                      </label>
                      <select
                        id="seatType"
                        name="seatType"
                        value={seatForm.seatType}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option value="standard">Standard</option>
                        <option value="premium">Premium (Window)</option>
                        <option value="collab">Collaboration</option>
                        <option value="private">Private Booth</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-save"></i>
                    Save Seat
                  </button>
                </form>
              </div>
            )}

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Seat ID</th>
                    <th>Seat Number</th>
                    <th>Location/Area</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {seats.map((seat) => (
                    <tr key={seat.id}>
                      <td className="seat-id">{seat.id}</td>
                      <td>
                        <div className="user-cell">
                          <div className="avatar-placeholder" />
                          <span>{seat.number}</span>
                        </div>
                      </td>
                      <td>{seat.location}</td>
                      <td>
                        <span className={`status-badge ${getStatusColor(seat.status)}`}>
                          {seat.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn action-btn-edit">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="action-btn action-btn-delete">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="table-footer">
              <span className="table-info">Showing 5 of 78 seats</span>
              <div className="pagination">
                <button className="pagination-btn">1</button>
                <button className="pagination-btn pagination-btn-active">2</button>
                <button className="pagination-btn">3</button>
                <button className="pagination-btn">
                  <i className="fas fa-ellipsis-h"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Upcoming Reservations */}
          <div className="card">
            <h3 className="card-title">Upcoming Reservations</h3>
            <div className="upcoming-grid">
              {reservations.slice(0, 3).map((reservation) => (
                <div key={reservation.id} className="upcoming-card">
                  <div className="upcoming-header">
                    <div className="upcoming-info">
                      <h4 className="upcoming-name">{reservation.intern}</h4>
                      <p className="upcoming-date">{reservation.date}</p>
                    </div>
                    <span className={`status-badge ${getStatusColor(reservation.status)}`}>
                      {reservation.status}
                    </span>
                  </div>
                  <div className="upcoming-seat">
                    <div className="avatar-placeholder large" />
                    <div className="seat-details">
                      <p className="seat-number">{reservation.seat}</p>
                      <p className="seat-zone">Zone A</p>
                    </div>
                  </div>
                  <div className="upcoming-actions">
                    <button className="upcoming-btn">
                      <i className="fas fa-eye"></i> Details
                    </button>
                    <button className="upcoming-btn">
                      <i className="fas fa-envelope"></i> Notify
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>© 2025 SeatReserve Admin Dashboard. All rights reserved. | Version 2.1.0</p>
        </footer>
      </div>

      {/* Inject CSS */}
      <style>{`
        /* Reset and base styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: #f9fafb;
        }

        /* Dashboard Container */
        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background-color: #f9fafb;
        }

        /* Sidebar */
        .sidebar {
          width: 256px;
          background: linear-gradient(to bottom, #1d4ed8, #1e40af);
          color: white;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease-in-out;
        }

        .sidebar-collapsed {
          width: 80px;
        }

        .sidebar-header {
          padding: 20px;
          border-bottom: 1px solid #1e40af;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo-section {
          display: flex;
          align-items: center;
        }

        .logo-icon {
          font-size: 24px;
        }

        .logo-text {
          margin-left: 12px;
          font-size: 20px;
          font-weight: 600;
        }

        .sidebar-toggle {
          background: none;
          border: none;
          color: white;
          padding: 8px;
          border-radius: 50%;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .sidebar-toggle:hover {
          background-color: #1e40af;
        }

        .sidebar-nav {
          padding: 16px 0;
        }

        .menu-item {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .menu-item:hover {
          background-color: #1e40af;
        }

        .menu-item-active {
          background-color: #1e40af;
          border-right: 4px solid white;
        }

        .menu-icon {
          width: 24px;
          font-size: 18px;
        }

        .menu-icon-centered {
          margin: 0 auto;
        }

        .menu-label {
          margin-left: 12px;
        }

        /* Main Content */
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        /* Header */
        .header {
          height: 64px;
          background-color: white;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .header-left {
          display: flex;
          align-items: center;
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: #6b7280;
          margin-right: 16px;
          font-size: 20px;
          cursor: pointer;
        }

        .page-title {
          font-size: 24px;
          font-weight: 600;
          color: #1f2937;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .search-box {
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .search-input {
          padding: 8px 16px 8px 40px;
          border: 1px solid #e5e7eb;
          border-radius: 24px;
          background-color: #f9fafb;
          outline: none;
          transition: all 0.2s;
          width: 240px;
        }

        .search-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .notification-wrapper {
          position: relative;
        }

        .notification-icon {
          position: relative;
          cursor: pointer;
          color: #6b7280;
          font-size: 20px;
        }

        .notification-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background-color: #ef4444;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        }

        .notification-dropdown {
          position: absolute;
          right: 0;
          margin-top: 8px;
          width: 288px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          padding: 16px;
          display: none;
          z-index: 50;
        }

        .notification-wrapper:hover .notification-dropdown {
          display: block;
        }

        .notification-dropdown h4 {
          font-weight: 600;
          margin-bottom: 8px;
        }

        .notification-list {
          font-size: 14px;
        }

        .notification-item {
          padding: 8px;
          border-radius: 4px;
          margin-bottom: 8px;
        }

        .notification-item:hover {
          background-color: #f9fafb;
        }

        .notification-time {
          font-size: 12px;
          color: #6b7280;
          margin-top: 4px;
        }

        .user-profile {
          display: flex;
          align-items: center;
          cursor: pointer;
          position: relative;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #3b82f6;
          margin-right: 12px;
          object-fit: cover;
        }

        .user-info {
          margin-right: 8px;
        }

        .user-name {
          font-weight: 500;
        }

        .user-role {
          font-size: 14px;
          color: #6b7280;
        }

        .user-dropdown-wrapper {
          position: relative;
        }

        .user-dropdown-wrapper i {
          color: #9ca3af;
          font-size: 12px;
        }

        .user-dropdown {
          position: absolute;
          right: 0;
          margin-top: 8px;
          width: 200px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          padding: 8px 0;
          display: none;
          z-index: 50;
        }

        .user-dropdown-wrapper:hover .user-dropdown {
          display: block;
        }

        .dropdown-item {
          padding: 8px 16px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .dropdown-item:hover {
          background-color: #f9fafb;
        }

        .dropdown-item-logout {
          color: #ef4444;
          border-top: 1px solid #e5e7eb;
          margin-top: 8px;
          padding-top: 12px;
        }

        /* Content */
        .content {
          flex: 1;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .content-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .content-header-icon {
          font-size: 24px;
          color: #3b82f6;
        }

        .content-title {
          font-size: 24px;
          font-weight: 600;
          color: #1f2937;
        }

        /* Stats Cards */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .stat-card {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          padding: 20px;
          transition: transform 0.3s;
        }

        .stat-card:hover {
          transform: translateY(-5px);
        }

        .stat-card-blue {
          border-top: 4px solid #3b82f6;
        }

        .stat-card-green {
          border-top: 4px solid #10b981;
        }

        .stat-card-orange {
          border-top: 4px solid #f59e0b;
        }

        .stat-card-purple {
          border-top: 4px solid #8b5cf6;
        }

        .stat-content {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }

        .stat-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
        }

        .stat-icon-blue {
          background-color: #dbeafe;
          color: #3b82f6;
        }

        .stat-icon-green {
          background-color: #d1fae5;
          color: #10b981;
        }

        .stat-icon-orange {
          background-color: #fef3c7;
          color: #f59e0b;
        }

        .stat-icon-purple {
          background-color: #ede9fe;
          color: #8b5cf6;
        }

        .stat-info h3 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .stat-label {
          color: #6b7280;
          font-size: 14px;
        }

        .stat-trend {
          font-size: 14px;
          color: #6b7280;
        }

        .trend-positive {
          color: #10b981;
          font-weight: 500;
        }

        /* Two Columns Layout */
        .two-column-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .card {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .card-title {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
        }

        .btn {
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid transparent;
        }

        .btn-outline {
          background-color: transparent;
          border-color: #d1d5db;
          color: #374151;
        }

        .btn-outline:hover {
          background-color: #f9fafb;
        }

        .btn-primary {
          background-color: #3b82f6;
          color: white;
          border: none;
        }

        .btn-primary:hover {
          background-color: #2563eb;
        }

        .btn-small {
          padding: 6px 12px;
          font-size: 14px;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th {
          background-color: #f9fafb;
          padding: 12px 16px;
          text-align: left;
          font-weight: 600;
          color: #374151;
          border-bottom: 1px solid #e5e7eb;
        }

        .data-table td {
          padding: 12px 16px;
          border-bottom: 1px solid #e5e7eb;
          color: #4b5563;
        }

        .user-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar-placeholder {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          display: inline-block;
        }

        .status-active {
          background-color: #dcfce7;
          color: #16a34a;
        }

        .status-pending {
          background-color: #fef9c3;
          color: #ca8a04;
        }

        .status-cancelled {
          background-color: #fee2e2;
          color: #dc2626;
        }

        .status-occupied {
          background-color: #dbeafe;
          color: #2563eb;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-btn:hover {
          background-color: #f3f4f6;
        }

        .action-btn-edit {
          color: #3b82f6;
        }

        .action-btn-delete {
          color: #ef4444;
        }

        .action-btn-view {
          color: #10b981;
        }

        .table-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-top: 1px solid #e5e7eb;
        }

        .table-info {
          color: #6b7280;
          font-size: 14px;
        }

        .view-all-btn {
          background: none;
          border: none;
          color: #3b82f6;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .chart-container {
          height: 300px;
          padding: 16px;
        }

        .chart-info {
          padding: 16px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #6b7280;
          font-size: 14px;
        }

        .chart-info-icon {
          color: #9ca3af;
        }

        /* Seat Management */
        .seat-management-card {
          margin-top: 24px;
        }

        .seat-controls {
          display: flex;
          gap: 12px;
        }

        .add-seat-form {
          padding: 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .form-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #1f2937;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #374151;
        }

        .form-input, .form-select {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          background-color: white;
          font-size: 14px;
          transition: border-color 0.2s;
        }

        .form-input:focus, .form-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        }

        /* Upcoming Reservations */
        .upcoming-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          padding: 20px;
        }

        .upcoming-card {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          padding: 16px;
          transition: transform 0.3s;
        }

        .upcoming-card:hover {
          transform: translateY(-3px);
        }

        .upcoming-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .upcoming-name {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .upcoming-date {
          color: #6b7280;
          font-size: 14px;
        }

        .upcoming-seat {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .avatar-placeholder.large {
          width: 48px;
          height: 48px;
        }

        .seat-number {
          font-weight: 500;
          margin-bottom: 2px;
        }

        .seat-zone {
          color: #6b7280;
          font-size: 14px;
        }

        .upcoming-actions {
          display: flex;
          gap: 8px;
        }

        .upcoming-btn {
          flex: 1;
          padding: 8px;
          border-radius: 6px;
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          color: #4b5563;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .upcoming-btn:hover {
          background-color: #f3f4f6;
        }

        /* Footer */
        .footer {
          padding: 20px 24px;
          background-color: white;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          color: #6b7280;
          font-size: 14px;
        }

        /* Pagination */
        .pagination {
          display: flex;
          gap: 8px;
        }

        .pagination-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
        }

        .pagination-btn:hover {
          background-color: #f3f4f6;
        }

        .pagination-btn-active {
          background-color: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .two-column-grid {
            grid-template-columns: 1fr;
          }
          
          .upcoming-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .sidebar {
            position: fixed;
            z-index: 100;
            height: 100%;
          }
          
          .mobile-toggle {
            display: block;
          }
          
          .header-right {
            gap: 8px;
          }
          
          .search-box {
            display: none;
          }
          
          .user-info {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;