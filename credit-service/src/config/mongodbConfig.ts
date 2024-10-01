import mongoose from 'mongoose';
import {Routes} from "../constants";

const url = Routes.DATABASE_URL;

export async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(url);
    } catch (error) {
      throw error;
    }
  }
}

