import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


enum types {
    Fiksi = 'Fiksi',
    NonFiksi = 'NonFiksi'
}

@Schema()
export class Buku {
    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    description: string

    @Prop({ required: true, enum:types })
    type: string
    enum: types

    @Prop({ required: true })
    author: string

}

export const BukuSchema = SchemaFactory.createForClass(Buku);