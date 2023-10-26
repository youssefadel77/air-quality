import { Controller, Get, Query } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';
import { AirQualityQueryParamDto } from './dtos/air-quality-query-param.dto';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { PollutionDTO } from './dtos/air-quality-by-location-res.dto';

@ApiTags('Air Quality APIs')
@Controller('air-quality')
export class AirQualityController {
  constructor(private readonly airQualityService: AirQualityService) {}

  @ApiOperation({ summary: 'the most polluted time' })
  @Get('')
  getAirQuality(
    @Query() filters: AirQualityQueryParamDto,
  ): Promise<{ result: PollutionDTO }> {
    return this.airQualityService.getAirQualityByLocation(filters);
  }

  @ApiOperation({ summary: 'the most polluted time' })
  @Get('most_polluted_time')
  mostPolluted() {
    return this.airQualityService.mostPollutedTime();
  }
}
