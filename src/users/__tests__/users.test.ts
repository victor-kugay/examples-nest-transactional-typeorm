import {DatabaseModule, DbConnection} from '../../database/database.module';
import {User} from '../entities/users/user.entity';
import {Test, TestingModule} from '@nestjs/testing';
import {UsersService} from '../users.service';
import {ModuleMetadata} from '@nestjs/common';
import {getConnection} from 'typeorm';

let usersService: UsersService;

let moduleRef: TestingModule;

const moduleConfig: ModuleMetadata = {
  imports: [DatabaseModule],
  providers: [UsersService],
};

beforeAll(async () => {
  moduleRef = await Test.createTestingModule(moduleConfig).compile();

  usersService = await moduleRef.get<UsersService>(UsersService);
});

afterAll(async () => {
  await moduleRef.close();
});

beforeEach(async () => {
  await getConnection(DbConnection.Users).synchronize(true);
});

describe('UsersModule (unit)', () => {
  test('UsersService: create user if not exists', async () => {
    await expect(createUserIfNotExists()).resolves.toBeDefined();
  });

  test('UsersService: throw exception if user already exists', async () => {
    await expect(createUserIfNotExists()).resolves.toBeDefined();
    await expect(createUserIfNotExists()).rejects.toThrowError();
  });
});

function createTestUser(): Partial<User> {
  return {
    id: '1',
    credits: 1000,
  };
}

function createUserIfNotExists(): Promise<User> {
  const testUser = createTestUser();

  return usersService.createUserIfNotExists(testUser);
}
