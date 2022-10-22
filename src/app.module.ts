import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreditsModule } from './credits/credits.module';
import { Credit } from './credits/entities/credit.entity';
import { Title } from './titles/entities/title.entity';
import { TitlesModule } from './titles/titles.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: 5432,
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: [Credit, Title],
        synchronize: true,
      }),
    }),
    CreditsModule,
    TitlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
