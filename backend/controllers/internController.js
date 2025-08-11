const Reservation = require('../models/Reservation');
const Seat = require('../models/Seat');
const User = require('../models/User');

// Get intern dashboard data
exports.getInternDashboard = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Get user profile
    const user = await User.findById(userId);
    
    // Get total reservations count
    const totalReservations = await Reservation.countByUserId(userId);
    
    // Get upcoming reservations (future dates)
    const upcomingReservations = await Reservation.getUpcomingByUserId(userId);
    
    // Get recent activity (last 5 reservations)
    const recentActivity = await Reservation.getRecentByUserId(userId, 5);
    
    // Format the data for frontend
    const dashboardData = {
      totalReservations: totalReservations || 0,
      upcomingReservations: upcomingReservations || [],
      recentActivity: recentActivity || [],
      userProfile: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
    
    res.json({ success: true, data: dashboardData });
  } catch (err) {
    console.error('❌ Get intern dashboard error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get intern reservations with detailed information
exports.getInternReservations = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Get reservations with seat details
    const reservations = await Reservation.getDetailedByUserId(userId);
    
    // Format for frontend
    const formattedReservations = reservations.map(reservation => ({
      id: reservation.id,
      seat_number: reservation.seat_number,
      location: reservation.location || 'Main Lot',
      reservation_date: reservation.reservation_date,
      time_slot: reservation.time_slot || 'Full day',
      status: reservation.status,
      visitor_name: reservation.visitor_name,
      license_plate: reservation.license_plate,
      created_at: reservation.created_at
    }));
    
    res.json({ success: true, data: formattedReservations });
  } catch (err) {
    console.error('❌ Get intern reservations error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

  // Create reservation for intern
  exports.createInternReservation = async (req, res) => {
    try {
      const userId = req.user.userId;
      const { seat_id, reservation_date, visitor_name, license_plate, time_slot } = req.body;
      
      // Validate required fields
      if (!seat_id || !reservation_date || !visitor_name || !license_plate) {
        return res.status(400).json({ 
          success: false, 
          message: 'All fields are required' 
        });
      }
      
      // Check if seat exists and is available
      const seat = await Seat.findById(seat_id);
      if (!seat) {
        return res.status(404).json({ success: false, message: 'Seat not found' });
      }
      
      // Check for existing reservation
      const existingReservation = await Reservation.findBySeatAndDate(seat_id, reservation_date);
      if (existingReservation && existingReservation.length > 0) {
        return res.status(400).json({ 
          success: false, 
          message: 'Seat is already reserved for this date' 
        });
      }
      
      // Create reservation (this will also create visitor)
      const reservationId = await Reservation.create({
        intern_id: userId,
        seat_id,
        reservation_date,
        visitor_name,
        license_plate,
        time_slot: time_slot || 'Full day',
        status: 'active'
      });
      
      res.json({ 
        success: true, 
        message: 'Reservation created successfully',
        reservationId 
      });
    } catch (err) {
      console.error('❌ Create intern reservation error:', err);
      res.status(500).json({ 
        success: false, 
        message: err.message || 'Failed to create reservation. Please try again.' 
      });
    }
  };

// Cancel reservation
exports.cancelInternReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    
    // Check if reservation exists and belongs to user
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }
    
    if (reservation.intern_id !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    
    // Update reservation status
    await Reservation.updateStatus(id, 'cancelled');
    
    res.json({ success: true, message: 'Reservation cancelled successfully' });
  } catch (err) {
    console.error('❌ Cancel intern reservation error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete reservation
exports.deleteInternReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    
    // Check if reservation exists and belongs to user
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }
    
    if (reservation.intern_id !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    
    // Only allow deletion of cancelled reservations
    if (reservation.status !== 'cancelled') {
      return res.status(400).json({ 
        success: false, 
        message: 'Only cancelled reservations can be deleted' 
      });
    }
    
    // Delete the reservation
    await Reservation.delete(id);
    
    res.json({ success: true, message: 'Reservation deleted successfully' });
  } catch (err) {
    console.error('❌ Delete intern reservation error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
