import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  pets: { type: [mongoose.Schema.Types.ObjectId], ref: 'Pet' },
});

const User = mongoose.model('User', userSchema);

export default User;
