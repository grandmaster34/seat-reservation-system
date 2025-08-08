// backend/routes/testRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() AS now');
    res.json({ success: true, server_time: rows[0].now });
  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({ success: false, error: 'Database connection failed' });
  }
});

module.exports = router;
