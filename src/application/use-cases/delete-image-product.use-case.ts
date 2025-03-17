import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repositories/product.repository.impl';

@Injectable()
export class DeleteImageProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(productId: string, imageUrl: string) {
    const product = await this.productRepository.findById(productId);
    if (!product) throw new NotFoundException('Producto no encontrado');

    // Filtramos las imágenes para eliminar la especificada
    const updatedImages = product.images.filter(
      (img: string) => img !== imageUrl,
    );

    if (updatedImages.length === product.images.length) {
      throw new NotFoundException('Imagen no encontrada en el producto');
    }

    // Guardamos el producto con la lista actualizada de imágenes
    await this.productRepository.update(productId, { images: updatedImages });

    return { message: 'Imagen eliminada correctamente' };
  }
}
