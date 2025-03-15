import express from 'express';
const router = express.Router();
import PostedJob from '../models/postedjobs.js';
import User from '../models/user.js';

router.get('/myjobs/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const jobs = await PostedJob.find({ userid: user._id });
    res.send(jobs);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/myjobs', auth, async (req, res) => {
  try {
    const { ...jobData } = req.body;
    const userid = req.user._id;
    const username = req.user.username;
    const postedJob = new PostedJob({ ...jobData, userid: req.user._id, username });
    await postedJob.save();
    res.status(201).send(postedJob);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/myjobs', async (req, res) => {
  try {
    const jobs = await PostedJob.find({});
    res.send(jobs);
  } catch (error) {
    res.status(500).send(error);
  }
});

import nodemailer from 'nodemailer';

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post('/send-email', async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send({ error: 'Failed to send email' });
      }
      console.log('Email sent:', info.response);
      res.send({ message: 'Email sent successfully!' });
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ error: 'Failed to send email' });
  }
});

router.delete('/myjobs/:id', async (req, res) => {
  try {
    const job = await PostedJob.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).send({ message: 'Job not found' });
    }
    res.send({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

import CompletedTask from '../models/completed_task.js';
import auth from '../middleware/auth.js';

router.put('/myjobs/:id/complete', auth, async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await PostedJob.findById(jobId);

    if (!job) {
      return res.status(404).send({ message: 'Job not found' });
    }

    job.completed = true;
    job.completedBy = 'User Name'; // Replace with the actual user name
    await job.save();

    const completedTask = new CompletedTask({
      image: job.image,
      category: job.category,
    });
    await completedTask.save();

    res.send({ message: 'Job marked as completed' });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/myjobs/:id', auth, async (req, res) => {
  try {
    const job = await PostedJob.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).send({ message: 'Job not found' });
    }
    res.send({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/myjobs/:id', async (req, res) => {
  try {
    const job = await PostedJob.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).send();
    }
    res.send(job);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
