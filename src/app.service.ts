import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(place): string {
    return 'Hello World!' + place;
  }
}
