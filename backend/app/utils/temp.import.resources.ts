import { getLogger } from "./logger";
import { Schemas } from "../resources/schemas";
import { DB } from "../resources/ensure.schemas";
import { UserTypeEnum } from "../resources/userType.enum";
import { ProductCategoryEnum } from "../resources/productCategory.enum";

const logger = getLogger('temp.import.resources');
const path = require('path');
const fs = require('fs');

export async function populateDB() {
    // Process
    try {
        await createUsers();
        await createProducts();
        await createOrders();
        await createOrderProducts();

        logger.info("Populate db finished.");
    } catch (er) {
        logger.info(er)
    }
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class TipProdus {
    names: string[];
    description: string;
    category: ProductCategoryEnum;
}

async function createUsers() {
    let UserModel = DB.model(Schemas.User);
    await UserModel.deleteMany({})

    await new UserModel({
        username: "admin",
        password: "admin",
        firstname: "Gabi",
        lastname: "Gaben",
        email: "gaba@gmail.com",
        phone: "0722 222 234",
        type: UserTypeEnum.Administrator
    }).save();
    await new UserModel({
        username: "client",
        password: "client",
        firstname: "client",
        lastname: "client",
        email: "client@gmail.com",
        phone: "12345678",
    }).save();
}

async function createProducts() {
    let ProductModel = DB.model(Schemas.Product);
    await ProductModel.deleteMany({})

    const products: any = {
        Jeans: {
            names: ["nike", "adidas", "converse", "puma"],
            description: "100% cotton",
            category: ProductCategoryEnum.Jeans
        },
        Sweatshirts: {
            names: ["nike", "adidas", "converse", "puma"],
            description: "90% cotton",
            category: ProductCategoryEnum.Sweatshirts
        },
        Dresses: {
            names: ["nike", "adidas"],
            description: "70% cotton",
            category: ProductCategoryEnum.Dresses
        },
        Jackets: {
            names: ["nike", "adidas"],
            description: "50% cotton",
            category: ProductCategoryEnum.Jackets
        },
        Shoes: {
            names: ["nike", "adidas", "converse", "puma"],
            description: "100% cotton",
            category: ProductCategoryEnum.Shoes
        }
    };
    const directoryPath = path.join(__dirname, '../../Pictures');
    let pictures: string[] = await getPictures(directoryPath);

    for (let i = 1; i < 10; i++) {
        await Object.keys(products)
            .forEach(async tip => {
                let tipProdus: TipProdus = products[tip];
                let imagePath = path.join(directoryPath, pictures[Math.floor(Math.random() * pictures.length)]);
                for await (let name of tipProdus.names) {
                    await new ProductModel({
                        name: `${name}${i}`,
                        description: tipProdus.description,
                        price: getRandomInt(300, 500),
                        isAvailable: Math.random() <= 0.5,
                        category: tipProdus.category,
                        img: "data:image/jpeg;base64," + await readFile(imagePath)
                    }).save();
                }
            });
    }
}

async function getPictures(directoryPath: string): Promise<string[]> {
    //passsing directoryPath and callback function
    return await new Promise((resolve) => {
        fs.readdir(directoryPath, function (err: any, files: any) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            resolve(files);
        });
    })
}

async function createOrders() {
    let OrderModel = DB.model(Schemas.Order);
    await OrderModel.deleteMany({})
}

async function readFile(imagePath: string) {
    return await new Promise((resolve) => {
        var bitmap = fs.readFileSync(imagePath);
        resolve(new Buffer(bitmap).toString('base64'));
    })
}

async function createOrderProducts() {
    let OrderProductModel = DB.model(Schemas.OrderProduct);
    await OrderProductModel.deleteMany({})
}