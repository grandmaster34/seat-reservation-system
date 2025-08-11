import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import InternLayout from '../components/InternLayout';
import parkingService from '../services/parkingService';

const ParkingReserve = ({ onBack, user }) => {
  const [activeFilter, setActiveFilter] = useState('All Reservations');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    setStartDate(today.toISOString().split('T')[0]);
    setEndDate(nextWeek.toISOString().split('T')[0]);
    
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await parkingService.getParkingReservations();
      setReservations(data);
    } catch (err) {
      setError('Failed to load reservations. Please try again.');
      console.error('Error fetching reservations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleCancelReservation = async (id) => {
    const reservation = reservations.find(r => r.id === id);
    
    if (reservation && (reservation.status === 'upcoming' || reservation.status === 'active')) {
      if (window.confirm("Are you sure you want to cancel this parking reservation?")) {
        try {
          await parkingService.cancelParkingReservation(id);
          await fetchReservations();
        } catch (err) {
          alert('Failed to cancel reservation. Please try again.');
          console.error('Error cancelling reservation:', err);
        }
      }
    }
  };

  const handleEditReservation = (id) => {
    const reservation = reservations.find(r => r.id === id);
    if (reservation) {
      alert(`Editing parking reservation for: ${reservation.visitorName} at ${reservation.slot}`);
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
    <InternLayout title="Visitor Parking Management" user={user}>
      {/* CSS remains unchanged */}
       <style>{`
      :root {
        --primary: #4361ee;
        --primary-dark: #3a56d4;
        --primary-light: #eef2ff;
        --secondary: #64748b;
        --dark: #1e293b;
        --light: #f8fafc;
        --success: #10b981;
        --success-light: #d1fae5;
        --danger: #ef4444;
        --danger-light: #fee2e2;
        --warning: #f59e0b;
        --warning-light: #fef3c7;
        --border: #e2e8f0;
        --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      }
      
      /* Page Header */
      .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        background: white;
        padding: 1.5rem 2rem;
        border-radius: 16px;
        box-shadow: var(--card-shadow);
        border: 1px solid var(--border);
      }
      
      .page-title {
        font-size: 24px;
        font-weight: 700;
        color: var(--dark);
        margin-bottom: 0.25rem;
      }
      
      .page-subtitle {
        font-size: 14px;
        color: var(--secondary);
        font-weight: 500;
      }
      
      /* Dashboard Grid */
      .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
        margin-bottom: 2rem;
      }
      
      .dashboard-card {
        background: white;
        border-radius: 16px;
        padding: 1.5rem;
        box-shadow: var(--card-shadow);
        border: 1px solid var(--border);
      }
      
      .card-title {
        font-size: 14px;
        color: var(--secondary);
        font-weight: 600;
        margin-bottom: 0.5rem;
      }
      
      .card-value {
        font-size: 32px;
        font-weight: 700;
        color: var(--dark);
        margin-bottom: 0.5rem;
      }
      
      .card-subtext {
        font-size: 12px;
        color: var(--secondary);
        font-weight: 500;
      }
      
      .card-green {
        border-top: 4px solid var(--success);
      }
      
      .card-blue {
        border-top: 4px solid var(--primary);
      }
      
      .card-orange {
        border-top: 4px solid var(--warning);
      }
      
      /* Visitor Form */
      .visitor-form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-bottom: 2rem;
      }
      
      .form-group {
        margin-bottom: 1rem;
      }
      
      .form-label {
        display: block;
        font-size: 14px;
        color: var(--dark);
        font-weight: 600;
        margin-bottom: 0.5rem;
      }
      
      .form-input {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid var(--border);
        border-radius: 8px;
        font-size: 14px;
        transition: all 0.3s;
      }
      
      .form-input:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
      }
      
      /* Parking Map */
      .parking-map {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
      }
      
      .parking-slot {
        background: white;
        border-radius: 12px;
        padding: 1rem;
        text-align: center;
        box-shadow: var(--card-shadow);
        border: 1px solid var(--border);
        transition: all 0.3s;
        cursor: pointer;
      }
      
      .parking-slot:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
      }
      
      .slot-id {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 0.25rem;
        color: var(--dark);
      }
      
      .slot-status {
        font-size: 12px;
        font-weight: 600;
        padding: 0.25rem 0.5rem;
        border-radius: 20px;
        display: inline-block;
      }
      
      .status-available {
        background: var(--success-light);
        color: var(--success);
      }
      
      .status-reserved {
        background: var(--primary-light);
        color: var(--primary);
      }
      
      .status-occupied {
        background: var(--danger-light);
        color: var(--danger);
      }
      
      .status-changed {
        background: var(--warning-light);
        color: var(--warning);
      }
      
      .section-title {
        font-size: 18px;
        font-weight: 700;
        color: var(--dark);
        margin-bottom: 1.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--border);
      }
      
      /* Reservations Container */
      .reservations-container {
        background: white;
        border-radius: 16px;
        box-shadow: var(--card-shadow);
        padding: 2rem;
        border: 1px solid var(--border);
      }

      .loading-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 3rem;
        color: var(--secondary);
      }

      .error-container {
        text-align: center;
        padding: 2rem;
        color: var(--danger);
      }

      .error-container button {
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        background: var(--danger);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
      }

      .empty-state {
        text-align: center;
        padding: 3rem;
        color: var(--secondary);
      }

      .reservations-header {
        display: grid;
        grid-template-columns: 2fr 1.5fr 1fr 0.8fr 1fr 1fr;
        gap: 1rem;
        padding: 1rem 1.5rem;
        background: white;
        border-radius: 12px;
        font-weight: 700;
        color: var(--dark);
        border: 1px solid var(--border);
        margin-bottom: 1rem;
      }
      
      .reservation-card {
        display: flex;
        align-items: center;
        padding: 1.5rem;
        margin-bottom: 1rem;
        border-radius: 12px;
        background: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        border: 1px solid var(--border);
      }
      
      .reservation-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background: var(--primary-light);
        color: var(--primary);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        margin-right: 1.5rem;
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
        display: flex;
        gap: 1rem;
        margin-top: 0.5rem;
      }
      
      .meta-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
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
        background: var(--light);
        color: var(--secondary);
        transition: all 0.3s;
        font-size: 14px;
      }
      
      .btn-icon:hover {
        transform: scale(1.05);
        background: var(--primary-light);
        color: var(--primary);
      }
      
      /* Buttons */
      .btn {
        padding: 0.75rem 1.5rem;
        border-radius: 10px;
        border: none;
        font-weight: 600;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .btn-primary {
        background: var(--primary);
        color: white;
        box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
      }
      
      .btn-primary:hover {
        background: var(--primary-dark);
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(67, 97, 238, 0.4);
      }
      
      .btn-outline {
        background: transparent;
        border: 1px solid var(--border);
        color: var(--secondary);
      }
      
      .btn-outline:hover {
        background: var(--light);
        border-color: var(--primary);
        color: var(--primary);
      }
      
      /* Responsive */
      @media (max-width: 1200px) {
        .dashboard-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      
      @media (max-width: 768px) {
        .page-header {
          flex-direction: column;
          gap: 1rem;
          text-align: left;
          align-items: flex-start;
        }
        
        .dashboard-grid {
          grid-template-columns: 1fr;
        }
        
        .visitor-form {
          grid-template-columns: 1fr;
        }
      }
      
      /* Animation */
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .dashboard-card, .reservation-card, .parking-slot {
        animation: fadeIn 0.4s ease-out;
      }

      /* Missing styles from InternDashboard.jsx */

      .filters {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        font-size: 14px;
        color: var(--dark);
        background: white;
        padding: 0.75rem 1rem;
        border-radius: 12px;
        box-shadow: var(--card-shadow);
      }

      .filter-item {
        padding: 0.75rem 1.5rem;
        border-radius: 12px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        color: var(--secondary);
        user-select: none;
      }

      .filter-item:hover {
        background: var(--primary-light);
        color: var(--primary);
      }

      .filter-item.active {
        background: var(--primary);
        color: white;
        font-weight: 600;
      }

      .date-filter {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-left: auto;
      }

      .date-input {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--border);
        border-radius: 8px;
        font-size: 14px;
        transition: border-color 0.3s ease;
      }

      .date-input:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
      }

      .reservation-item {
        display: grid;
        grid-template-columns: 2fr 1.5fr 1fr 0.8fr 1fr 1fr;
        gap: 1rem;
        align-items: center;
        padding: 1rem 1.5rem;
        background: var(--light);
        border-radius: 12px;
        transition: background-color 0.3s ease;
        margin-bottom: 1rem;
      }

      .reservation-item:hover {
        background: #f1f5f9;
      }

      .reservation-info {
        display: flex;
        align-items: center;
        flex: 1;
      }

      .reservation-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background: var(--primary-light);
        color: var(--primary);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        margin-right: 1.5rem;
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
        display: flex;
        gap: 1rem;
        margin-top: 0.5rem;
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
        background: var(--light);
        color: var(--secondary);
        transition: all 0.3s;
        font-size: 14px;
      }

      .btn-icon:hover {
        transform: scale(1.05);
        background: var(--primary-light);
        color: var(--primary);
      }

      .btn-edit {
        color: var(--secondary);
      }

      .btn-edit:hover {
        background: var(--border);
      }

      .btn-cancel {
        color: var(--danger);
      }

      .btn-cancel:hover {
        background: var(--danger-light);
      }

      .tag {
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        margin-left: 12px;
      }

      .tag-active {
        background: rgba(16, 185, 129, 0.1);
        color: var(--success);
      }

      .tag-upcoming {
        background: rgba(245, 158, 11, 0.1);
        color: var(--warning);
      }

      .tag-past {
        background: rgba(100, 116, 139, 0.1);
        color: var(--secondary);
      }

      .tag-cancelled {
        background: rgba(239, 68, 68, 0.1);
        color: var(--danger);
      }
    `}</style>
      
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">Visitor Parking Reservations</h2>
          <p className="page-subtitle">Manage parking reservations for your visitors</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {onBack && (
            <button className="btn btn-outline" onClick={onBack}>
              <i className="fas fa-arrow-left"></i> Back to Dashboard
            </button>
          )}
          <button className="btn btn-primary">
            <i className="fas fa-plus"></i> New Parking Reservation
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
          <div>Parking Slot & Location</div>
          <div>Visitor Details</div>
          <div>Date & Time</div>
          <div>Status</div>
          <div>Reservation ID</div>
          <div>Actions</div>
        </div>
        
        {reservations.map(reservation => (
          <div key={reservation.id} className="reservation-item">
            <div className="reservation-info">
              <div className="reservation-icon">
                <i className="fas fa-car"></i>
              </div>
              <div className="reservation-details">
                <div className="reservation-title">{reservation.slot}</div>
                <div className="reservation-meta">{reservation.location}</div>
              </div>
            </div>
            <div>
              <div className="reservation-title">{reservation.visitorName}</div>
              <div className="reservation-meta">{reservation.licensePlate}</div>
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

export default ParkingReserve;