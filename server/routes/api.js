const express = require('express');

// Router object to Handle Routes in of /server/routes/api
const router = express.Router();

// Get users
router.get('/test', (req, res) => {
    let data = ['1','2','3','8'];
    res.json(data);
});

module.exports = router;

