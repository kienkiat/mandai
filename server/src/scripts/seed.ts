import 'reflect-metadata';
import { getOrm } from '../orm';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';

const seed = async () => {
  const orm = await getOrm();
  const em = orm.em.fork();

  const existing = await em.findOne(User, { email: 'admin@example.com' });
  if (existing) {
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);
  const user = em.create(User, {
    username: 'Admin',
    email: 'admin@example.com',
    password: hashedPassword,
    role: 'admin',
  });

  await em.persistAndFlush(user);
  process.exit(0);
};

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
