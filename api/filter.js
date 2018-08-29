import express from 'express';
import models from "../models";
import qs from 'qs';
import _ from "lodash";

const router = express.Router();

const parseQuery = (req, res, next) => {
    req.query.price = JSON.parse(req.query.price);
    next();
}

router.get("/products", parseQuery, (req, res) => {
    const { categories, search, page, sizePage, price } = req.query;
    console.log(req.query);
    let filter = {}

    // if (price){
        if(price.min){
            _.assignIn(filter, {price: {$gte: price.min}})
        }
        if(price.max){
            _.assignIn(filter, {price: {$lte: price.max}})
        }
    // }

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
                    dscription: {
                        $ilike: `%${search}%`
                    } 
                }
            ]
        })
    }

    models.Product.findAndCountAll({
        where: filter,
        limit: sizePage,
        offset : sizePage * (page - 1),                
        include: ['Images']
    })
    .then(response => {
        res.send({
            pages: Math.ceil(response.count / sizePage),
            products: response.rows
        });
    })
})


    


//     models.Product.findAll(
//         {
//             where: filter,
//             limit: sizePage,
//             offset,
//             include: ['Images']
//         })
//         .then(response => res.send({
//             pages,
//             product: response
//         }))



//         if(category){
//             if(category === 'all'){
//                 models.Product.count({
//                     where : {
//                         'price':{
//                             $gte: price.min,
//                             $lte: price.max
//                         }
//                     }
//                 })
//                     .then(count => {
//                         let pages = Math.ceil(count / sizePage);
//                         let offset = sizePage * (page - 1); 
//                         models.Product.findAll(
//                             {
//                                 where: {
//                                     'price':{
//                                         $gte: price.min,
//                                         $lte: price.max
//                                     }
//                                 },
//                                 limit: sizePage,
//                                 offset,
//                                 include: ['Images']
//                             })
//                             .then(response => res.send({
//                                 pages,
//                                 product: response
//                             }))
//                     })
//             }else {
//                 models.Category.find(
//                     {
//                         where: {name: category}
//                     })
//                     .then(category => {
//                         models.Product.count({
//                             where:{
//                                 CategoryId: category.dataValues.id,
//                                 'price':{
//                                         $gte: price.min,
//                                         $lte: price.max
//                                 },
//                             }, 
//                         })
//                             .then(count => {
//                                 let pages = Math.ceil(count / sizePage);
//                                 let offset = sizePage * (page - 1);
//                                 models.Product.findAll(
//                                     {
//                                         limit: sizePage,
//                                         offset,
//                                         where:{
//                                             CategoryId: category.dataValues.id,
//                                             'price':{
//                                                 $gte: price.min,
//                                                 $lte: price.max
//                                             }
//                                         }, 
//                                         include: ['Images']
//                                     })
//                                     .then(response => res.send({
//                                         pages,
//                                         product: response
//                                     }))
//                             })
//                 })
//             }
//         } else if(search){
//             models.Product.count({
//                 where: {
//                     $or: [
//                             {
//                                 name: {
//                                     $ilike: `%${search}%`
//                                 }
//                             },{
//                                 dscription: {
//                                     $ilike: `%${search}%`
//                                 } 
//                             }
//                         ]
//                     }
//             })
//             .then(count => {
//                 let pages = Math.ceil(count / sizePage);
//                 let offset = sizePage * (page - 1);
//                 models.Product.findAll({
//                     limit: sizePage,
//                     offset,
//                     where: {
//                         $or: [
//                                 {
//                                     name: {
//                                         $ilike: `%${search}%`
//                                     }
//                                 },{
//                                     dscription: {
//                                         $ilike: `%${search}%`
//                                     } 
//                                 }
//                             ]
//                         }, include: ['Images']
//                     })
//                 .then(response => res.send({
//                     pages,
//                     product: response
//                 }))
//             })
//         } 
//     }
// )

export default router;