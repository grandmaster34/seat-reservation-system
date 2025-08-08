const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected routes - require authentication
router.use(authMiddleware);

// Get all reservations for a user (specific route first)
router.get('/user', reservationController.getUserReservations);

// Get all reservations (admin only)
router.get('/', reservationController.getAllReservations);

// Create a new reservation
router.post('/', reservationController.createReservation);

// Get a specific reservation (parameterized route last)
router.get('/:id', reservationController.getReservation);

// Update a reservation
router.put('/:id', reservationController.updateReservation);

// Delete a reservation
router.delete('/:id', reservationController.deleteReservation);

module.exports = router; 