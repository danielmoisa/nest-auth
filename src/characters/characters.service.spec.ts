import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from './characters.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

describe('CharactersService', () => {
  let service: CharactersService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharactersService, PrismaService],
    }).overrideProvider(PrismaService)
    .useValue(mockDeep<PrismaClient>()).compile();

    service = module.get<CharactersService>(CharactersService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
