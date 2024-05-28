const express = require('express');
const generateMonthlyReport = require('../utils/reportGenerator');
const router = express.Router();

router.get('/monthly-report', async (req, res) => {
  const { userId } = req.user;
  const { month, year } = req.query;

  try {
    const report = await generateMonthlyReport(userId, month, year);
    res.set('Content-Type', 'image/png');
    res.send(report);
  } catch (error) {
    res.status(500).json({ error: 'Error generating report' });
  }
});

module.exports = router;
