// air-quality-cron.service.ts
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AirQuality } from '../models/air-quality.entity';
import { City } from '../models/city.entity';
import { AirQualityClientService } from '../iqair-integration/air-quality-client.service';

@Injectable()
export class AirQualityCronService {
  constructor(
    @InjectModel('City') private readonly cityModel: Model<City>,
    @InjectModel('AirQuality')
    private readonly airQualityModel: Model<AirQuality>,
    private readonly airQualityClientService: AirQualityClientService,
  ) {}

  @Cron('*/1 * * * *')
  async checkAirQuality() {
    const cities = await this.cityModel.find().exec();
    for (const city of cities) {
      const result = await this.airQualityClientService.getAirQualityByLocation(
        {
          latitude: city.location.coordinates[1],
          longitude: city.location.coordinates[0],
        },
      );

      const airQuality = {
        cityId: city._id,
        pollution: result.data.current.pollution,
        weather: result.data.current.weather,
      };

      await this.airQualityModel.create(airQuality);
    }
  }
}
