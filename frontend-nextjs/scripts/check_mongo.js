// scripts/check_mongo.js
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Prefer .env.local in project root (Next.js convention). Resolve relative
// to this script so it works even when invoked from other working dirs.
const envLocalPath = path.resolve(__dirname, '..', '.env.local');
const envPath = fs.existsSync(envLocalPath) ? envLocalPath : path.resolve(process.cwd(), '.env');
const result = dotenv.config({ path: envPath });
if (result.error) {
  // fall back to default behavior
  dotenv.config();
}

console.log('[dotenv] loaded env file');

const uri = process.env.MONGODB_URI;

async function check() {
  if (!uri) {
    console.error('MONGODB_URI is not set. Set it in .env.local');
    process.exit(1);
  }

  try {
    // Connect with short timeouts to fail fast on startup
    await mongoose.connect(uri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
    });
    console.log('MongoDB: connected');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('MongoDB: connection failed:', err.message || err);
    process.exit(1);
  }
}

check();
