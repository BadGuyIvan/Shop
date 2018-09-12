const express = require('express');
const models = require("../models");
const _ =  require("lodash");

const router = express.Router();

const parseQuery = (req, res, next) => {
    if(req.query.price){
        req.query.price = JSON.parse(req.query.price);
    }
    if(req.query.props) {
        req.query.props = JSON.parse(req.query.props);
    }
    next();
}

router.get("/products", parseQuery, (req, res) => {
    const { categories, search, page, sizePage, price, props } = req.query;
    console.log(req.query);
    // console.log(props.prop);
    // console.log(props.propsValue);
    // const valueProps = props.propsValue.map(item => item.value)
    // console.log(`Value : ${valueProps}`)
    let filter = {};
    let filterProps = [];
    if(price){
        if(price.min){
            _.merge(filter, {price: {$gte: price.min}})
        }
        if(price.max){
            _.merge(filter, {price: {$lte: price.max}})
        }
    }

    if(categories){
        _.assignIn(filter, { CategoryId: { $in: categories }})
    }

    if(search){
        _.assignIn(filter, { 
            $or: [
                {
                    name: {
                        $ilike: `%${search}%`
                    }
                },{
                    description: {
                        $ilike: `%${search}%`
                    } 
                }
            ]
        })
    }

    if(props){
        filterProps = ['Images',{
            model: models.Props,
            where: {
                id: { $in : props.prop}
                    
            },
            required: true,
            through: {
                where: { value : { $in: props.propsValue} }
            }
        }]
    } else {
        filterProps = ['Images']
    }

    console.log(filter)
    models.Product.findAndCountAll({
        where: filter,              
        include:filterProps,
        limit: sizePage,
        offset : sizePage * (page - 1),  
    })
    .then(response => {
        res.send({
            pages: Math.ceil(response.count / sizePage),
            products: response.rows
        });
    })
    .catch(err => res.send({Error: err}))
})

module.exports = router;