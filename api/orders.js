const express = require('express');
const models = require("../models");
const _ = require("lodash");

const router = express.Router();

router.post("/orders", (req, res) => {
    const { total, date, contact, products } = req.body.order;
    
    models.Order.create({
        total: total,
        date,
        contact: contact
    })
        .then(order => {
            Promise.all(
                products.map(product => {
                    return order.addProduct(product.id, { through : { quantity: product.qt}})
                })
            )
        })
        .then(r => res.status(200).send('successful'))
        .catch(err => console.log(err))
})

module.exports = router;