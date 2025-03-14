import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price_real: number;

  @Prop()
  price_offert?: number;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true })
  description_short: string;

  @Prop({ required: true })
  description_long: string;

  @Prop({ default: false })
  flagOffert: boolean;

  @Prop({ default: false })
  flagSend: boolean;

  @Prop({ type: [String], required: true }) // Agregamos el array de imágenes obligatorio
  images: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
