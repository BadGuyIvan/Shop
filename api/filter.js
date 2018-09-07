import express from 'express';
import models from "../models";
import qs from 'qs';
import _ from "lodash";

const router = express.Router();

const parseQuery = (req, res, next) => {
    if(req.query.price){
        req.query.price = JSON.parse(req.query.price);
    }
    next();
}

router.get("/products", parseQuery, (req, res) => {
    const { categories, search, page, sizePage, price, props } = req.query;
    console.log(req.query);
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
            required: true,
            through: {
                where: { value : { $in: props} }
            }
        }]
    } else {
        filterProps = ['Images']
    }

    
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

export default router;