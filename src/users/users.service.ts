import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService){}

    async getAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany()
    }

    async createNewUser(createUserDto: CreateUserDto): Promise<User> {
        const { email, firstName, lastName, hash} = createUserDto;
        return this.prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                hash
            }
        })
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
        const {id, email, hash, firstName, lastName} = updateUserDto;

        const user = this.prisma.user.findUnique({
            where: { id: Number(userId)}
        })

        if(!user) new NotFoundException(`User with the id ${userId} was not found!`);

        return this.prisma.user.update({
            where: { id: Number(userId)},
            data: {
                id,
                email, 
                hash,
                firstName,
                lastName
            }
        })
    }

    async deleteUser(id: string): Promise<User> {
        return this.prisma.user.delete({
            where: {
                id: Number(id)
            }
        })
    }
}
