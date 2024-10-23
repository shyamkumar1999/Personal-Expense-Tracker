const express = require('express');
const mongoose = require('mongoose');
const Category = require('./models/Category'); // Ensure the path to your Category model is correct

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(`mongodb://localhost:27017/expense_tracker`, { useNewUrlParser: true, useUnifiedTopology: true });


app.post('/api/categories', async (req, res) => {
    try {
        const newCategory = new Category(req.body); // Create a new category from the request body
        await newCategory.save(); // Save the new category to the database
        res.status(201).json(newCategory); // Send back the created category
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' }); // Handle errors
    }
});


// GET /api/categories route
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await Category.find(); // Fetch all categories from the database
        res.json(categories); // Send the categories as a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' }); // Send back an error response
    }
});

app.put('/api/categories/:id', async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(updatedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE /api/categories/:id route
app.delete('/api/categories/:id', async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(204).send(); // No content to send back
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
