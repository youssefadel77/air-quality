import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

class LocationDTO {
  @ApiProperty()
  type: string;

  @ApiProperty()
  coordinates: [number, number];
}

export class PollutionDTO {
  @ApiProperty()
  ts: string;

  @ApiProperty()
  aqius: number;

  @ApiProperty()
  mainus: string;

  @ApiProperty()
  aqicn: number;

  @ApiProperty()
  maincn: string;
}

class WeatherDTO {
  @ApiProperty()
  ts: string;

  @IsNumber()
  @ApiProperty()
  tp: number;

  @IsNumber()
  @ApiProperty()
  pr: number;

  @IsNumber()
  @ApiProperty()
  hu: number;

  @IsNumber()
  @ApiProperty()
  ws: number;

  @IsNumber()
  @ApiProperty()
  wd: number;

  @ApiProperty()
  ic: string;
}

export class AirQualityDto {
  @IsString()
  @ApiProperty()
  city: string;

  @IsString()
  @ApiProperty()
  state: string;

  @IsString()
  @ApiProperty()
  country: string;

  @ApiProperty({ type: LocationDTO })
  location: LocationDTO;

  @ApiProperty({ type: PollutionDTO })
  pollution: PollutionDTO;

  @ApiProperty({ type: WeatherDTO })
  weather: WeatherDTO;
}
