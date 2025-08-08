import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import InternLayout from '../components/InternLayout';

const SeatReserve = ({ onBack, user }) => {
  const [activeFilter, setActiveFilter] = useState('All Reservations');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reservations, setReservations] = useState([
    {
      id: 'RSV-00123',
      seat: 'Desk B3 - Main Area',
      location: 'Floor 2, Section A',
      date: 'Today, Aug 15',
      time: '8:00 AM - 6:00 PM',
      status: 'active'
    },
    {
      id: 'RSV-00124',
      seat: 'Desk A1 - Window Side',
      location: 'Floor 3, Section C',
      date: 'Wed, Aug 17',
      time: '9:00 AM - 5:00 PM',
      status: 'upcoming'
    },
    {
      id: 'RSV-00125',
      seat: 'Desk C2 - Quiet Zone',
      location: 'Floor 1, Section B',
      date: 'Fri, Aug 19',
      time: '10:00 AM - 4:00 PM',
      status: 'upcoming'
    },
    {
      id: 'RSV-00122',
      seat: 'Desk A2 - Main Area',
      location: 'Floor 2, Section A',
      date: 'Mon, Aug 14',
      time: 'Full Day',
      status: 'past'
    },
    {
      id: 'RSV-00120',
      seat: 'Desk D5 - Collaboration Zone',
      location: 'Floor 2, Section D',
      date: 'Thu, Aug 10',
      time: '1:00 PM - 5:00 PM',
      status: 'cancelled'
    }
  ]);

  useEffect(() => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    setStartDate(today.toISOString().split('T')[0]);
    setEndDate(nextWeek.toISOString().split('T')[0]);
  }, []);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleCancelReservation = (id) => {
    const reservation = reservations.find(r => r.id === id);
    
    if (reservation && reservation.status === 'upcoming') {
      if (window.confirm("Are you sure you want to cancel this reservation?")) {
        setReservations(prev => prev.map(r => 
          r.id === id ? { ...r, status: 'cancelled' } : r
        ));
      }
    }
  };

  const handleEditReservation = (id) => {
    const reservation = reservations.find(r => r.id === id);
    if (reservation) {
      alert(`Editing reservation for: ${reservation.seat}`);
    }
  };

  const getStatusTag = (status) => {
    const statusClasses = {
      upcoming: 'tag-upcoming',
      active: 'tag-active',
      past: 'tag-past',
      cancelled: 'tag-cancelled'
    };

    const statusText = {
      upcoming: 'Upcoming',
      active: 'Active',
      past: 'Past',
      cancelled: 'Cancelled'
    };

    return (
      <span className={`tag ${statusClasses[status]}`}>
        {statusText[status]}
      </span>
    );
  };

  const renderActions = (reservation) => {
    if (reservation.status === 'upcoming') {
      return (
        <div className="reservation-actions">
          <button 
            className="btn-icon btn-edit"
            onClick={() => handleEditReservation(reservation.id)}
          >
            <i className="fas fa-edit"></i>
          </button>
          <button 
            className="btn-icon btn-cancel"
            onClick={() => handleCancelReservation(reservation.id)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      );
    } else if (reservation.status === 'active') {
      return (
        <div className="reservation-actions">
          <button 
            className="btn-icon btn-cancel"
            onClick={() => handleCancelReservation(reservation.id)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      );
    } else if (reservation.status === 'past') {
      return (
        <div className="reservation-actions">
          <button className="btn-icon">
            <i className="fas fa-file-download"></i>
          </button>
        </div>
      );
    } else if (reservation.status === 'cancelled') {
      return (
        <div className="reservation-actions">
          <button className="btn-icon">
            <i className="fas fa-redo"></i>
          </button>
        </div>
      );
    }
  };

  return (
    <InternLayout title="Reservations Management" user={user}>
      <style>{`
        /* Page Header */
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          background: rgba(255, 255, 255, 0.95);
          padding: 2rem;
          border-radius: 20px;
          box-shadow: var(--card-shadow);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }
        
        .page-title {
          font-size: 28px;
          font-weight: 700;
          color: var(--dark);
          margin-bottom: 0.5rem;
        }
        
        .page-subtitle {
          font-size: 16px;
          color: var(--secondary);
          font-weight: 500;
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
        
        .date-filter {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.9);
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }
        
        .date-input {
          padding: 0.5rem 1rem;
          border: 2px solid var(--border);
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .date-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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
        
        /* Reservations Container */
        .reservations-container {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          box-shadow: var(--card-shadow);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }
        
        .reservations-header {
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
        
        .reservation-item {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 2rem;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid var(--border);
          align-items: center;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.5);
        }
        
        .reservation-item:hover {
          background: rgba(59, 130, 246, 0.05);
          transform: translateX(4px);
        }
        
        .reservation-item:last-child {
          border-bottom: none;
        }
        
        .reservation-info {
          display: flex;
          align-items: center;
          gap: 1rem;
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
          font-size: 20px;
          flex-shrink: 0;
        }
        
        .reservation-details {
          flex: 1;
        }
        
        .reservation-title {
          font-weight: 700;
          margin-bottom: 0.25rem;
          color: var(--dark);
          font-size: 16px;
        }
        
        .reservation-meta {
          font-size: 14px;
          color: var(--secondary);
          font-weight: 500;
        }
        
        .reservation-actions {
          display: flex;
          gap: 0.5rem;
        }
        
        .btn-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.9);
          color: var(--secondary);
          transition: all 0.3s ease;
          font-size: 14px;
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
        
        .tag-cancelled {
          background: linear-gradient(135deg, var(--danger-light) 0%, #fecaca 100%);
          color: var(--danger);
        }
        
        /* Responsive */
        @media (max-width: 1200px) {
          .reservations-header,
          .reservation-item {
            grid-template-columns: 2fr 1fr 1fr 1fr;
          }
          
          .reservations-header div:last-child,
          .reservation-item > div:last-child {
            display: none;
          }
        }
        
        @media (max-width: 992px) {
          .reservations-header,
          .reservation-item {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .reservations-header {
            display: none;
          }
          
          .reservation-item {
            padding: 1rem;
            border-radius: 12px;
            margin-bottom: 1rem;
            box-shadow: var(--card-shadow);
          }
        }
        
        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
          
          .filters {
            flex-direction: column;
            align-items: stretch;
          }
          
          .date-filter {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .reservations-container {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
      
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">Your Reservations</h2>
          <p className="page-subtitle">View and manage all your seat reservations</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {onBack && (
            <button className="btn btn-outline" onClick={onBack}>
              <i className="fas fa-arrow-left"></i> Back to Dashboard
            </button>
          )}
          <button className="btn btn-primary">
            <i className="fas fa-plus"></i> New Reservation
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="filters">
        {['All Reservations', 'Upcoming', 'Active', 'Past', 'Cancelled'].map(filter => (
          <div
            key={filter}
            className={`filter-item ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => handleFilterChange(filter)}
          >
            {filter}
          </div>
        ))}
        
        <div className="date-filter">
          <input
            type="date"
            className="date-input"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span>to</span>
          <input
            type="date"
            className="date-input"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button className="btn btn-outline">
            <i className="fas fa-filter"></i> Apply
          </button>
        </div>
      </div>
      
      {/* Reservations List */}
      <div className="reservations-container">
        <div className="reservations-header">
          <div>Seat & Location</div>
          <div>Date & Time</div>
          <div>Status</div>
          <div>Reservation ID</div>
          <div>Actions</div>
        </div>
        
        {reservations.map(reservation => (
          <div key={reservation.id} className="reservation-item">
            <div className="reservation-info">
              <div className="reservation-icon">
                <i className="fas fa-chair"></i>
              </div>
              <div className="reservation-details">
                <div className="reservation-title">{reservation.seat}</div>
                <div className="reservation-meta">{reservation.location}</div>
              </div>
            </div>
            <div>
              <div className="reservation-title">{reservation.date}</div>
              <div className="reservation-meta">{reservation.time}</div>
            </div>
            <div>
              {getStatusTag(reservation.status)}
            </div>
            <div className="reservation-meta">#{reservation.id}</div>
            {renderActions(reservation)}
          </div>
        ))}
      </div>
    </InternLayout>
  );
};

export default SeatReserve;