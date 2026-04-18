require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const db =require('./config/db');
const productRoutes = require('./routes/products');

const app =express();

// Middle ware
app.use(cors());
app.use(express.json());
app.use('/products', productRoutes);

//Test route
app.get('/',(req,res) =>{
    res.json({message: 'Yisakes backend is running'})
})

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});

//HANDLES USERS
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

//HANDLES ORDERS
const orderRoutes = require('./routes/orders');
app.use('/orders', orderRoutes);