// scripts/sync_seat_counters.js
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

  console.log('=== Syncing Seat Counters with Actual Counts ===\n');

  // Map model keys to actual collection names
  const workshops = [
    { key: 'HackproofingRegistration', coll: 'hackproofingregistrations', name: 'Hackproofing the Future' },
    { key: 'PromptToProductRegistration', coll: 'prompttoproductregistrations', name: 'Prompt to Product' },
    { key: 'FullStackFusionRegistration', coll: 'fullstackfusionregistrations', name: 'Full Stack Fusion' },
    { key: 'LearnHowToThinkRegistration', coll: 'learnhowtothinkregistrations', name: 'Learn How to Think' },
  ];

  for (const ws of workshops) {
    const exists = await db.listCollections({ name: ws.coll }).hasNext();
    const actualCount = exists ? await db.collection(ws.coll).countDocuments() : 0;

    console.log(`${ws.name}`);
    console.log(`  Actual registrations: ${actualCount}`);
    console.log(`  Setting seat_counters.reserved = ${actualCount}`);

    await db.collection('seat_counters').updateOne(
      { key: ws.key },
      {
        $set: {
          key: ws.key,
          capacity: 120,
          reserved: actualCount
        }
      },
      { upsert: true }
    );

    console.log(`  ✓ Synced\n`);
  }

  console.log('=== Done ===');
  console.log('Run "node scripts/check_seats_fixed.js" to verify.\n');

  await mongoose.disconnect();
}

run().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
