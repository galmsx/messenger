"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
let app = null;
async function bootstrapApp() {
    app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets(path_1.join(__dirname, '..', 'static'));
}
async function startServer() {
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
    }
    catch (e) {
        console.error(e);
    }
})();
//# sourceMappingURL=main.js.map