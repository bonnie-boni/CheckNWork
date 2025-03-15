import mongoose from 'mongoose';

const completedTaskSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const CompletedTask = mongoose.model('CompletedTask', completedTaskSchema);

export default CompletedTask;
