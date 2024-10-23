const express = require('express');
const router = express.Router();
const { addTransaction, getTransactions } = require('../controllers/transactionController');

// POST /api/transactions - Add a new transaction
router.post('/', addTransaction);

// GET /api/transactions - Get all transactions
router.get('/', getTransactions);

module.exports = router;
