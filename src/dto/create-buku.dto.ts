import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, } from "class-validator";
import { MaxLength, IsEnum, IsArray } from "class-validator";

enum types{
    Fiksi = 'Fiksi',
    NonFiksi = 'NonFiksi'
}

export class CreateBukuDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(types)
    readonly type: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly author: string;
}