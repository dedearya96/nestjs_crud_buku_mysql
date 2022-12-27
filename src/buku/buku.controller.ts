import {
    Body, Controller, Delete, Get, HttpStatus, Param, Post, Put,
    Res
} from '@nestjs/common';
import { CreateBukuDto } from 'src/dto/create-buku.dto';
import { UpdateBukuDto } from 'src/dto/update-buku.dto';
import { BukuService } from './buku.service';

@Controller('buku')
export class BukuController {
    constructor(private readonly bukuService: BukuService) { }

    @Post()
    async createBuku(@Res() response, @Body() createBukuDto: CreateBukuDto) {
        try {
            const newBuku = await this.bukuService.createBuku(createBukuDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Buku has bean created successfully',
                newBuku,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error: Buku not created',
                error: 'Bad Request',
            });
        }
    }

    @Put('/:id')
    async updateBuku(@Res() response, @Param('id') bukuId: string, @Body() updateBukuDto: UpdateBukuDto) {
        try {
            const existingBuku = await this.bukuService.updateBuku(bukuId, updateBukuDto);
            return response.status(HttpStatus.OK).json({
                message: 'Buku has bean successfully updated',
                existingBuku
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get()
    async getBukus(@Res() response) {
        try {
            const bukuData = await this.bukuService.getAllBuku();
            return response.status(HttpStatus.OK).json({
                message: 'All buku data found successfully',
                bukuData,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    async getBuku(@Res() response, @Param('id') bukuId: string) {
        try {
            const existingBuku = await this.bukuService.getBuku(bukuId);
            return response.status(HttpStatus.OK).json({
                message: 'Buku found successfully', existingBuku
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('/:id')
    async deleteBuku(@Res() response, @Param('id') bukuId: string) {
        try {
            const existingBuku = await this.bukuService.deleteBuku(bukuId);
            return response.status(HttpStatus.OK).json({
                message: 'Buku deleted successfully',
                existingBuku
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}
