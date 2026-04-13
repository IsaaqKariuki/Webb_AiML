const express = require('express');
const router = express.Router();
const db = require('../config/db');

//Get all products
router.get('/',(req, res)=> {
    const query ='SELECT id, name, retail_price, image FROM products';

    db.query(query, (err, results)=>{
        if(err){
            res.status(500).json({error:'Failed to fetch products'});
            return;
        }
        res.json(results);
    });
});

// GET single product
router.get('/:id', (req, res) => {
  const query = 'SELECT id, name, retail_price, image FROM products WHERE id = ?';
  
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch product' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(results[0]);
  });
});

module.exports = router;