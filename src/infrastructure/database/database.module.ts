import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // Carga las variables de entorno
    MongooseModule.forRoot(
      'mongodb+srv://ivanyoe79:Aqzv4EovArlwJbCB@hidro-roots.akf9w.mongodb.net/?retryWrites=true&w=majority&appName=HIDRO-ROOTS',
    ), // Conecta a MongoDB
  ],
})
export class DatabaseModule {}
