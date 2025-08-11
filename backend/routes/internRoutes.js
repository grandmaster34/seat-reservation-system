const express = require('express');
const router = express.Router();
const internController = require('../controllers/internController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected routes - require authentication
router.use(authMiddleware);

// Get intern dashboard data
router.get('/dashboard', internController.getInternDashboard);

// Get intern reservations
router.get('/reservations', internController.getInternReservations);

// Create new reservation
router.post('/reservations', internController.createInternReservation);

// Cancel reservation
router.put('/reservations/:id/cancel', internController.cancelInternReservation);

// Delete reservation
router.delete('/reservations/:id', internController.deleteInternReservation);

module.exports = router;
