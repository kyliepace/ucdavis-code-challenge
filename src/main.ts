import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3000;
  const config = new DocumentBuilder()
    .setTitle('UC Davis Code Challenge')
    .setDescription('by Kylie Pace')
    .setVersion('1.0')
    .addTag('netflix')
    .addTag('REST')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log(`UC Davis Code Challenge REST API now running on port ${PORT}`)
  await app.listen(PORT);
}
bootstrap();
