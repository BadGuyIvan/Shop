const express = require('express');
const models = require("../models");
const _ =  require("lodash");

const router = express.Router();

const parseQuery = (req, res, next) => {
    if(req.query.price){
        req.query.price = JSON.parse(req.query.price);
    }
    if(req.query.props) {
        const props = JSON.parse(req.query.props);
        req.query.props = props;
    }
    next();
}

router.get("/products", parseQuery, (req, res) => {
    const { categories, search, page, sizePage, price, props } = req.query;
    let filter = {};
    let filterProps = [];
    console.log('###########################################################')
    console.log(props)
    console.log('###########################################################')

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
        // const propsFilter = props.map(item => {
        //     return {
        //         '$Props.ProductProps.PropsId$': item.PropsId,
        //         '$Props.ProductProps.value$': item.value,
        //     }
        // })
        //     _.extend(filter, {
        //         $or: propsFilter
        //     })
            filterProps = ['Images',{
                model: models.Props,
                where: {
                    id: props.map(item => item.PropsId)
                },
                through: {
                    required: true,
                    where: { 
                        $and: props.map(item => {
                            return ({
                                value: item.value
                            })
                        })
                    }
                }
            }]
            console.log(filterProps);
    }else {
        filterProps = ['Images']
    }
    console.log('-----------------------------------------------------------------------')
    console.log(filter)
    console.log('-----------------------------------------------------------------------')
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