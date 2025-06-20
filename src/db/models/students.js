import { model, Schema } from 'mongoose';

const schemaStudents = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: false,
      enum: ['male', 'female'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const StudentsCollection = model(
  'Student',
  schemaStudents,
  'students',
);
