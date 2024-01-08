import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

export function createPassword(password: string = faker.internet.password()) {
  return {
    hash: bcrypt.hashSync(password, 10),
  };
}
