import { model, Schema } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    accessToken: { type: String, required: true },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidation: {
      type: Date,
      required: true,
    },
    refreshTokenValidation: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const SessionCollection = model(
  'sessions',
  sessionSchema,
);
