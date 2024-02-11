const express = require('express');
const router = express.Router();
const User = require('../model/user'); // Adjust the path if necessary

// POST endpoint to create a new user
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET endpoint to retrieve a user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// PUT endpoint to update a user by ID
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        user.set(req.body);
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// DELETE endpoint to delete a user by ID
router.delete('/:id', async (req, res) => {
    console.log("Delete request received for ID:", req.params.id);
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    } catch (error) {
        res.status(500).send('Server error');
    }
});



module.exports = router;
