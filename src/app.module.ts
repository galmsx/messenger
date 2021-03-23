import { Module } from '@nestjs/common';
import { RestModule } from './services/RESTService/IoC/rest.module';

@Module({
  imports: [RestModule],
})
export class AppModule {}
