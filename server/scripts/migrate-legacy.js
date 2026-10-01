import mongoose from 'mongoose';
import env from '../src/config/env.js';
import logger from '../src/lib/logger.js';

await mongoose.connect(env.MONGO_URI);
const { db } = mongoose.connection;

const users = db.collection('users');
const posts = db.collection('posts');
const notifications = db.collection('notifications');

for (const user of await users.find({ email: /[A-Z]/ }).toArray()) {
  await users.updateOne({ _id: user._id }, { $set: { email: user.email.toLowerCase() } });
}
await users.updateMany({}, { $rename: { selectedFile: 'avatar' }, $unset: { id: '' } });

const userIdByFirstName = new Map();
for (const user of await users.find().toArray()) {
  if (!userIdByFirstName.has(user.firstName)) {
    userIdByFirstName.set(user.firstName, user._id);
  }
}

let migrated = 0;
let orphaned = 0;

for (const post of await posts.find({ kullanici: { $exists: true } }).toArray()) {
  const author = userIdByFirstName.get(post.kullanici);
  if (!author) {
    await posts.deleteOne({ _id: post._id });
    orphaned += 1;
    continue;
  }

  const comments = (post.comments ?? [])
    .filter((comment) => userIdByFirstName.has(comment.author))
    .map((comment) => ({ ...comment, author: userIdByFirstName.get(comment.author) }));

  await posts.updateOne(
    { _id: post._id },
    { $set: { author, comments, likes: [] }, $unset: { kullanici: '', likeCount: '' } }
  );
  migrated += 1;
}

const { deletedCount } = await notifications.deleteMany({ receiver: { $type: 'string' } });

logger.info(
  { migratedPosts: migrated, orphanedPosts: orphaned, removedNotifications: deletedCount },
  'Legacy data migrated'
);

await mongoose.disconnect();
