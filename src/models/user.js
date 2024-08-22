import mongoose from "@/utils/mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [20, 'Name cannot be more than 20 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    index: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
}, { timestamps: true });

// Ensure indexes are created
UserSchema.set('autoIndex', true);

export default mongoose.models?.User || mongoose.model('User', UserSchema);
