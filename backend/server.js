import express from 'express';
import mongoose, { Types } from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import applicationRouter from './src/routers/application.js';

config({ path: '.env' });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Allow requests from the frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies and sessions to be shared
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// MongoDB connection
mongoose.connect('mongodb+srv://xanensismo:eIB3SDhf6z1YMqq4@cluster0.6gshj.mongodb.net/TeamProject?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Connected to MongoDB');
    console.log('Mongoose connection state:', mongoose.connection.readyState);
  })
.catch(err => {
    console.error('MongoDB connection error:', err);
    console.error(err);
  });

// Routers
import { sendConfirmationEmail } from './src/utils/email.js';

import auth from './src/middleware/auth.js';

import PostedJob from './src/models/postedjobs.js';
import User from './src/models/user.js';

app.use(applicationRouter);


// Define terms and conditions
const termsAndConditions = `
Terms and Conditions:

1.  Users must provide accurate information.
2.  Users must comply with all applicable laws.
3.  [Add more terms and conditions here]

Data Privacy:

`;

app.get('/termsAndConditions', (req, res) => {
  res.status(200).send(termsAndConditions);
});

app.get('/testEmail', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).send({ error: 'Email address is required.' });
    }

    const defaultPosterContactInfo = {
      email: 'test@example.com',
      username: 'Test User',
    };

    await sendConfirmationEmail(email, { category: 'Test Email', description: 'This is a test email.', amount: 0, location: 'Test' }, 'No terms and conditions.', defaultPosterContactInfo);
    res.status(200).send({ message: 'Test email sent successfully!' });
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).send({ error: 'Failed to send test email.' });
  }
});

app.get('/oauth2callback', (req, res) => {
  res.send('OAuth2 callback received. You can close this window.');
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
  console.log(`JWT Secret: ${process.env.JWT_SECRET}`);
});
