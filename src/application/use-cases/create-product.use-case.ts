import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repositories/product.repository.impl';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(data: CreateProductDto) {
    return this.productRepository.create(data);
  }
}
