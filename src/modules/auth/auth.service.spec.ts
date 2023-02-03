import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let prisma: DeepMockProxy<PrismaClient>;
  let jwtService: JwtService;
  let configService: ConfigService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, JwtService, ConfigService],
    }).overrideProvider(PrismaService)
    .useValue(mockDeep<PrismaClient>()).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});
