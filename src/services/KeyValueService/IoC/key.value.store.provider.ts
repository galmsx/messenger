import { REDIS } from '../key.value.store.constants';
import * as redis from 'redis';

export const keyValueProvider = [
  {
    provide: REDIS,
    useFactory: async () => {
      const rtg = require('url').parse(process.env.REDIS_URL);
      const client = redis.createClient(rtg.port, rtg.hostname);
      client.auth(rtg.auth.split(':')[1]);

      return client;
    },
  },
];
