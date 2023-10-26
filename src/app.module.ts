import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { AirQualityModule } from './air-quality/air-quality.module';
import { Model } from 'mongoose';
import { City } from './air-quality/models/city.entity';

const MONGO_URI = 'mongodb://root:examplePassword@mongodb:27017/newsletter';

@Module({
  imports: [MongooseModule.forRoot(MONGO_URI), AirQualityModule],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule {}
export class AppModule implements OnModuleInit {
  constructor(@InjectModel('City') private readonly cityModel: Model<City>) {}

  async onModuleInit() {
    const cityCount = await this.cityModel.countDocuments().exec();
    if (cityCount === 0) {
      const parisCity = new this.cityModel({
        city: 'Paris',
        state: 'Ile-de-France',
        country: 'France',
        location: {
          type: 'Point',
          coordinates: [2.351666, 48.859425],
        },
      });
      await parisCity.save();
    }
  }
}
