import mongoose from 'mongoose';

const appliedJobSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  jobId: {
    type: String,
    required: true
  },
  isHidden: {
    type: Boolean,
    default: false
  }
});

const AppliedJob = mongoose.model('AppliedJob', appliedJobSchema);

export default AppliedJob;
