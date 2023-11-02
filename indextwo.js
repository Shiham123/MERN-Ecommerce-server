const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster-one.varjcyv.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log('MongoDB is connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

app.get('/products', async (request, response) => {
  try {
    const productDatabase = mongoose.connection.useDb('practice-server');
    const productCollection = productDatabase.collection('product');
    const products = await productCollection.find().toArray();
    response.status(200).send(products);
  } catch (error) {
    console.error('Error while fetching products:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', async (request, response) => {
  response.send('successfully connected');
});

app.listen(port, async () => {
  console.log(`server is running at http://localhost:${port}`);
  await connectDB();
});
