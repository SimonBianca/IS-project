import Router = require("koa-router");
import { HTTP_STATUS } from "../../utils/http.utils";
import { DB } from "../../resources/ensure.schemas";
import { Schemas } from "../../resources/schemas";
import { SocketIO } from "../../utils/socket.service";
import { authJwt } from "../../utils/authenticate";

export class SpecificResourceRouter extends Router {
    constructor(args?: any) {
        super(args);

        /*
         Get all orders for user with userId
         method: get
         full Url: localhost:1234/ResourceName/id
         ex: localhost:1234/User/584bda4a3530553ef4d20b5a
         */
        this.get('/Order/:userId', async (ctx: any) => {
            ctx.status = HTTP_STATUS.OK;
            ctx.body = await DB.model(Schemas.Order).findOne({ userId: ctx.params.userId });
        });

        /*
        Get all products for a specific category
        method: get
        full Url: localhost:3000/Specific/Product/Category
        ex: localhost:3000/Specific/Product/Jeans
        */
        this.get('/Product/:category', async (ctx: any) => {
            ctx.status = HTTP_STATUS.OK;
            ctx.body = await DB.model(Schemas.Product).find({ category: ctx.params.category });
        });

        /*
        Create a new order with a product list
        method: post
        full Url: localhost:3000/Specific/Order/create
        ex: localhost:3000/Specific/Order/create
        body: {userId: "1231923012", productIdsQuantities: {"1213123019231": 1,"123123123123": 2,"`2239298923932": 4}}
        */
        this.post('/Order/create', async (ctx: any) => {
            const request = ctx.request;

            let OrderModel = DB.model(Schemas.Order);
            let ProductModel = DB.model(Schemas.Product);
            let OrderProductModel = DB.model(Schemas.OrderProduct);

            // calculate total price
            let totalPrice = 0;
            let productIdsQuantities = request.fields.productIdsQuantities;

            let ids = Object.keys(productIdsQuantities);
            for await (const id of ids) { 
                const quantity = productIdsQuantities[id];
                const product = await ProductModel.findOne({ _id: id });
                totalPrice += product.price * quantity;
            }

            // create order
            let order = await new OrderModel({
                total: totalPrice,
                userId: request.fields.userId
            }).save();

            // create ordered product entities
            for await (const id of ids) { 
                const quantity = productIdsQuantities[id];
                await new OrderProductModel({
                    orderId: order._id,
                    productId: id,
                    quantity: quantity
                }).save();
            }

            ctx.body = order;
            ctx.status = HTTP_STATUS.CREATED;
            SocketIO.emit('order event', order);
        });

        /*
         Update order
         method: put
         full Url: localhost:3000/specifiic/Order
         ex: localhost:3000/specifiic/Order/584bda4a3530553ef4d20b5a
         */
        this.put('/Order/:id', async (ctx: any) => {
            let request = ctx.request;

            let OrderModel = DB.model(Schemas.Order);
            let order = await OrderModel.findOneAndUpdate({ _id: ctx.params.id }, request.fields, { new: true });

            ctx.status = HTTP_STATUS.OK;
            ctx.body = order;
            SocketIO.emit('order event', order);
        });

        /*
         Get all user orders
         method: get
         full Url: localhost:3000/Specific/UserOrder/userId
         ex: localhost:3000/Specific/UserOrder/891276543567890
         */
        this.get('/UserOrder/:userId', async (ctx: any) => {
            let user: any = await DB.model(Schemas.User).findOne({ _id: ctx.params.userId });
            let orders: any[] = await DB.model(Schemas.Order).find({ userId: ctx.params.userId });

            let viewOrders: any[] = [];
            for await (const order of orders) {
                const products: any[] = [];

                const orderProducts = await DB.model(Schemas.OrderProduct).find({ orderId: order._id });
                for await (const orderProduct of orderProducts) { 
                    const product = await DB.model(Schemas.Product).findOne({ _id: orderProduct.productId });
                    products.push(Object.assign({ quantity: orderProduct.quantity }, product._doc));
                }

                const viewOrder = {
                    _id: order._id,
                    products: products,
                    status: order.status,
                    total: order.total,
                    username: user.username
                };
                viewOrders.push(viewOrder);
            }

            ctx.body = viewOrders;
            ctx.status = HTTP_STATUS.OK;
        });

        /*
        Get all orders
        method: get
        full Url: localhost:3000/Specific/AllOrders
        ex: localhost:3000/Specific/AllOrders
        */
        this.get('/AllOrders', async (ctx: any) => {
            let orders: any[] = await DB.model(Schemas.Order).find({});

            let viewOrders: any[] = [];
            for await (const order of orders) {
                let products: any[] = [];

                let orderProducts = await DB.model(Schemas.OrderProduct).find({ orderId: order._id });
                for await (const orderProduct of orderProducts) { 
                    const product = await DB.model(Schemas.Product).findOne({ _id: orderProduct.productId });
                    products.push(Object.assign({ quantity: orderProduct.quantity }, product._doc));
                }

                let user: any = await DB.model(Schemas.User).findOne({ _id: order.userId });
                let viewOrder = {
                    _id: order._id,
                    products: products,
                    status: order.status,
                    total: order.total,
                    username: user.username
                };
                viewOrders.push(viewOrder);
            }

            ctx.body = viewOrders;
            ctx.status = HTTP_STATUS.OK;
        });
    }
}
