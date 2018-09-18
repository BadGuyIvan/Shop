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
        _.assignIn(filter, {
            $and: [
                ...props.map(item => 
                    models.sequelize.literal(`EXISTS (${models.sequelize.dialect.QueryGenerator.selectQuery('ProductProps', {
                        where: {
                          value: item.value,
                          ProductId: {
                            $eq: models.sequelize.col('Product.id')
                          }
                        }
                      }, models.ProductProps).replace(';', '')})`) 
                )
            ]
        })
    }
    console.log('-----------------------------------------------------------------------')
    console.log(filter)
    console.log('-----------------------------------------------------------------------')
    models.Product.findAndCountAll({
        where: filter,              
        include: ['Images', {
            model: models.Props,
                attributes: ['id'],
                through: {
                    attributes: []
                }
        }],
        limit: sizePage,
        offset : sizePage * (page - 1),  
    })
    .then(response => {
        // models.Product.finAll({
        //     where:filter,
        //     attributes: [
        //         'value',
        //         'PropsId',
        //         [sequelize.fn('count', sequelize.col('Props.ProductProps.ProductId')), 'productCount']
        //     ],
        //     include: [{
        //         model: models.Props,
        //     }
        // ],
        // group: ['id','Props.ProductProps.PropsId'],
        // })
        //     .then(r => console.log(r))
        //     .catch(err => console.log(err))
        res.send({
            pages: Math.ceil(response.count / sizePage),
            products: response.rows
        });
    })
    .catch(err => res.send({Error: err}))
})

module.exports = router;