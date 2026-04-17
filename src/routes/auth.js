const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// REGISTER - Create shop owner account
router.post('/register', (req, res) => {
  const { email, password } = req.body;

  // Hash the password before saving
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      res.status(500).json({ error: 'Failed to hash password' });
      return;
    }

    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(query, [email, hashedPassword], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Failed to register user' });
        return;
      }
      res.status(201).json({ message: 'Account created successfully' });
    });
  });
});

// LOGIN - AUTHENTICATE SHOP OWNER
router.post('/login',(req,res)=>{
  const {email, password}=req.body;

  const query='SELECT * FROM users WHERE email =?';
  db.query(query,[email],(err,results)=>{
    if(err){
      res.status(500).json({error:'Login failed'});
      return;
    }
    if(results.length === 0){
      res.status(401).json({error:'Invalid email or password'});
      return;
    }
    const user = results[0];

    bcrypt.compare(password,user.password,(err,isMatch)=>{
      if(err || !isMatch){
        res.status(401).json({error:'Invalid email or password'});
        return;
      }

      const token = jwt.sign(
        {id: user.id, email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:'1h'}
      );
      res.json({message: 'Login successful',token});
    });
  });
});

module.exports = router;