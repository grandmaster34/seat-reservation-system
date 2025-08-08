import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNavigation } from '../context/NavigationContext';
import InternSidebar from '../components/InternSidebar';
import InternHeader from '../components/InternHeader';
import SeatReserve from './InternDashboard-1';
import SeatMap from './InternDashboard-2';
import ReservationHistory from './InternDashboard-3';
import UserSettings from './InternDashboard-4';

const InternDashboard = ({ user, initialPage = 'dashboard' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentPage, navigateTo, goToDashboard } = useNavigation();
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [reservations, setReservations] = useState([
    { 
      id: 1, 
      title: "Desk B3 - Main Area", 
      date: "Today, 15 Aug", 
      time: "Full day", 
      status: "active", 
      type: "active" 
    },
    { 
      id: 2, 
      title: "Desk A1 - Window Side", 
      date: "Wed, 17 Aug", 
      time: "Full day", 
      status: "upcoming", 
      type: "upcoming" 
    },
    { 
      id: 3, 
      title: "Desk C2 - Quiet Zone", 
      date: "Fri, 19 Aug", 
      time: "Full day", 
      status: "upcoming", 
      type: "upcoming" 
    },
    { 
      id: 4, 
      title: "Desk A2 - Main Area", 
      date: "Mon, 14 Aug", 
      time: "Full day", 
      status: "past", 
      type: "past" 
    }
  ]);
  
  const [reservationDate, setReservationDate] = useState('');
  
  useEffect(() => {
    // Set today as default date
    const today = new Date().toISOString().split('T')[0];
    setReservationDate(today);
    
    // Set min date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    document.getElementById('reservation-date')?.setAttribute('min', minDate);
  }, []);

  const handleSelectSeat = (seatId) => {
    setSelectedSeat(seatId);
  };

  const handleCancelReservation = (id) => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      setReservations(reservations.map(res => 
        res.id === id ? { ...res, status: 'cancelled', type: 'past' } : res
      ));
    }
  };

  const handleNavigation = (page) => {
    navigateTo(page);
  };

  const handleBackToDashboard = () => {
    goToDashboard();
  };

  const seats = [
    { id: 'A1', status: 'available' },
    { id: 'A2', status: 'available' },
    { id: 'A3', status: 'occupied' },
    { id: 'A4', status: 'occupied' },
    { id: 'B1', status: 'available' },
    { id: 'B2', status: 'occupied' },
    { id: 'B3', status: 'available' },
    { id: 'B4', status: 'occupied' },
    { id: 'C1', status: 'occupied' },
    { id: 'C2', status: 'available' },
    { id: 'C3', status: 'occupied' },
    { id: 'C4', status: 'available' },
  ];

  // If current page is reservations, render the SeatReserve component
  if (currentPage === 'reservations') {
    return <SeatReserve onBack={handleBackToDashboard} user={user} />;
  }

  // If current page is seatmap, render the SeatMap component
  if (currentPage === 'seatmap') {
    return <SeatMap onBack={handleBackToDashboard} user={user} />;
  }

  // If current page is history, render the ReservationHistory component
  if (currentPage === 'history') {
    return <ReservationHistory onBack={handleBackToDashboard} user={user} />;
  }

  // If current page is settings, render the UserSettings component
  if (currentPage === 'settings') {
    return <UserSettings onBack={handleBackToDashboard} user={user} />;
  }

  return (
    <div className="dashboard">
      <style jsx>{`
        :root {
          --primary: #3b82f6;
          --primary-dark: #2563eb;
          --primary-light: #dbeafe;
          --secondary: #64748b;
          --success: #10b981;
          --success-light: #d1fae5;
          --warning: #f59e0b;
          --warning-light: #fef3c7;
          --danger: #ef4444;
          --danger-light: #fee2e2;
          --light: #f8fafc;
          --dark: #1e293b;
          --gray: #e2e8f0;
          --border: #e2e8f0;
          --card-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          --card-shadow-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .dashboard {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          position: relative;
        }
        
        .dashboard::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          pointer-events: none;
        }
        
        /* Sidebar */
        .sidebar {
          width: 280px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          box-shadow: 2px 0 20px rgba(0, 0, 0, 0.1);
          padding: 2rem 0;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 10;
          border-right: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .logo {
          display: flex;
          align-items: center;
          padding: 0 2rem 2rem;
          border-bottom: 1px solid var(--border);
          margin-bottom: 2rem;
        }
        
        .logo-icon {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          color: white;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin-right: 1rem;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        
        .logo-text {
          font-size: 24px;
          font-weight: 800;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .nav-item {
          display: flex;
          align-items: center;
          padding: 1rem 2rem;
          color: var(--secondary);
          text-decoration: none;
          margin: 0.25rem 1rem;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-weight: 500;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          border: none;
          background: none;
          width: calc(100% - 2rem);
          text-align: left;
        }
        
        .nav-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 0;
          background: linear-gradient(90deg, var(--primary-light) 0%, transparent 100%);
          transition: width 0.3s ease;
        }
        
        .nav-item:hover::before {
          width: 100%;
        }
        
        .nav-item:hover, .nav-item.active {
          background: var(--primary-light);
          color: var(--primary-dark);
          transform: translateX(4px);
        }
        
        .nav-item.active {
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
        }
        
        .nav-item i {
          margin-right: 1rem;
          font-size: 20px;
          z-index: 1;
        }
        
        .nav-text {
          z-index: 1;
        }
        
        /* Main Content */
        .main-content {
          flex: 1;
          padding: 3rem;
          overflow-y: auto;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          position: relative;
          z-index: 1;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          background: rgba(255, 255, 255, 0.95);
          padding: 2rem;
          border-radius: 20px;
          box-shadow: var(--card-shadow);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }
        
        .header-title {
          font-size: 32px;
          font-weight: 800;
          background: linear-gradient(135deg, var(--dark) 0%, var(--primary-dark) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .user-profile {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.8);
          padding: 1rem 1.5rem;
          border-radius: 50px;
          box-shadow: var(--card-shadow);
        }
        
        .user-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        
        .user-info {
          display: flex;
          flex-direction: column;
        }
        
        .user-name {
          font-weight: 700;
          font-size: 16px;
          color: var(--dark);
        }
        
        .user-role {
          font-size: 14px;
          color: var(--secondary);
          font-weight: 500;
        }
        
        /* Cards */
        .dashboard-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }
        
        .card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: var(--card-shadow);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }
        
        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary) 0%, var(--primary-dark) 100%);
        }
        
        .card:hover {
          transform: translateY(-8px);
          box-shadow: var(--card-shadow-hover);
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .card-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--dark);
        }
        
        .card-icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .bg-blue {
          background: linear-gradient(135deg, var(--primary-light) 0%, #bfdbfe 100%);
          color: var(--primary-dark);
        }
        
        .bg-green {
          background: linear-gradient(135deg, var(--success-light) 0%, #a7f3d0 100%);
          color: var(--success);
        }
        
        .bg-orange {
          background: linear-gradient(135deg, var(--warning-light) 0%, #fde68a 100%);
          color: var(--warning);
        }
        
        .card-value {
          font-size: 36px;
          font-weight: 800;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, var(--dark) 0%, var(--primary-dark) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fadeInUp 0.6s ease-out;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .card-text {
          font-size: 16px;
          color: var(--secondary);
          font-weight: 500;
        }
        
        /* Reservation Section */
        .reservation-section {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 2rem;
          margin-top: 2rem;
        }
        
        .panel {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          box-shadow: var(--card-shadow);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          position: relative;
        }
        
        .panel::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary) 0%, var(--primary-dark) 100%);
          z-index: 1;
        }
        
        .panel-header {
          padding: 2rem;
          border-bottom: 1px solid var(--border);
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.05) 100%);
        }
        
        .panel-title {
          font-size: 24px;
          font-weight: 800;
          color: var(--dark);
        }
        
        .panel-body {
          padding: 2rem;
        }
        
        .date-selector {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .date-input {
          flex: 1;
          padding: 1rem 1.5rem;
          border: 2px solid var(--border);
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.9);
        }
        
        .date-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .btn {
          padding: 1rem 2rem;
          border-radius: 12px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        
        .btn-primary:hover::before {
          left: 100%;
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
        
        /* Seat Map */
        .office-map {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-top: 2rem;
        }
        
        .seat {
          height: 120px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid var(--border);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .seat::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .seat:hover::before {
          opacity: 1;
        }
        
        .seat.available {
          background: linear-gradient(135deg, var(--success-light) 0%, #bbf7d0 100%);
          border-color: var(--success);
        }
        
        .seat.available:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
        }
        
        .seat.selected {
          background: linear-gradient(135deg, var(--primary-light) 0%, #bfdbfe 100%);
          border-color: var(--primary);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
        }
        
        .seat.occupied {
          background: linear-gradient(135deg, var(--danger-light) 0%, #fecaca 100%);
          border-color: var(--danger);
          cursor: not-allowed;
          opacity: 0.7;
        }
        
        .seat-number {
          font-weight: 800;
          font-size: 20px;
          margin-bottom: 0.5rem;
          z-index: 1;
        }
        
        .seat-status {
          font-size: 12px;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-weight: 600;
          z-index: 1;
        }
        
        .status-available {
          background: rgba(16, 185, 129, 0.2);
          color: #166534;
        }
        
        .status-occupied {
          background: rgba(239, 68, 68, 0.2);
          color: #b91c1c;
        }
        
        /* Reservations List */
        .reservations {
          max-height: 600px;
          overflow-y: auto;
        }
        
        .reservation-item {
          display: flex;
          padding: 1.5rem;
          border-bottom: 1px solid var(--border);
          align-items: center;
          transition: all 0.3s ease;
          border-radius: 12px;
          margin-bottom: 0.5rem;
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(5px);
        }
        
        .reservation-item:hover {
          background: rgba(59, 130, 246, 0.05);
          transform: translateX(4px);
        }
        
        .reservation-item:last-child {
          border-bottom: none;
        }
        
        .reservation-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--primary-light) 0%, #bfdbfe 100%);
          color: var(--primary-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
          flex-shrink: 0;
          font-size: 20px;
        }
        
        .reservation-details {
          flex: 1;
        }
        
        .reservation-title {
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--dark);
          font-size: 16px;
        }
        
        .reservation-meta {
          display: flex;
          font-size: 14px;
          color: var(--secondary);
          gap: 1rem;
        }
        
        .reservation-meta span {
          display: flex;
          align-items: center;
          font-weight: 500;
        }
        
        .reservation-meta i {
          margin-right: 0.5rem;
        }
        
        .reservation-actions {
          display: flex;
          gap: 0.5rem;
        }
        
        .btn-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.9);
          color: var(--secondary);
          transition: all 0.3s ease;
          font-size: 16px;
        }
        
        .btn-icon:hover {
          transform: scale(1.1);
        }
        
        .btn-edit:hover {
          background: var(--primary-light);
          color: var(--primary-dark);
        }
        
        .btn-cancel:hover {
          background: var(--danger-light);
          color: var(--danger);
        }
        
        .tag {
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .tag-upcoming {
          background: linear-gradient(135deg, var(--primary-light) 0%, #bfdbfe 100%);
          color: var(--primary-dark);
        }
        
        .tag-active {
          background: linear-gradient(135deg, var(--success-light) 0%, #bbf7d0 100%);
          color: var(--success);
        }
        
        .tag-past {
          background: linear-gradient(135deg, var(--gray) 0%, #e2e8f0 100%);
          color: var(--secondary);
        }
        
        /* Custom scrollbar */
        .reservations::-webkit-scrollbar {
          width: 6px;
        }
        
        .reservations::-webkit-scrollbar-track {
          background: var(--gray);
          border-radius: 10px;
        }
        
        .reservations::-webkit-scrollbar-thumb {
          background: var(--primary);
          border-radius: 10px;
        }
        
        .reservations::-webkit-scrollbar-thumb:hover {
          background: var(--primary-dark);
        }
        
        /* Responsive */
        @media (max-width: 1200px) {
          .reservation-section {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 992px) {
          .sidebar {
            width: 80px;
          }
          
          .logo-text, .nav-text {
            display: none;
          }
          
          .logo {
            justify-content: center;
            padding: 0 0 2rem 0;
          }
          
          .nav-item {
            justify-content: center;
            padding: 1.5rem 0;
          }
          
          .nav-item i {
            margin-right: 0;
          }
          
          .main-content {
            padding: 2rem;
          }
        }
        
        @media (max-width: 768px) {
          .dashboard-cards {
            grid-template-columns: 1fr;
          }
          
          .office-map {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .user-info {
            display: none;
          }
          
          .header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
          
          .date-selector {
            flex-direction: column;
          }
        }
      `}</style>
      
      {/* Sidebar */}
      <InternSidebar user={user} />
      
      {/* Main Content */}
      <main className="main-content">
        <InternHeader title="Seat Reservation Dashboard" user={user} />
        
        {/* Dashboard Cards */}
        <div className="dashboard-cards">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Available Seats</h3>
              <div className="card-icon bg-blue">
                <i className="fas fa-chair"></i>
              </div>
            </div>
            <div className="card-value">24</div>
            <div className="card-text">Seats available today</div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Your Reservations</h3>
              <div className="card-icon bg-green">
                <i className="fas fa-calendar-check"></i>
              </div>
            </div>
            <div className="card-value">3</div>
            <div className="card-text">Active and upcoming</div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Office Capacity</h3>
              <div className="card-icon bg-orange">
                <i className="fas fa-building"></i>
              </div>
            </div>
            <div className="card-value">68%</div>
            <div className="card-text">Current occupancy rate</div>
          </div>
        </div>
        
        {/* Reservation Section */}
        <div className="reservation-section">
          {/* Seat Booking Panel */}
          <div className="panel">
            <div className="panel-header">
              <h2 className="panel-title">Book a Seat</h2>
            </div>
            <div className="panel-body">
              <div className="date-selector">
                <input 
                  type="date" 
                  className="date-input" 
                  id="reservation-date"
                  value={reservationDate}
                  onChange={(e) => setReservationDate(e.target.value)}
                />
                <button className="btn btn-primary">
                  <i className="fas fa-search"></i> Check Availability
                </button>
              </div>
              
              <h3 style={{marginBottom: '0.5rem', color: 'var(--dark)', fontWeight: '700'}}>Seat Map - Main Office Area</h3>
              <p className="card-text" style={{marginBottom: '1.5rem'}}>Select an available seat for your reservation</p>
              
              <div className="office-map">
                {seats.map(seat => (
                  <div 
                    key={seat.id}
                    className={`seat ${seat.status} ${selectedSeat === seat.id ? 'selected' : ''}`}
                    onClick={() => seat.status === 'available' && handleSelectSeat(seat.id)}
                  >
                    <div className="seat-number">{seat.id}</div>
                    <div className={`seat-status status-${seat.status}`}>
                      {seat.status === 'available' ? 'Available' : 'Occupied'}
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{marginTop: '2rem', display: 'flex', gap: '1rem'}}>
                <button className="btn btn-primary" style={{flex: 1}}>
                  <i className="fas fa-check-circle"></i> Confirm Reservation
                </button>
                <button 
                  className="btn btn-outline" 
                  style={{flex: 1}}
                  onClick={() => setSelectedSeat(null)}
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
          
          {/* Reservations Panel */}
          <div className="panel">
            <div className="panel-header">
              <h2 className="panel-title">Your Reservations</h2>
            </div>
            <div className="panel-body">
              <div className="reservations">
                {reservations.map(reservation => (
                  <div key={reservation.id} className="reservation-item">
                    <div className="reservation-icon">
                      <i className={
                        reservation.status === 'active' ? 'fas fa-calendar-day' : 
                        reservation.status === 'cancelled' ? 'fas fa-times-circle' : 
                        'fas fa-calendar-alt'
                      }></i>
                    </div>
                    <div className="reservation-details">
                      <div className="reservation-title">{reservation.title}</div>
                      <div className="reservation-meta">
                        <span><i className="far fa-calendar"></i> {reservation.date}</span>
                        <span><i className="far fa-clock"></i> {reservation.time}</span>
                      </div>
                    </div>
                    <div className={`tag tag-${reservation.type}`}>
                      {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                    </div>
                    {reservation.type === 'upcoming' && (
                      <div className="reservation-actions">
                        <button className="btn-icon btn-edit">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          className="btn-icon btn-cancel"
                          onClick={() => handleCancelReservation(reservation.id)}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InternDashboard;