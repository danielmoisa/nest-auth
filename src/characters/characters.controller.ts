import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dtos/create-character.dto';
import { UpdateCharacterDto } from './dtos/update-character.dto';

@ApiTags('characters')
@UseGuards(JwtGuard)
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

    @Put("/:id")
    updateCharacter(@Param("id") id: string, updateCharacterDto:UpdateCharacterDto) {
        return this.charactersService.updateCharacter(id, updateCharacterDto);
    }

    @Post()
    createNewCharacter(@Body() createCharacterDto: CreateCharacterDto) {
        return this.charactersService.addNewCharacter(createCharacterDto);
    }

    @Delete("/:id")
    deleteCharacter(@Param("id") id: string) {
        return this.charactersService.deleteCharacter(id);
    }
}
