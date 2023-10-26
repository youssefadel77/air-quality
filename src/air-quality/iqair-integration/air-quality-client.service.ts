import { Injectable } from '@nestjs/common';
import { AirQualityQueryParamDto } from '../dtos/air-quality-query-param.dto';
import { configEnum } from '../enums/config.enum';

const { key, baseUrl } = configEnum;
import * as axios from 'axios';

@Injectable()
export class AirQualityClientService {
  constructor() {}

  async getAirQualityByLocation(location: AirQualityQueryParamDto) {
    try {
      const result = await axios.default.get(`${baseUrl}`, {
        headers: {},
        params: { lat: location.latitude, long: location.longitude, key },
      });
      return result.data;
    } catch (e) {
      return e;
    }
  }
}
