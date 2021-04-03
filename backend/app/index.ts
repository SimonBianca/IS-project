import * as Koa from "koa";
import { MainRouter } from "./routes";
import { getConfig } from "./config/server-config";
import { getLogger } from "./utils/logger";
import { connectToDatabase, MongooseDB } from "./utils/db.mongoose";
import { errorHandler } from "./utils/error.handler";
import { populateDB } from "./utils/temp.import.resources";
import { SocketIO } from "./utils/socket.service";

const logger = getLogger('Main');
const cors = require('@koa/cors');
const body: any = require('koa-better-body');

class MainServer {
    app: any;
    port: number;
    server: any;
    public io: any;
    public socket: any;

    constructor() {
        logger.info('Start creating KOA Server');

        this.app = new Koa();
        this.port = getConfig().port;

        this.configMiddlewares();
        this.configRoutes();
    }

    private configMiddlewares() {
        logger.info('Config Middlewares');

        this.logRequestTime();

        this.app.use(body({
            textLimit: '30mb',
            formLimit : '30mb',
            urlencodedLimit : '30mb',
            jsonLimit : '30mb',
            bufferLimit : '30mb',
        }));
        this.app.use(cors({
            origin: '*'
        }));
        this.app.use(errorHandler());
    }

    private logRequestTime() {
        this.app.use(async (ctx: any, next: any) => {
            const start: any = new Date();
            await next();
            logger.info(`${ctx.method} ${ctx.url} - ${+new Date() - start}ms`);
        });
    }

    private configRoutes() {
        let mainRouter = new MainRouter(null);
        this.app.use(mainRouter.routes())
            .use(mainRouter.allowedMethods());
    }

    async start() {
        this.server = require('http').Server(this.app.callback());
        SocketIO.connectWebSocket(this.server);
        await this.server.listen(this.port);
        logger.info(`Server started on port: ${this.port}`);

        await connectToDatabase(MongooseDB.connectiontURL);
        await populateDB();
    }
}

new MainServer().start();
