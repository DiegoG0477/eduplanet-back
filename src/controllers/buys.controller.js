const PAYPAL_API = process.env.PAYPAL_API;
const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT;
const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET;
HOST = `http://localhost:${process.env.PORT}/v1/payment`;
const axios = require("axios");
const Buy = require("../models/buy.model")
const Details = require("../models/detailsBuy.model")
const db = require("../configs/db.config")


const createOrder = async (req, res) => {
    try {
        // console.log(PAYPAL_API + " " + PAYPAL_API_CLIENT + " " + PAYPAL_API_SECRET)
        // const item = {
        //     price:req.body.price,
        //     title:req.body.title,
        // };
        // console.log(item);

        const compra = new Buy({
            total:req.body.total
        })
        await compra.save()

        const idCompra = compra.id
        for(d of req.body.details){
            const details = new Details({
                idCompra,...d
            })
            await details.save()
        }

        // const order = {
        //     intent: "CAPTURE",
        //     purchase_units: [
        //         {
        //             amount: {
        //                 currency_code: "MXN",
        //                 value: item.price,
        //             },
        //             description: item.title,
        //         },
        //     ],
        //     application_context: {
        //         brand_name: "eduplanet.com",
        //         landing_page: "NO_PREFERENCE",
        //         user_action: "PAY_NOW",
        //         return_url: `${HOST}/capture-order`,
        //         cancel_url: `${HOST}/cancel-payment`,
        //     },
        // };

        // const response = await axios.post(
        //     `${PAYPAL_API}/v2/checkout/orders`,
        //     order,
        //     {
        //         auth: {
        //             username: PAYPAL_API_CLIENT,
        //             password: PAYPAL_API_SECRET,
        //         },
        //     }
        // );

        return res.status(200).json({
            message:"se creo la compra",
            compra
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json("Something goes wrong");
    }
};

const createWithTransaction = async (req, res) =>{
    const connection = await db.createConnection()
    try{
        await connection.beginTransaction()
        
        const compra = new Buy({
            total:req.body.total
        })
        const idCompra = await compra.saveWithTransaction(connection);

        for(d of req.body.details){
            const details = new Details({
                idCompra,...d
            })
            await details.saveWithTransaction(connection);
        }

        await connection.commit();

        return res.status(200).json({
            message:"se creo la compra"
        })

    }catch(error){
        await connection.rollback()
        res.status(500).json({
            message:"no se pudo crear la compra",
            error: error.message
        })
    }
}

const captureOrder = async (req, res) => {
    const { token } = req.query;

    try {
        const response = await axios.post(
            `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
            {},
            {
                auth: {
                    username: PAYPAL_API_CLIENT,
                    password: PAYPAL_API_SECRET,
                },
            }
        );

        console.log(response.data);

        res.redirect("/store");
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
};

const cancelPayment = (req, res) => res.redirect("/");

module.exports = {
    create: createWithTransaction,
    captureOrder,
    cancelPayment,
};
