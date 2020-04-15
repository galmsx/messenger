import { Module } from '@nestjs/common';
import { KEY_VALUE_SERVICE } from '../key.value.store.constants';
import { KeyValueStoreService } from '../key.value.store.service';
import { keyValueProvider } from './key.value.store.provider';

@Module({
  providers: [
    {provide: KEY_VALUE_SERVICE, useClass: KeyValueStoreService},
    ...keyValueProvider
  ],
  exports: [KEY_VALUE_SERVICE]
})
export class KeyValueStoreModule {
}
