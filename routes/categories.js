const express = require('express');
const router = express.Router();
const { addCategory, getCategories } = require('../controllers/categoryController');

// POST /api/categories - Add a new category
router.post('/', addCategory);

// GET /api/categories - Get all categories
router.get('/', getCategories);

module.exports = router;
