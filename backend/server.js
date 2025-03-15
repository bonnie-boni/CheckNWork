import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import applicationRouter from './src/routers/application.js';

config({ path: '.env' });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// MongoDB connection
mongoose.connect('mongodb+srv://xanensismo:eIB3SDhf6z1YMqq4@cluster0.6gshj.mongodb.net/TeamProject?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
    console.log('Mongoose connection state:', mongoose.connection.readyState);
  })
.catch(err => {
    console.error('MongoDB connection error:', err);
    console.error(err);
  });

// Routers
app.use(applicationRouter);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
