import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module'; // Importamos el módulo raíz

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Usamos AppModule

  // Habilitar CORS para permitir peticiones desde el frontend
  app.enableCors();

  // Habilitar validaciones globales en los DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Ignora propiedades no definidas en los DTOs
      forbidNonWhitelisted: true, // Rechaza datos extra no permitidos
      transform: true, // Convierte datos al tipo esperado
    }),
  );

  app.setGlobalPrefix('v1');
  // 🔹 Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Productos')
    .setDescription('Documentación de la API de productos')
    .setVersion('1.0')
    .addTag('Productos') // Opcional: etiquetas para agrupar endpoints
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/docs', app, document); // URL: http://localhost:4000/api/docs

  const PORT = process.env.PORT || 3001;
  await app.listen(PORT);

  console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
  console.log(`📄 Swagger disponible en: http://localhost:${PORT}/v1/docs`);
}

bootstrap();
