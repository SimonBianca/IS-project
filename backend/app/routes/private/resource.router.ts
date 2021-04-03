import Router = require("koa-router");
import { HTTP_STATUS } from "../../utils/http.utils";
import { DB } from "../../resources/ensure.schemas";

/*
    Generic Router for crud operations on resources.
 */
export class ResourceRouter extends Router {
    constructor(args?: any) {
        super(args);
        /*
         Get a specific resource (by id)
         method: get
         full Url: localhost:3000/resource/ResourceName/id
         ex: localhost:3000/resource/Product/584bda4a3530553ef4d20b5a
         */
        this.get('/:resourceType/:id', async (ctx: any) => {
            ctx.status = HTTP_STATUS.OK;
            ctx.body = await DB.model(ctx.params.resourceType).findOne({ _id: ctx.params.id });
        });

        /*
         Get all resources for a specific type
         method: get
         full Url: localhost:1234/ResourceName
         ex: localhost:3000/resource/Product
         */
        this.get('/:resourceType', async (ctx: any) => {
            ctx.status = HTTP_STATUS.OK;
            ctx.body = await DB.model(ctx.params.resourceType).find({});
        });
        /*
         Create a resource on server base on request`s body
         method: post
         full Url: localhost:3000/resource/ResourceName
         ex: localhost:3000/resource/Role
         */
        this.post('/:resourceType', async (ctx: any) => {
            let Model = DB.model(ctx.params.resourceType);
            let request = ctx.request;
            ctx.status = HTTP_STATUS.CREATED;
            ctx.body = await new Model(request.fields).save();
        });
        /*
       Get a specific resource (by ids)
       method: get
       full Url: localhost:3000/resource/ResourceName/ids
       ex: localhost:3000/resource/Order/ids
       body: {ids: [584bda4a3530553ef4d20b5a,584bda4a3530553ef4d20b5a,584bda4a3530553ef4d20b5a]}
       */
        this.post('/:resourceType/ids', async (ctx: any) => {
            let request = ctx.request;
            ctx.status = HTTP_STATUS.OK;
            ctx.body = await DB.model(ctx.params.resourceType).where('_id').in(request.fields.ids).exec();
        });

        /*
         Update a resource on server base on request`s body
         method: put
         full Url: localhost:3000/resource/ResourceName
         ex: localhost:3000/resource/User/584bda4a3530553ef4d20b5a
         */
        this.put('/:resourceType/:id', async (ctx: any) => {
            let request = ctx.request;
            ctx.status = HTTP_STATUS.OK;
            ctx.body = await DB.model(ctx.params.resourceType).findOneAndUpdate({ _id: ctx.params.id }, request.fields, { new: true });
            // ctx.status = httpStatus.CREATED; // TODO: set this if created
        });
        /*
         Delete a resource on server base on id provided in url.
         method: delete
         full Url: localhost:3000/resource/ResourceName/id
         ex: localhost:3000/resource/Organization/584bda4a3530553ef4d20b5a
         */
        this.delete('/:resourceType/:id', async (ctx: any) => {
            ctx.status = HTTP_STATUS.OK;// if 204 no content returned, body will be empty on client side...
            ctx.body = await DB.model(ctx.params.resourceType).findOneAndRemove({ _id: ctx.params.id });
        })
    }
}
