import mongoose from 'mongoose';

const postedJobSchema = new mongoose.Schema({
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
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const PostedJob = mongoose.model('Postedjobs', postedJobSchema);

export default PostedJob;
