require('dotenv').config();
const express = require('express');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const cors = require('cors');
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/order', orderRoutes);

app.get('/', (req, res) => {
  res.send('home!');
});

const port = process.env.PORT;
app.listen(port);