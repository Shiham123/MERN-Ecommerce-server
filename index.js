const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster-one.varjcyv.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  try {
    await client.connect();

    const productDatabase = client.db('practice-server'),
      productCollection = productDatabase.collection('product');

    app.get('/product', async (request, response) => {
      const cursor = productCollection.find();
      const result = await cursor.toArray();
      response.send(result);
    });

    await client.db('admin').command({ ping: 1 });
    console.log('You successfully connected to MongoDB!');
  } catch (error) {
    console.log(error);
  }
};
run();

app.get('/', async (request, response) => {
  response.send('successfully connected');
});

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});

// mongoose-------------------------
// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const mongoose = require('mongoose');

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// const mongoURI = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster-one.varjcyv.mongodb.net/${process.env.DB_NAME}`;

// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// // Define a Mongoose schema and model
// const productSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   price: Number,
// });

// const Product = mongoose.model('Product', productSchema);

// // Define routes
// app.get('/product', async (request, response) => {
//   try {
//     const products = await Product.find();
//     response.json(products);
//   } catch (error) {
//     console.error(error);
//     response.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.get('/', (request, response) => {
//   response.send('Successfully connected');
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });
