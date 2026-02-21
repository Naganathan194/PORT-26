// scripts/test_registration.js
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

async function testSeatReservation() {
  await mongoose.connect(uri, { bufferCommands: false });
  const db = mongoose.connection.db;
  const seatCollection = db.collection('seat_counters');

  const seatKey = 'HackproofingRegistration';

  console.log('\n=== Testing Seat Reservation Logic ===\n');

  // 1. Check current state
  const before = await seatCollection.findOne({ key: seatKey });
  console.log('1. Current state:', before);

  // 2. Test the exact query used in the code
  const query = { 
    key: seatKey, 
    $or: [{ reserved: { $lt: 120 } }, { reserved: { $exists: false } }] 
  };
  console.log('\n2. Testing query:', JSON.stringify(query, null, 2));

  // Check if query would match
  const matchTest = await seatCollection.findOne(query);
  console.log('   Query matches document:', matchTest ? 'YES' : 'NO');
  if (matchTest) {
    console.log('   Matching document:', matchTest);
  }

  // 3. Try the findOneAndUpdate
  console.log('\n3. Attempting findOneAndUpdate...');
  const res = await seatCollection.findOneAndUpdate(
    query,
    { $inc: { reserved: 1 }, $setOnInsert: { key: seatKey, capacity: 120 } },
    { upsert: true, returnDocument: 'after' }
  );

  console.log('   Result object:', res);
  console.log('   res.value:', res?.value);
  console.log('   res.ok:', res?.ok);

  // MongoDB driver returns document directly in res (not res.value) in newer versions
  const updatedDoc = res?.value || res;
  if (!updatedDoc || typeof updatedDoc.reserved !== 'number') {
    console.log('\n❌ FAILED: No document matched. This is why registration fails!');
  } else {
    console.log('\n✅ SUCCESS: Seat reserved. New count:', updatedDoc.reserved);
  }

  // 4. Check final state
  const after = await seatCollection.findOne({ key: seatKey });
  console.log('\n4. Final state:', after);

  await mongoose.disconnect();
  console.log('\n=== Test Complete ===\n');
}

testSeatReservation().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
