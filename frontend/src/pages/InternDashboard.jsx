import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNavigation } from '../context/NavigationContext';
import InternSidebar from '../components/InternSidebar';
import InternHeader from '../components/InternHeader';
import api from '../api';

const InternDashboard = ({ user, initialPage = 'dashboard' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentPage, navigateTo, goToDashboard } = useNavigation();

  const [dashboardData, setDashboardData] = useState({
    totalReservations: 0,
    upcomingReservations: [],
    recentActivity: [],
    userProfile: null
  });

  const [reservations, setReservations] = useState([]);
  const [parkingSlots, setParkingSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [reservationDate, setReservationDate] = useState('');
  const [visitorName, setVisitorName] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  useEffect(() => {
    fetchDashboardData();
    fetchReservations();
    fetchParkingSlots();

    const today = new Date().toISOString().split('T')[0];
    setReservationDate(today);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/intern/dashboard');
      if (response.data.success) {
        setDashboardData(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await api.get('/intern/reservations');
      if (response.data.success) {
        setReservations(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching reservations:', err);
    }
  };

  const fetchParkingSlots = async () => {
    try {
      const response = await api.get('/seats');
      console.log('Parking slots response:', response.data);
      
      if (response.data && response.data.data) {
        const seats = response.data.data;
        const slots = seats.map(seat => ({
          id: seat.seat_number || seat.seatNumber,
          status: seat.status === 'available' ? 'available' : 'occupied',
          location: seat.location || 'Main Area',
          seatId: seat.id
        }));
        setParkingSlots(slots);
        console.log('Processed parking slots:', slots);
      } else if (response.data && Array.isArray(response.data)) {
        // Handle direct array response
        const slots = response.data.map(seat => ({
          id: seat.seat_number || seat.seatNumber,
          status: seat.status === 'available' ? 'available' : 'occupied',
          location: seat.location || 'Main Area',
          seatId: seat.id
        }));
        setParkingSlots(slots);
        console.log('Processed parking slots (direct array):', slots);
      } else {
        console.warn('No parking slots data found');
        setParkingSlots([]);
      }
    } catch (err) {
      console.error('Error fetching parking slots:', err);
      setParkingSlots([]);
    }
  };

  const handleSelectSlot = (slotId) => {
    const slot = parkingSlots.find(s => s.id === slotId);
    if (slot && slot.status === 'available') {
      setSelectedSlot(slot);
    }
  };

  const handleCreateReservation = async () => {
    if (!selectedSlot || !visitorName || !licensePlate || !reservationDate) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      console.log('Creating reservation with:', {
        seat_id: selectedSlot.seatId,
        reservation_date: reservationDate,
        visitor_name: visitorName,
        license_plate: licensePlate,
        time_slot: 'Full day'
      });

      const response = await api.post('/intern/reservations', {
        seat_id: selectedSlot.seatId,
        reservation_date: reservationDate,
        visitor_name: visitorName,
        license_plate: licensePlate,
        time_slot: 'Full day'
      });

      if (response.data.success) {
        alert('Reservation created successfully!');
        fetchDashboardData();
        fetchReservations();
        fetchParkingSlots();
        setSelectedSlot(null);
        setVisitorName('');
        setLicensePlate('');
      }
    } catch (err) {
      console.error('Error creating reservation:', err);
      const errorMessage = err.response?.data?.message || 'Failed to create reservation. Please try again.';
      alert(errorMessage);
    }
  };

  const handleCancelReservation = async (reservationId) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      try {
        const response = await api.put(`/intern/reservations/${reservationId}/cancel`);
        if (response.data.success) {
          alert('Reservation cancelled successfully!');
          fetchDashboardData();
          fetchReservations();
        }
      } catch (err) {
        console.error('Error cancelling reservation:', err);
        alert('Failed to cancel reservation. Please try again.');
      }
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    if (window.confirm('Are you sure you want to delete this cancelled reservation? This action cannot be undone.')) {
      try {
        const response = await api.delete(`/intern/reservations/${reservationId}`);
        if (response.data.success) {
          alert('Reservation deleted successfully!');
          fetchDashboardData();
          fetchReservations();
        }
      } catch (err) {
        console.error('Error deleting reservation:', err);
        const errorMessage = err.response?.data?.message || 'Failed to delete reservation. Please try again.';
        alert(errorMessage);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <style jsx>{`
        /* Global Styles */
        :root {
          --primary: #4361ee;
          --primary-dark: #3a56e0;
          --primary-light: #e6eaf8;
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
          --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          --card-shadow-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background-color: #f5f7fa;
          color: var(--dark);
          line-height: 1.5;
        }

        /* Dashboard Layout */
        .dashboard {
          display: flex;
          min-height: 100vh;
          background-color: #f5f7fa;
        }

        .main-content {
          flex: 1;
          padding: 20px;
          padding-left: 100px;
          transition: var(--transition);
          padding-right: 50px;
        }

        /* Dashboard Cards */
        .dashboard-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: var(--card-shadow);
          transition: var(--transition);
          position: relative;
          overflow: hidden;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: var(--card-shadow-hover);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .card-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--secondary);
        }

        .card-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .bg-blue { background-color: var(--primary-light); color: var(--primary); }
        .bg-green { background-color: var(--success-light); color: var(--success); }
        .bg-orange { background-color: var(--warning-light); color: var(--warning); }

        .card-value {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--dark);
        }

        .card-text {
          font-size: 0.9rem;
          color: var(--secondary);
        }

        /* Panel Styles */
        .reservation-section {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 1200px) {
          .reservation-section {
            grid-template-columns: 2fr 1fr;
          }
        }

        .panel {
          background: white;
          border-radius: 16px;
          box-shadow: var(--card-shadow);
          overflow: hidden;
          transition: var(--transition);
        }

        .panel:hover {
          box-shadow: var(--card-shadow-hover);
        }

        .panel-header {
          padding: 20px 24px;
          border-bottom: 1px solid var(--border);
        }

        .panel-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--dark);
        }

        .panel-body {
          padding: 24px;
        }

        /* Form Elements */
        .date-selector {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }

        .date-input, input[type="text"], input[type="date"] {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid var(--border);
          border-radius: 12px;
          font-size: 0.9rem;
          transition: var(--transition);
        }

        .date-input:focus, input[type="text"]:focus, input[type="date"]:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
        }

        .visitor-info {
          margin-bottom: 24px;
        }

        /* Buttons */
        .btn {
          padding: 12px 20px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: none;
          font-size: 0.9rem;
        }

        .btn-primary {
          background: var(--primary);
          color: white;
        }

        .btn-primary:hover {
          background: var(--primary-dark);
        }

        .btn-outline {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--secondary);
        }

        .btn-outline:hover {
          background: var(--light);
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Parking Lot Grid */
        .parking-lot {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 16px;
          margin-top: 16px;
        }

        .slot {
          height: 120px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid var(--border);
          cursor: pointer;
          transition: var(--transition);
          position: relative;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .slot:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
        }

        .slot.available {
          background: linear-gradient(135deg, var(--success-light) 0%, #bbf7d0 100%);
          border-color: var(--success);
        }

        .slot.selected {
          background: linear-gradient(135deg, var(--primary-light) 0%, #bfdbfe 100%);
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.3);
        }

        .slot.occupied {
          background: linear-gradient(135deg, var(--danger-light) 0%, #fecaca 100%);
          border-color: var(--danger);
          cursor: not-allowed;
          opacity: 0.8;
        }

        .slot-number {
          font-weight: 800;
          font-size: 20px;
          margin-bottom: 8px;
          z-index: 1;
        }

        .slot-status {
          font-size: 12px;
          padding: 4px 12px;
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
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .reservation-item {
          display: flex;
          align-items: center;
          padding: 16px;
          background: var(--light);
          border-radius: 12px;
          transition: var(--transition);
          position: relative;
        }

        .reservation-item:hover {
          background: #f1f5f9;
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
          font-size: 1.2rem;
          margin-right: 16px;
          flex-shrink: 0;
        }

        .reservation-details {
          flex: 1;
          min-width: 0;
        }

        .reservation-title {
          font-weight: 600;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .reservation-meta {
          display: flex;
          gap: 16px;
          font-size: 0.85rem;
          color: var(--secondary);
          margin-bottom: 4px;
        }

        .reservation-meta span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .visitor-name {
          font-size: 0.85rem;
          color: var(--secondary);
          display: flex;
          align-items: center;
          gap: 4px;
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

        .reservation-actions {
          display: flex;
          gap: 8px;
          margin-left: 12px;
        }

        .btn-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: var(--transition);
        }

        .btn-edit {
          color: var(--secondary);
        }

        .btn-edit:hover {
          background: var(--gray);
        }

        .btn-cancel {
          color: var(--danger);
        }

        .btn-cancel:hover {
          background: var(--danger-light);
        }

        /* Responsive Adjustments */
        @media (max-width: 992px) {
          .main-content {
            padding-left: 80px;
          }
        }

        @media (max-width: 768px) {
          .main-content {
            padding: 15px;
            padding-left: 70px;
          }

          .date-selector {
            flex-direction: column;
          }

          .reservation-item {
            flex-wrap: wrap;
          }

          .tag {
            position: absolute;
            top: 16px;
            right: 16px;
          }

          .reservation-actions {
            margin-left: auto;
            margin-top: 10px;
          }
        }

        /* Animation Enhancements */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .card, .panel {
          animation: fadeIn 0.4s ease-out;
        }

        .card:nth-child(2) { animation-delay: 0.1s; }
        .card:nth-child(3) { animation-delay: 0.2s; }
        .panel:nth-child(2) { animation-delay: 0.3s; }
      `}</style>

      <InternSidebar user={user} />

      <main className="main-content">
        <InternHeader title="Visitor Parking Reservation" user={user} />

        <div className="dashboard-cards">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Available Slots</h3>
              <div className="card-icon bg-blue">
                <i className="fas fa-parking"></i>
              </div>
            </div>
            <div className="card-value">{parkingSlots.filter(s => s.status === 'available').length}</div>
            <div className="card-text">Slots available today</div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Your Reservations</h3>
              <div className="card-icon bg-green">
                <i className="fas fa-calendar-check"></i>
              </div>
            </div>
            <div className="card-value">{dashboardData.totalReservations}</div>
            <div className="card-text">Active and upcoming</div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Parking Capacity</h3>
              <div className="card-icon bg-orange">
                <i className="fas fa-car"></i>
              </div>
            </div>
            <div className="card-value">
              {parkingSlots.length > 0
                ? Math.round(((parkingSlots.length - parkingSlots.filter(s => s.status === 'available').length) / parkingSlots.length) * 100) + '%'
                : 'N/A'}
            </div>
            <div className="card-text">Current utilization rate</div>
          </div>
        </div>

        <div className="reservation-section">
          <div className="panel">
            <div className="panel-header">
              <h2 className="panel-title">Reserve a Parking Slot</h2>
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
                <button className="btn btn-primary" onClick={handleCreateReservation} disabled={!selectedSlot || !visitorName || !licensePlate}>
                  <i className="fas fa-check-circle"></i> Confirm Reservation
                </button>
              </div>

              <div className="visitor-info" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.5rem', color: 'var(--dark)', fontWeight: '700' }}>
                  Visitor Information
                </h3>
                <input
                  type="text"
                  className="date-input"
                  placeholder="Visitor's Full Name"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  style={{ marginBottom: '1rem' }}
                />
                <input
                  type="text"
                  className="date-input"
                  placeholder="Vehicle License Plate"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                />
              </div>

              <h3 style={{ marginBottom: '0.5rem', color: 'var(--dark)', fontWeight: '700' }}>
                Parking Lot - Main Area
              </h3>
              <p className="card-text" style={{ marginBottom: '1.5rem' }}>
                Select an available slot for your visitor
              </p>

              <div className="parking-lot">
                {parkingSlots.map((slot) => (
                  <div
                    key={slot.id}
                    className={`slot ${slot.status} ${selectedSlot && selectedSlot.id === slot.id ? 'selected' : ''}`}
                    onClick={() => handleSelectSlot(slot.id)}
                  >
                    <div className="slot-number">{slot.id}</div>
                    <div className={`slot-status status-${slot.status}`}>
                      {slot.status === 'available' ? 'Available' : 'Occupied'}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setSelectedSlot(null)}>
                  Clear Selection
                </button>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h2 className="panel-title">Your Reservations</h2>
            </div>
            <div className="panel-body">
              <div className="reservations">
                {reservations.length === 0 && <p>No reservations found.</p>}
                {reservations.map((reservation) => (
                  <div key={reservation.id} className="reservation-item">
                    <div className="reservation-icon">
                      <i
                        className={
                          reservation.status === 'active'
                            ? 'fas fa-car'
                            : reservation.status === 'cancelled'
                            ? 'fas fa-times-circle'
                            : 'fas fa-calendar-alt'
                        }
                      ></i>
                    </div>
                    <div className="reservation-details">
                      <div className="reservation-title">
                        Parking Slot {reservation.seat_number} - {reservation.location}
                      </div>
                      <div className="reservation-meta">
                        <span>
                          <i className="far fa-calendar"></i> {new Date(reservation.reservation_date).toLocaleDateString()}
                        </span>
                        <span>
                          <i className="far fa-clock"></i> {reservation.time_slot}
                        </span>
                      </div>
                      <div className="visitor-name" style={{ marginTop: '0.5rem', fontSize: '14px' }}>
                        <i className="fas fa-user"></i> {reservation.visitor_name}
                      </div>
                    </div>
                    <div className={`tag tag-${reservation.status === 'active' ? 'active' : 'past'}`}>
                      {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                    </div>
                    {reservation.status === 'active' && (
                      <div className="reservation-actions">
                        <button className="btn-icon btn-cancel" onClick={() => handleCancelReservation(reservation.id)}>
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    )}
                    {reservation.status === 'cancelled' && (
                      <div className="reservation-actions">
                        <button 
                          className="btn-icon btn-cancel" 
                          onClick={() => handleDeleteReservation(reservation.id)}
                          title="Delete cancelled reservation"
                        >
                          <i className="fas fa-trash"></i>
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
