import mongoose from "@/utils/mongoose"; // Ensure this path points to where you store mongoose in your project
import dotenv from 'dotenv';

dotenv.config();

let connection = null;

async function dbConnect() {
  if (connection) {
    return connection;
  }
  const MONGODB_URI = `mongodb+srv://${process.env.NEXT_PUBLIC_MONGODB_USERNAME}:${process.env.NEXT_PUBLIC_MONGODB_PASSWORD}@cluster0.ildcg.mongodb.net/crud_db?retryWrites=true&w=majority&appName=Cluster0`;
  if (!MONGODB_URI) {
    throw new Error('Please define the NEXT_PUBLIC_MONGODB_URI environment variable');
  }

  try {
    if (mongoose.connection.readyState === 1) {
      // Connection already established
      return mongoose.connection;
    } else {
      // Create a new connection
      connection = await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Successfully connected to MongoDB.");
      return connection;
    }
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export default dbConnect;
