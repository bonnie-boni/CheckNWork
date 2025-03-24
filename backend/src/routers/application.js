import express from 'express';
import bcrypt from 'bcryptjs';
const router = express.Router();
import PostedJob from '../models/postedjobs.js';
import User from '../models/user.js'; // Import the User model
import jwt from 'jsonwebtoken'; // Import jsonwebtoken
import AppliedJob from '../models/applied_jobs.js';
import auth from '../middleware/auth.js';
// Registration endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Create a new user
    const user = new User({ username, password, email });
    await user.save(); // Await the save operation

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error)  {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Failed to register user' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a token
    const token = jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET || 'your-secret-key');

    // Send the token in the response
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Failed to login' });
  }
});

router.get('/postedjobs', async (req, res) => {
  try {
    const jobs = await PostedJob.find({ completed: false });
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
    const postedJob = new PostedJob({ ...jobData, userid: req.user._id, username, completed: false });
    await postedJob.save();
    res.status(201).send(postedJob);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/myjobs', auth, async (req, res) => {
  try {
    const userid = req.user._id;
    const jobs = await PostedJob.find({ userid: userid });
    res.send(jobs);
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

// Apply for a job
router.post('/applyjob', auth, async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.user._id;

    // Check if the user has already applied for this job
    const existingApplication = await AppliedJob.findOne({ userId, jobId });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const appliedJob = new AppliedJob({ userId, jobId });
    await appliedJob.save();

    res.status(201).json({ message: 'Job application recorded successfully' });
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({ message: 'Failed to apply for job' });
  }
});

// Get applied jobs for a user
router.get('/appliedjobs', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const appliedJobs = await AppliedJob.find({ userId, isHidden: false });

    // Fetch the job details for each applied job
    const jobs = await Promise.all(appliedJobs.map(async (appliedJob) => {
      const job = await PostedJob.findById(appliedJob.jobId);
      return job;
    }));

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error getting applied jobs:', error);
    res.status(500).json({ message: 'Failed to get applied jobs' });
  }
});

// Hide an applied job
router.put('/appliedjobs/:id/hide', auth, async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user._id;

    // Find the applied job
    const appliedJob = await AppliedJob.findOne({ userId, jobId });
    if (!appliedJob) {
      return res.status(404).json({ message: 'Applied job not found' });
    }

    // Update the isHidden field
    appliedJob.isHidden = true;
    await appliedJob.save();

    res.status(200).json({ message: 'Applied job hidden successfully' });
  } catch (error) {
    console.error('Error hiding applied job:', error);
    res.status(500).json({ message: 'Failed to hide applied job' });
  }
});

export default router;
