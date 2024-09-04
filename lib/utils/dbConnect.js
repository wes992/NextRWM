import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_DB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the NEXT_PUBLIC_DB_URI environment variable inside .env"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
    };
    cached.promise = await mongoose.connect(MONGODB_URI, opts);
    // .then((mongoose) => {
    //   return mongoose;
    // });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
