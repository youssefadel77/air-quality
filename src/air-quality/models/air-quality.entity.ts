import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

class Pollution {
  @Prop()
  ts: string;

  @Prop()
  aqius: number;

  @Prop()
  mainus: string;

  @Prop()
  aqicn: number;

  @Prop()
  maincn: string;
}

class Weather {
  @Prop()
  ts: string;

  @Prop()
  tp: number;

  @Prop()
  pr: number;

  @Prop()
  hu: number;

  @Prop()
  ws: number;

  @Prop()
  wd: number;

  @Prop()
  ic: string;
}

@Schema({
  timestamps: true,
})
export class AirQuality extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'City', required: true })
  cityId: MongooseSchema.Types.ObjectId;

  @Prop(Pollution)
  pollution: Pollution;

  @Prop(Weather)
  weather: Weather;
}

export const AirQualitySchema = SchemaFactory.createForClass(AirQuality);
