import { Injectable } from '@nestjs/common';
import { AirQualityQueryParamDto } from './dtos/air-quality-query-param.dto';
import { PollutionDTO } from './dtos/air-quality-by-location-res.dto';
import { AirQualityClientService } from './iqair-integration/air-quality-client.service';
import { Model } from 'mongoose';
import { AirQuality } from './models/air-quality.entity';
import { InjectModel } from '@nestjs/mongoose';
import { City } from './models/city.entity';

@Injectable()
export class AirQualityService {
  constructor(
    @InjectModel('City') private readonly cityModel: Model<City>,
    @InjectModel('AirQuality')
    private readonly airQualityModel: Model<AirQuality>,
    private readonly airQualityClientService: AirQualityClientService,
  ) {}

  async getAirQualityByLocation(
    filters: AirQualityQueryParamDto,
  ): Promise<{ result: PollutionDTO }> {
    const res: any =
      await this.airQualityClientService.getAirQualityByLocation(filters);
    return { result: res.data.current.pollution };
  }

  async mostPollutedTime() {
    return await this.airQualityModel
      .find()
      .populate('cityId')
      .sort({ aqius: -1, ts: -1 })
      .limit(1)
      .exec();
  }
}
