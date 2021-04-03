import Router = require("koa-router");
import {ROUTES} from "../routes";
import {HTTP_STATUS} from "../../utils/http.utils";
import {DB} from "../../resources/ensure.schemas";
import {Schemas} from "../../resources/schemas";

export class ClientCreateRouter extends Router {
    constructor(args: any) {
        super(args);
        /*
         Create account on server.
         full Url: localhost:1234/client/create
         required: username, password, firstname, lastname, email, phone
         */
        this.post(ROUTES.CLIENT_CREATE_URL, async(ctx: any) => {
            let reqBody = ctx.request.fields;

            if (!reqBody.username || !reqBody.password || !reqBody.firstname || !reqBody.lastname || !reqBody.email || !reqBody.phone) {
                throw {status: HTTP_STATUS.BAD_REQUEST, message: "You must complete all the fields!"};
            }

            let errors = [];
            // check if user already exists
            let sameUser: any = await DB.model(Schemas.User).findOne({username: reqBody.username});
            let sameEmail: any = await DB.model(Schemas.User).findOne({email: reqBody.email});
            if (sameUser) {
                errors.push("The username already exists");
            }
            if (sameEmail) {
                errors.push("The email already exists");
            }
            
            if (errors.length > 0) {
                throw {status: HTTP_STATUS.BAD_REQUEST, message: errors};
            }
            
            let UserModel = DB.model(Schemas.User);
            let client = await new UserModel({
                username: reqBody.username,
                password: reqBody.password,
                firstname: reqBody.firstname,
                lastname: reqBody.lastname,
                email: reqBody.email,
                phone: reqBody.phone
            }).save();
            console.log(client)
            if (client) {
                ctx.status = HTTP_STATUS.OK;
                ctx.body = {message: "Create account: success"};
            } else {
                throw {status: HTTP_STATUS.BAD_REQUEST, message: "Try again later."};
            }
        });
    }
}
