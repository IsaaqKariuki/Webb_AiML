const express = require('express');
const router = express.Router();
const db = require('../config/db');
const verifyToken = require('../middleware/auth');

//Get all products
router.get('/',(req, res)=> {
    const query ='SELECT id, name, retail_price, image, stock,category FROM products';

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
  const query = 'SELECT id, name, retail_price, image, stock , categoryFROM products WHERE id = ?';
  
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

// POST add a product
router.post('/',verifyToken, (req, res) => {
  const { name, entry_price, retail_price, image,stock, category } = req.body;
  const query = 'INSERT INTO products (name, entry_price, retail_price, image, stock, category) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(query, [name, entry_price, retail_price, image,stock, category], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add product' });
      return;
    }
    res.status(201).json({ message: 'Product added successfully', id: results.insertId });
  });
});

// PUT UPDATE products
router.put('/:id',verifyToken,(req,res)=>{ 
  const { name, retail_price, stock } = req.body;
  const id = req.params.id;
  const query = 'UPDATE products SET name =?,retail_price=?,stock=? WHERE id=?'

  db.query(query, [name, retail_price, stock,id ],(err,results)=>{
    if(err){
      res.status(500).json({error:'Failed to update product'});
      return;
    }
    res.status(200).json({message:'Product updated successfully'});

  });
});

// DELETE A PRODUCT
router.delete('/:id',verifyToken,(req,res)=>{
  const id = req.params.id;
  const query ='DELETE FROM products WHERE id =?';

  db.query(query,[id],(err,results)=>{
    if (err){
      res.status(500).json({error:'Failed to DElETE product'});
      return;
    }
    res.status(200).json({message:'Product deleted successfully'})
  })
})

module.exports = router;