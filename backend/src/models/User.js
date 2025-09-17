import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    passwordHash: {
      type: String,
      required: true
    },
    avatarUrl: {
      type: String,
      default: ''
    },
    bio: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

userSchema.methods.toSafeObject = function toSafeObject () {
  const { _id, email, username, displayName, avatarUrl, bio, createdAt, updatedAt } = this;

  return {
    id: _id.toString(),
    email,
    username,
    displayName,
    avatarUrl,
    bio,
    createdAt,
    updatedAt
  };
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
