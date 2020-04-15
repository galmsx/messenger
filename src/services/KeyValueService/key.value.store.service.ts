import { Inject, Injectable } from '@nestjs/common';
import { REDIS } from './key.value.store.constants';
import { RedisClient } from 'redis';


@Injectable()
export class KeyValueStoreService {

  constructor(@Inject(REDIS) private readonly redisClient: RedisClient) {
  }

  public async saveString(key: any, value: any): Promise<void> {
    return new Promise((res, rej) => {
      this.redisClient.set(key, value, e => {
        if (e) rej();
        else res();
      });
    });
  }

  public async getSting(key: string): Promise<string> {
    return new Promise((res) => {
      this.redisClient.get(key, (e, v) => {
        if (e) console.log(e);
         res(v);
      });
    });
  }

  public async delete(key: string): Promise<void> {
    return new Promise((res, rej) => {
      this.redisClient.del(key, e => {
        if (e) rej(e);
        else res();
      });
    });
  }
}
