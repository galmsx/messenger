import { config }   from 'dotenv';
config();
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {Transport} from "@nestjs/microservices";
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as c from 'crypto';
import { KEY_VALUE_SERVICE } from './services/KeyValueService/key.value.store.constants';
import { KeyValueStoreService } from './services/KeyValueService/key.value.store.service';
c.Certificate();

let app: NestExpressApplication = null;

async function bootstrapApp() {
app = await NestFactory.create<NestExpressApplication>(AppModule);
app.useStaticAssets(join(__dirname, '..', 'static'));
app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
        urls: [process.env.RABBIT_MQ_URL],
        queue: 'messages',
        queueOptions: {
            durable: false
        },
    },
});
}

async function startServer(){
    await app.startAllMicroservicesAsync();
   await app.listen(process.env.PORT);

  //  const serv:  KeyValueStoreService = app.get(KEY_VALUE_SERVICE);
  // await serv.saveString('key1', 111);
  //  console.log(await serv.getSting('key1'));
  //  await serv.delete('key1');
  // await serv.delete('key1');
  // console.log(await serv.getSting('key1'));

}

async function main() {
    await bootstrapApp();
    await startServer();
}

(async () => {
    try {
        await main();
    }catch (e) {
        console.error(e);
    }
})();
