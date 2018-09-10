import express from 'express';
import models from "../models";
import _ from "lodash";

const router = express.Router();

router.post("/orders", (req, res) => {
    const { total, date, contact, products } = req.body.order;

    let indexProduct = 0;
    models.OrderProducts.addHook('afterBulkCreate', product => {
        Promise.all(product.map(p => {
            p.quantity = products[indexProduct++].qt
            p.save()
        }))
    })

    models.Order.create({
        total: total,
        date,
        contact: contact
    })
        .then(order => {
            const productId = products.map(product => product.id);
            order.addProducts(productId)
        })
        .then(r => res.status(200).send('successful'))
        .catch(err => console.log(err))
})

export default router;