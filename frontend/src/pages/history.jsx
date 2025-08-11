import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import InternLayout from '../components/InternLayout';

const ReservationHistory = ({ onBack, user }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  // Mock reservation history data
  const historyData = [
    {
      id: 1,
      seat: 'A1 - Main Area',
      date: '2023-08-15',
      time: '09:00 - 17:00',
      status: 'completed',
      checkIn: '09:05',
      checkOut: '16:55'
    },
    {
      id: 2,
      seat: 'B3 - Window Side',
      date: '2023-08-14',
      time: '09:00 - 17:00',
      status: 'completed',
      checkIn: '09:15',
      checkOut: '17:10'
    },
    {
      id: 3,
      seat: 'C2 - Quiet Zone',
      date: '2023-08-10',
      time: '09:00 - 17:00',
      status: 'completed',
      checkIn: '08:55',
      checkOut: '17:00'
    },
    {
      id: 4,
      seat: 'W4 - Window Side',
      date: '2023-08-07',
      time: '09:00 - 17:00',
      status: 'completed',
      checkIn: '09:30',
      checkOut: '16:45'
    },
    {
      id: 5,
      seat: 'A1 - Main Area',
      date: '2023-08-03',
      time: '09:00 - 17:00',
      status: 'completed',
      checkIn: '09:10',
      checkOut: '17:05'
    },
    {
      id: 6,
      seat: 'Q3 - Quiet Zone',
      date: '2023-07-28',
      time: '09:00 - 17:00',
      status: 'completed',
      checkIn: '09:25',
      checkOut: '16:50'
    },
    {
      id: 7,
      seat: 'B2 - Main Area',
      date: '2023-07-25',
      time: '09:00 - 17:00',
      status: 'cancelled',
      checkIn: null,
      checkOut: null
    },
    {
      id: 8,
      seat: 'C4 - Collaboration',
      date: '2023-07-20',
      time: '09:00 - 17:00',
      status: 'completed',
      checkIn: '10:00',
      checkOut: '16:30'
    }
  ];

  // Filter data based on active filter and selected month
  const filteredData = historyData.filter(item => {
    const matchesFilter = activeFilter === 'all' || item.status === activeFilter;
    const matchesMonth = item.date.startsWith(selectedMonth);
    return matchesFilter && matchesMonth;
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate statistics
  const getStats = () => {
    const total = historyData.length;
    const completed = historyData.filter(item => item.status === 'completed').length;
    const cancelled = historyData.filter(item => item.status === 'cancelled').length;
    const thisMonth = historyData.filter(item => item.date.startsWith(selectedMonth)).length;
    return { total, completed, cancelled, thisMonth };
  };

  const stats = getStats();

  return (
    <InternLayout title="Reservation History" user={user}>
      <style>{`
        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .stat-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: var(--card-shadow);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          text-align: center;
        }
        
        .stat-value {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, var(--dark) 0%, var(--primary-dark) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .stat-label {
          font-size: 14px;
          color: var(--secondary);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        /* Filters */
        .filters {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          align-items: center;
        }
        
        .filter-item {
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.9);
          color: var(--secondary);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          backdrop-filter: blur(10px);
        }
        
        .filter-item:hover {
          background: var(--primary-light);
          color: var(--primary-dark);
          transform: translateY(-2px);
        }
        
        .filter-item.active {
          background: var(--primary-light);
          color: var(--primary-dark);
          border-color: var(--primary);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
        }
        
        .month-selector {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.9);
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }
        
        .month-input {
          padding: 0.5rem 1rem;
          border: 2px solid var(--border);
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .month-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        /* History Container */
        .history-container {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          box-shadow: var(--card-shadow);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }
        
        .history-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 2rem;
          padding: 1.5rem 2rem;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.05) 100%);
          border-bottom: 1px solid var(--border);
          font-weight: 700;
          color: var(--dark);
          font-size: 14px;
        }
        
        .history-item {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 2rem;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid var(--border);
          align-items: center;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.5);
        }
        
        .history-item:hover {
          background: rgba(59, 130, 246, 0.05);
          transform: translateX(4px);
        }
        
        .history-item:last-child {
          border-bottom: none;
        }
        
        .history-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .history-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--primary-light) 0%, #bfdbfe 100%);
          color: var(--primary-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        
        .history-details {
          flex: 1;
        }
        
        .history-title {
          font-weight: 700;
          margin-bottom: 0.25rem;
          color: var(--dark);
          font-size: 16px;
        }
        
        .history-meta {
          font-size: 14px;
          color: var(--secondary);
          font-weight: 500;
        }
        
        /* Tags */
        .tag {
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .tag-completed {
          background: linear-gradient(135deg, var(--success-light) 0%, #bbf7d0 100%);
          color: var(--success);
        }
        
        .tag-cancelled {
          background: linear-gradient(135deg, var(--danger-light) 0%, #fecaca 100%);
          color: var(--danger);
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
        
        /* Responsive */
        @media (max-width: 1200px) {
          .history-header,
          .history-item {
            grid-template-columns: 2fr 1fr 1fr 1fr;
          }
          
          .history-header div:last-child,
          .history-item > div:last-child {
            display: none;
          }
        }
        
        @media (max-width: 992px) {
          .history-header,
          .history-item {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .history-header {
            display: none;
          }
          
          .history-item {
            padding: 1rem;
            border-radius: 12px;
            margin-bottom: 1rem;
            box-shadow: var(--card-shadow);
          }
        }
        
        @media (max-width: 768px) {
          .filters {
            flex-direction: column;
            align-items: stretch;
          }
          
          .month-selector {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
      
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Reservations</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.cancelled}</div>
          <div className="stat-label">Cancelled</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.thisMonth}</div>
          <div className="stat-label">This Month</div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="filters">
        {['all', 'completed', 'cancelled'].map(filter => (
          <div
            key={filter}
            className={`filter-item ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </div>
        ))}
        
        <div className="month-selector">
          <label>Month:</label>
          <input
            type="month"
            className="month-input"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </div>
        
        <button className="btn btn-primary">
          <i className="fas fa-download"></i> Export Data
        </button>
      </div>
      
      {/* History List */}
      <div className="history-container">
        <div className="history-header">
          <div>Seat & Location</div>
          <div>Date & Time</div>
          <div>Status</div>
          <div>Check In/Out</div>
          <div>Actions</div>
        </div>
        
        {filteredData.map(item => (
          <div key={item.id} className="history-item">
            <div className="history-info">
              <div className="history-icon">
                <i className="fas fa-chair"></i>
              </div>
              <div className="history-details">
                <div className="history-title">{item.seat}</div>
                <div className="history-meta">Reservation #{item.id}</div>
              </div>
            </div>
            <div>
              <div className="history-title">{formatDate(item.date)}</div>
              <div className="history-meta">{item.time}</div>
            </div>
            <div>
              <span className={`tag tag-${item.status}`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </div>
            <div>
              {item.checkIn ? (
                <div className="history-meta">
                  <div>In: {item.checkIn}</div>
                  <div>Out: {item.checkOut}</div>
                </div>
              ) : (
                <div className="history-meta">Not checked in</div>
              )}
            </div>
            <div>
              <button className="btn btn-outline">
                <i className="fas fa-eye"></i> View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </InternLayout>
  );
};

export default ReservationHistory;