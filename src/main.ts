import { config }   from 'dotenv';
config();
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

let app: NestExpressApplication = null;

async function bootstrapApp() {
app = await NestFactory.create<NestExpressApplication>(AppModule);
app.useStaticAssets(join(__dirname, '..', 'static'));
}

async function startServer(){
    await app.startAllMicroservicesAsync();
   await app.listen(process.env.PORT);

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
