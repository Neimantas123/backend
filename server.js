import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('connecte to db ');
  })
  .catch((error) => {
    console.log(error.message);
  });

const app = express();

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.get('/api/products/:slug', (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

app.get('/api/product/:_id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params._id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server is running');
});
