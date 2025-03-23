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

app.use(applicationRouter);

import PostedJob from './src/models/postedjobs.js';
import User from './src/models/user.js';

app.post('/sendJobDetails', auth, async (req, res) => {
  try {
    if (!req.user) {
      console.error('Error: User not authenticated.');
      return res.status(401).send({ error: 'User not authenticated.' });
    }

    const { applicantEmail, jobDetails, termsAndConditions } = req.body;

    // Fetch job details from the database
    const job = await PostedJob.findById(jobDetails._id);
    if (!job) {
      console.error('Error: Job not found.');
      return res.status(404).send({ error: 'Job not found.' });
    }

    // Fetch job poster's contact information from the User model
    const jobPoster = await User.findById(job.userid);
    if (!jobPoster) {
      console.error('Error: Job poster not found.');
      return res.status(404).send({ error: 'Job poster not found.' });
    }

    const posterContactInfo = {
      email: jobPoster.email,
      username: jobPoster.username,
    };

    const updatedJobDetails = {
      category: job.category,
      description: job.description,
      amount: job.willingToPay,
      location: job.location,
    };

    await sendConfirmationEmail(applicantEmail, updatedJobDetails, termsAndConditions, posterContactInfo);
    res.status(200).send({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ error: 'Failed to send email.', details: error.message });
  }
});

// Define terms and conditions
const termsAndConditions = `
Terms and Conditions:

1.  Users must provide accurate information.
2.  Users must comply with all applicable laws.
3.  [Add more terms and conditions here]

Data Privacy:

[Add data privacy policy here]

Legal Steps for Violations:

[Add legal steps for violations here]
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
});
