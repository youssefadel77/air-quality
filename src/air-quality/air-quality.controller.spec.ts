import { Test, TestingModule } from '@nestjs/testing';
import { AirQualityController } from './air-quality.controller';
import { AirQualityService } from './air-quality.service';
import { AirQualityQueryParamDto } from './dtos/air-quality-query-param.dto';
import { PollutionDTO } from './dtos/air-quality-by-location-res.dto';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './models/city.entity';
import { AirQuality, AirQualitySchema } from './models/air-quality.entity';
import { AirQualityCronService } from './jobs/air-quality-cron.service';
import { AirQualityClientService } from './iqair-integration/air-quality-client.service';

describe('AirQualityController', () => {
  let airQualityController: AirQualityController;
  let airQualityService: AirQualityService;
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

    airQualityController =
      module.get<AirQualityController>(AirQualityController);
    airQualityService = module.get<AirQualityService>(AirQualityService);
  });

  it('should be defined', () => {
    expect(airQualityController).toBeDefined();
  });

  describe('getAirQuality', () => {
    it('should create a new url check', async () => {
      const filters: AirQualityQueryParamDto = {
        latitude: 48.856613,
        longitude: 2.352222,
      };

      const expectedResult: { result: PollutionDTO } = {
        result: {
          ts: '2023-10-25T19:00:00.000Z',
          aqius: 20,
          mainus: 'o3',
          aqicn: 15,
          maincn: 'o3',
        },
      };

      jest
        .spyOn(airQualityService, 'getAirQualityByLocation')
        .mockResolvedValue(expectedResult);

      const result = await airQualityController.getAirQuality(filters);

      expect(result).toBe(expectedResult);
    });
  });
});
