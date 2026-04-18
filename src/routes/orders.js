const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST - Place an order
router.post('/', (req, res) => {
  const { customer_name, customer_email, items } = req.body;

  // Calculate total
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // First insert the order
  const orderQuery = 'INSERT INTO orders (customer_name, customer_email, total) VALUES (?, ?, ?)';
  db.query(orderQuery, [customer_name, customer_email, total], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to place order' });
      return;
    }

    const orderId = results.insertId;

    // Then insert each order item
    const itemQuery = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?';
    const itemValues = items.map(item => [orderId, item.product_id, item.quantity, item.price]);

    db.query(itemQuery, [itemValues], (err) => {
      if (err) {
        res.status(500).json({ error: 'Failed to save order items' });
        return;
      }
      res.status(201).json({ message: 'Order placed successfully', orderId });
    });
  });
});

module.exports = router;