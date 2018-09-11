const express = require('express');
const models = require("../models");
const _ = require("lodash");

const router = express.Router();

router.post("/orders", (req, res) => {
    const { total, date, contact, products } = req.body.order;

    let indexProduct = 0;
    models.OrderProducts.addHook('afterBulkCreate', product => {
        console.log('------------------------------------------')
        // console.log(product);
        console.log('------------------------------------------')
        Promise.all(product.map(p => {
            p.quantity = products[indexProduct++].qt
            p.save()
        }))
            .then(r => console.log(`r ${r}`))
            .catch(err => console.log(err))
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

module.exports = router;