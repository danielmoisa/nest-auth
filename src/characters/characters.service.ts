import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Character } from '@prisma/client'

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

    async addNewCharacter(character: Character): Promise<Character> {
        return this.prisma.character.create({
            data: {
                name: character.name,
                defence: character.defence,
                hitPoints: character.hitPoints,
                intelligence: character.intelligence,
                class: character.class,
                strength: character.strength,
                // User: {
                //     connect: { id: character.userId}
                // }
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
