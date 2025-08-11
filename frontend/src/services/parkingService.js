import { reservationAPI } from '../api';

const parkingService = {
  // Get all parking reservations for current user
  getParkingReservations: async () => {
    try {
      const response = await reservationAPI.getUserReservations();
      return response.data || [];
    } catch (error) {
      console.error('Error fetching parking reservations:', error);
      throw error;
    }
  },

  // Create new parking reservation
  createParkingReservation: async (reservationData) => {
    try {
      const response = await reservationAPI.createReservation({
        seatId: reservationData.slotId,
        date: reservationData.date,
        timeSlot: reservationData.timeSlot,
        visitorName: reservationData.visitorName,
        licensePlate: reservationData.licensePlate
      });
      return response;
    } catch (error) {
      console.error('Error creating parking reservation:', error);
      throw error;
    }
  },

  // Update parking reservation
  updateParkingReservation: async (id, updateData) => {
    try {
      const response = await reservationAPI.updateReservation(id, updateData);
      return response;
    } catch (error) {
      console.error('Error updating parking reservation:', error);
      throw error;
    }
  },

  // Cancel parking reservation
  cancelParkingReservation: async (id) => {
    try {
      const response = await reservationAPI.updateReservation(id, { status: 'cancelled' });
      return response;
    } catch (error) {
      console.error('Error cancelling parking reservation:', error);
      throw error;
    }
  },

  // Delete parking reservation
  deleteParkingReservation: async (id) => {
    try {
      const response = await reservationAPI.deleteReservation(id);
      return response;
    } catch (error) {
      console.error('Error deleting parking reservation:', error);
      throw error;
    }
  },

  // Format reservation data for display
  formatReservationData: (reservation) => ({
    id: reservation.id,
    slot: `P-${reservation.seat_number} - ${reservation.location}`,
    location: reservation.location,
    date: new Date(reservation.reservation_date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }),
    time: reservation.time_slot,
    status: reservation.status,
    visitorName: reservation.visitor_name,
    licensePlate: reservation.license_plate,
    createdAt: reservation.created_at
  })
};

export default parkingService;
