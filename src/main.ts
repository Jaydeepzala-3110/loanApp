import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './shared/services/database.service';

async function bootstrap() {
  if (!AppDataSource.isInitialized) {
    AppDataSource.initialize()
      .then(() => console.log('DB connected....'))
      .catch((err) => {
        console.log('Error while connecting to the database', err);
        throw err;
      });
  }

  // console.log('db is connected');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
