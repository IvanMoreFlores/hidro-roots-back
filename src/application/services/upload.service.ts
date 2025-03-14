import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Express } from 'express'; // Importa Express para Multer

@Injectable()
export class UploadService {
  async uploadImages(images: Express.Multer.File[]): Promise<string[]> {
    if (!images || images.length === 0) {
      throw new Error('No se proporcionaron imágenes para subir.');
    }

    const uploadPromises = images.map(
      (image) =>
        new Promise<string>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'productos' },
            (error, result: UploadApiResponse) => {
              if (error) {
                console.error('Error en Cloudinary:', error);
                return reject(
                  new Error(error.message || 'Error subiendo imagen'),
                );
              }
              if (!result) {
                return reject(
                  new Error('La respuesta de Cloudinary es inválida'),
                );
              }
              resolve(result.secure_url);
            },
          );

          if (!image.buffer) {
            return reject(new Error('La imagen no tiene un buffer válido.'));
          }

          uploadStream.end(image.buffer); // Aquí validamos correctamente
        }),
    );

    return Promise.all(uploadPromises);
  }
}
