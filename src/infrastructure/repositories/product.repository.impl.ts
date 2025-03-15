import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../../domain/entities/product.entity';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(data: Partial<Product>): Promise<Product> {
    return new this.productModel(data).save();
  }

  async findAll() {
    return this.productModel.find().exec(); // Retorna todos los productos
  }

  async findPaginated(skip: number, limit: number) {
    return this.productModel.find().skip(skip).limit(limit).exec(); // Paginado
  }

  async count() {
    return this.productModel.countDocuments().exec();
  }

  async findById(id: string): Promise<Product | null> {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, data: Partial<Product>): Promise<Product | null> {
    return this.productModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<Product | null> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
