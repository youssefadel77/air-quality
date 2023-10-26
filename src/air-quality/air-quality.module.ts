import { Module } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';
import { AirQualityController } from './air-quality.controller';
import { HttpModule } from '@nestjs/axios';

import { ScheduleModule } from '@nestjs/schedule';
import { AirQualityClientService } from './iqair-integration/air-quality-client.service';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './models/city.entity';
import { AirQualityCronService } from './jobs/air-quality-cron.service';
import { AirQuality, AirQualitySchema } from './models/air-quality.entity';

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
    MongooseModule.forFeature([
      { name: AirQuality.name, schema: AirQualitySchema },
    ]),
  ],
  controllers: [AirQualityController],
  providers: [
    AirQualityService,
    AirQualityClientService,
    AirQualityCronService,
  ],
  exports: [MongooseModule, AirQualityService],
})
export class AirQualityModule {}
