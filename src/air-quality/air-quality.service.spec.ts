import { Test, TestingModule } from '@nestjs/testing';
import { AirQualityService } from './air-quality.service';
import { AirQualityQueryParamDto } from './dtos/air-quality-query-param.dto';
import { AirQualityClientService } from './iqair-integration/air-quality-client.service';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './models/city.entity';
import { AirQuality, AirQualitySchema } from './models/air-quality.entity';
import { AirQualityController } from './air-quality.controller';
import { AirQualityCronService } from './jobs/air-quality-cron.service';

describe('AirQualityService', () => {
  let airQualityService: AirQualityService;
  let airQualityClientService: AirQualityClientService;
  const MONGO_URI = 'mongodb://127.0.0.1:27017/newsletter';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(MONGO_URI),
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
    }).compile();

    airQualityService = module.get<AirQualityService>(AirQualityService);
    airQualityClientService = module.get<AirQualityClientService>(
      AirQualityClientService,
    );
  });

  it('should be defined', () => {
    expect(airQualityService).toBeDefined();
  });

  describe('getAirQualityByLocation', () => {
    it('should return air quality data', async () => {
      const mockAirQualityData = {
        result: {
          ts: '2023-10-25T21:00:00.000Z',
          aqius: 76,
          mainus: 'p2',
          aqicn: 34,
          maincn: 'p2',
        },
      };
      jest
        .spyOn(airQualityClientService, 'getAirQualityByLocation')
        .mockResolvedValue({
          data: { current: { pollution: mockAirQualityData.result } },
        });

      const filters: AirQualityQueryParamDto = {
        latitude: 48.859425,
        longitude: 2.351666,
      };

      const result = await airQualityService.getAirQualityByLocation(filters);

      expect(result).toEqual(mockAirQualityData);
    });
  });
});
