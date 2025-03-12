import express from "express";
import AppliedJob from "../models/appliedJob.js";
import { sendConfirmationEmail } from "../utils/email.js";

const router = express.Router();

router.post("/applications", async (req, res) => {
  try {
    const { jobId, applicantEmail } = req.body;

    const appliedJob = new AppliedJob({
      jobId,
      applicantEmail,
    });

    await appliedJob.save();

    // Send confirmation email
    await sendConfirmationEmail(applicantEmail, jobId);

    res.status(201).send({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: error.message });
  }
});

export default router;
