import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBukuDto } from 'src/dto/create-buku.dto';
import { IBuku } from 'src/interface/buku.interface';
import { Model } from 'mongoose';
import { UpdateBukuDto } from 'src/dto/update-buku.dto';

@Injectable()
export class BukuService {
    constructor(@InjectModel('buku') private bukuModel: Model<IBuku>) { }

    async createBuku(createBukuDto: CreateBukuDto):
        Promise<IBuku> {
        const newBuku = await new this.bukuModel(createBukuDto);
        return newBuku.save();
    }

    async updateBuku(bukuId: string, updateBukuDto: UpdateBukuDto):
        Promise<IBuku> {
        const existingBuku = await this.bukuModel.findByIdAndUpdate(bukuId, updateBukuDto, {
            new: true
        });
        if (!existingBuku) {
            throw new NotFoundException('Buku #${bukuId} not found');
        }
        return existingBuku;
    }

    async getAllBuku(): Promise<IBuku[]> {
        const bukuData = await this.bukuModel.find();
        if (!bukuData || bukuData.length == 0) {
            throw new NotFoundException('Buku not found');
        }
        return bukuData;
    }

    async getBuku(bukuId: string): Promise<IBuku> {
        const existingBuku = await this.bukuModel.findById(bukuId).exec();
        if (!existingBuku) {
            throw new NotFoundException('Buku '+bukuId+' not found');
        }
        return existingBuku;
    }

    async deleteBuku(bukuId: string): Promise<IBuku> {
        const deleteBuku = await this.bukuModel.findByIdAndDelete(bukuId);
        if (!deleteBuku) {
            throw new NotFoundException('Buku #${bukuId} not found');
        }
        return deleteBuku;
    }
}
