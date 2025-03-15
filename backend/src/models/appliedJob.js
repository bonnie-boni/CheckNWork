import mongoose from 'mongoose';

const appliedJobSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  willingToPay: {
    type: Number,
    required: true
  },
  location: {
    type: String
  },
  userid: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  datePosted: {
    type: Date,
    default: Date.now
  }
});

const PostedJob = mongoose.model('PostedJob', appliedJobSchema);

export default PostedJob;
