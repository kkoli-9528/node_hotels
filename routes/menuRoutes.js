const express = require('express');
const router = express.Router();
const MenuItem = require('../models/Menu');

router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenuItem = new MenuItem(data);
        const saveMenuItem = await newMenuItem.save();
        console.log('data saved');
        res.status(200).json(saveMenuItem);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste;
        if (taste === 'Sweet' || taste === 'Spicy' || taste === 'Sour') {
            const saveMenuItem = await MenuItem.find({ taste: taste });
            console.log('response fetched');
            res.status(200).json(saveMenuItem);
        } else {
            res.status(404).json({ error: 'Invalid taste type' })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const menuValueUpdate = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuId, menuValueUpdate, {
            new: true,
            runValidators: true
        });

        if (!response) {
            return res.status(404).json({ error: 'Menu not found' });
        }

        console.log('response update');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;

        const response = await MenuItem.findByIdAndDelete(menuId);

        if (!response) {
            return res.status(404).json({ error: 'Menu not found' });
        }

        console.log('response update');
        res.status(200).json({ message: 'data deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;