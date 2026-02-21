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
if (!uri) { console.error('Set MONGODB_URI'); process.exit(1); }

async function run() {
  await mongoose.connect(uri, { bufferCommands: false });
  const db = mongoose.connection.db;

  const collections = [
    'hackproofingregistrations',
    'prompttoproductregistrations',
    'fullstackfusionregistrations',
    'learnhowtothinkregistrations',
    'portpassregistrations'
  ];

  for (const name of collections) {
    const exists = await db.listCollections({ name }).hasNext();
    if (!exists) {
      console.log(`${name}: (missing)`);
      continue;
    }
    const cnt = await db.collection(name).countDocuments();
    console.log(`${name}: ${cnt}`);
    const sample = await db.collection(name).find().sort({ registrationDate: -1 }).limit(3).toArray();
    console.log('  latest:', sample.map(s=>({email:s.email, contactNumber:s.contactNumber, registrationDate:s.registrationDate})));
  }

  const seatColl = 'seat_counters';
  if (await db.listCollections({ name: seatColl }).hasNext()) {
    const docs = await db.collection(seatColl).find().toArray();
    console.log('seat_counters:', docs);
  } else {
    console.log('seat_counters: (missing)');
  }

  await mongoose.disconnect();
}
run().catch(err=>{ console.error(err); process.exit(1); });