import mongoose from 'mongoose';

const { Schema } = mongoose;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salary: {
    type: Number,
    required: true,
    default: 0,
  },
},                                {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'employees',
});

const taskModel = mongoose.model('Task', employeeSchema);

export default taskModel;
