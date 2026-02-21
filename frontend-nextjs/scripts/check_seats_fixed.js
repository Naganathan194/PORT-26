// scripts/check_seats_fixed.js
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load .env.local
const envLocalPath = path.resolve(__dirname, '..', '.env.local');
const envPath = fs.existsSync(envLocalPath) ? envLocalPath : path.resolve(process.cwd(), '.env');
dotenv.config({ path: envPath });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI is not set. Set it in .env.local');
  process.exit(1);
}

async function run() {
  await mongoose.connect(uri, { bufferCommands: false });
  const db = mongoose.connection.db;

  console.log('=== Workshop Registration Status ===\n');

  // Map model keys to actual collection names (Next.js/Mongoose uses plural lowercase)
  const workshops = [
    { key: 'HackproofingRegistration', coll: 'hackproofingregistrations', name: 'Hackproofing the Future' },
    { key: 'PromptToProductRegistration', coll: 'prompttoproductregistrations', name: 'Prompt to Product' },
    { key: 'FullStackFusionRegistration', coll: 'fullstackfusionregistrations', name: 'Full Stack Fusion' },
    { key: 'LearnHowToThinkRegistration', coll: 'learnhowtothinkregistrations', name: 'Learn How to Think' },
    { key: 'PortPassRegistration', coll: 'portpassregistrations', name: 'Port Pass' },
  ];

  const seatCounters = await db.collection('seat_counters').find().toArray();
  const counterMap = {};
  seatCounters.forEach(doc => {
    counterMap[doc.key] = doc.reserved || 0;
  });

  for (const ws of workshops) {
    const exists = await db.listCollections({ name: ws.coll }).hasNext();
    const actualCount = exists ? await db.collection(ws.coll).countDocuments() : 0;
    const counterReserved = counterMap[ws.key] || 0;
    const mismatch = actualCount !== counterReserved;

    console.log(`${ws.name} (${ws.key})`);
    console.log(`  Actual registrations: ${actualCount}`);
    console.log(`  Seat counter reserved: ${counterReserved}`);
    console.log(`  Available: ${120 - counterReserved}/120`);
    if (mismatch) {
      console.log(`  ⚠️  MISMATCH! Counter needs sync (diff: ${Math.abs(actualCount - counterReserved)})`);
    }
    console.log('');
  }

  console.log('=== Seat Counters Collection ===');
  console.log(JSON.stringify(seatCounters, null, 2));

  await mongoose.disconnect();
}

run().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
