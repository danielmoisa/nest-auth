import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../prisma/prisma.service';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';

describe('CharactersController', () => {
  let controller: CharactersController;
  let service: CharactersService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharactersController],
      providers: [CharactersService, PrismaService]
    }).overrideProvider(PrismaService)
    .useValue(mockDeep<PrismaClient>()).compile();

    controller = module.get<CharactersController>(CharactersController);
    service = module.get<CharactersService>(CharactersService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
