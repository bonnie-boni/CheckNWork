import mongoose from "mongoose";

const appliedJobSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  applicantEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  applicationDate: {
    type: Date,
    default: Date.now,
  },
  // Add any other relevant details here
});

const AppliedJob = mongoose.model("AppliedJob", appliedJobSchema);

export default AppliedJob;
