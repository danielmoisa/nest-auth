import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Character } from '@prisma/client';
import { CharactersService } from './characters.service';

@Controller('characters')
export class CharactersController {
    constructor(private readonly charactersService: CharactersService) {}

    @Get()
    getAllCharacters() {
        return this.charactersService.getAllCharacters();
    }

    @Get("/:id")
    getCharacterById(@Param("id") id: string) {
        return this.charactersService.getCharacterById(id);
    }

    @Post()
    createNewCharacter(@Body() characterData: Character) {
        return this.charactersService.addNewCharacter(characterData);
    }

    @Delete("/:id")
    deleteCharacter(@Param("id") id: string) {
        return this.charactersService.deleteCharacter(id);
    }
}
