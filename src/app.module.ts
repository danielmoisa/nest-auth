import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CharactersModule } from './modules/characters/characters.module';
import { MailModule } from './providers/mail/mail.module';
import { PrismaModule } from './providers/prisma/prisma.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    UsersModule,
    AuthModule,
    PrismaModule,
    CharactersModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
