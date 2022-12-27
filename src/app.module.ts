import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BukuSchema } from './schema/buku_schema';
import { BukuService } from './buku/buku.service';
import { BukuController } from './buku/buku.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/perpus'),
    MongooseModule.forFeature([{
      name: 'buku', schema: BukuSchema,
    }]),
  
  ],
  controllers: [BukuController],
  providers: [BukuService],
})
export class AppModule { }
