import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;
  
  @IsNumber()
  @IsNotEmpty()
  hitPoints: number;

  @IsNumber()
  @IsNotEmpty()
  defence: number;

  @IsNumber()
  @IsNotEmpty()
  strength: number;

  @IsNumber()
  @IsNotEmpty()
  intelligence: number;

  @IsString()
  @IsIn(['Mage', 'Knight', 'Cleric'])
  @IsNotEmpty()
  class: 'Mage' | 'Knight' | 'Cleric';

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}