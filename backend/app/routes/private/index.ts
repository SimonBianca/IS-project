import Router = require('koa-router');
import {ResourceRouter} from "./resource.router";
import {ROUTES} from "../routes";
import {SpecificResourceRouter} from "./specific.url.resources";

export class PrivateRouter extends Router {
    constructor(args: any) {
        super(args);
        //Private routes goes here
        this.use(ROUTES.SPECIFIC_URL, new SpecificResourceRouter(null).routes());
        this.use(ROUTES.RESOURCE_URL, new ResourceRouter(null).routes());
    }
}
