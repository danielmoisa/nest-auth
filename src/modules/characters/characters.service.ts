import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { Character } from '@prisma/client'
import { CreateCharacterDto } from './dtos/create-character.dto';
import { UpdateCharacterDto } from './dtos/update-character.dto';

@Injectable()
export class CharactersService {
    constructor(private readonly prisma: PrismaService){}

    async getAllCharacters(): Promise<Character[]> {
        return this.prisma.character.findMany();
    }

    async getCharacterById(id: string): Promise<Character | void> {
        const character = this.prisma.character.findUnique({
            where: {
                id: Number(id)
            }
        })

        if(!character) new NotFoundException(`Character with the id ${id} was not found!`);
        if(character) character;
    }

    async addNewCharacter(createCharacterDto: CreateCharacterDto): Promise<Character> {
        const {name, defence, hitPoints, intelligence, strength} = createCharacterDto;
        return this.prisma.character.create({
            data: {
                name,
                defence,
                hitPoints,
                intelligence,
                strength,
                class: createCharacterDto.class,
                User: {
                    connect: { id: createCharacterDto.userId}
                }
            }
        })
    }

    async updateCharacter(id: string, updateCharacterDto: UpdateCharacterDto): Promise<Character> {
        const {name, defence, hitPoints, intelligence, strength} = updateCharacterDto;

        const character = this.prisma.character.findUnique({
            where: {
                id: Number(id)
            }
        })

        if(!character) new NotFoundException(`Character with the id ${id} was not found!`);

        return this.prisma.character.update({
            where: { id: Number(id)},
            data: {
                name,
                defence,
                hitPoints,
                intelligence,
                strength,
                class: updateCharacterDto.class,
            }
        })
    }

    async deleteCharacter(id: string): Promise<Character> {
        return this.prisma.character.delete({
            where: {
                id: Number(id)
            }
        })
    }

}
