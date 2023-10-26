import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AirQualityQueryParamDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: '48.856613' })
  readonly latitude: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: '2.352222' })
  readonly longitude: number;
}
