import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreditsModule } from './credits/credits.module';
import { TitlesModule } from './titles/titles.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [CreditsModule, TitlesModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
