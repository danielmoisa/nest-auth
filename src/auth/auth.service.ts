import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { BadRequestException, ForbiddenException } from '@nestjs/common/exceptions';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly mailService: MailService
  ) {}

  async register(dto: RegisterDto) {
    try {
      // Generate password
      const hash = await argon.hash(dto.hash);

      // Save user in the db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      });

      // Generate uniquen token for email verify
      const token = this.jwt.sign(user.email, {
        secret: this.config.get('JWT_VERIFICATION_TOKEN_SECRET'),
        // expiresIn: `${this.config.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}`
      });

      //Generate confirmation url
      const url = `${this.config.get('EMAIL_CONFIRMATION_URL')}?token=${token}`;

      // Send confiramtion email for the new registered user
      await this.mailService.sendUserConfirmationEmail(user, token, url);

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }

      throw error;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Credentials incorrect');

    const matchPass = await argon.verify(user.hash, dto.hash);

    if (!matchPass) throw new ForbiddenException('Credentials incorrect');

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }

  async confirmEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    });
    
    if (user?.emailIsVerified) {
      throw new BadRequestException('Email already confirmed');
    }

    if(user) {
      await this.prisma.user.update({
        where: {
          email
        },
        data: {
          emailIsVerified: true
        }
      })
    }
  }

  async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwt.verify(token, {
        secret: this.config.get('JWT_VERIFICATION_TOKEN_SECRET'),
      });
 
      if (payload) {
        return payload;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }
}


