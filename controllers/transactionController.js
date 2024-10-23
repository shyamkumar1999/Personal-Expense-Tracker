const Transaction = require('../models/Transaction');

// Add a new transaction
exports.addTransaction = async (req, res) => {
  const { type, category, amount, date, description } = req.body;
  try {
    const transaction = new Transaction({ type, category, amount, date, description });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
