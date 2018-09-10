import express from 'express';
import models, { sequelize } from "../models";
import _ from "lodash";
const router = express.Router();

const allCategory = async () => {
   return models.Category.findAll({
    group: ['Category.id'],
    attributes: ['name','id',[sequelize.fn('count', sequelize.col('Products.CategoryId')), 'productCount']], 
    include:[{
        attributes: [],
        model: models.Product
    }],
   })
        .then(categories => categories)
}

const MinAndMaxPrice = () => {
    return models.Product.findAll({
        attributes: [
            [sequelize.fn('min', sequelize.col('price')), 'min'],
            [sequelize.fn('max', sequelize.col('price')), 'max']
        ]
    })
        .then(price => price[0])
}

const merge = (a,b) => {
    let props = [];
        a.forEach(item => {
            let propseValue = b.filter(p => p.PropsId === item.id);
            props.push({
                name: item.name,
                CategoryId: item.CategoryId,
                value: _.uniq(propseValue)
            })
        })
    return props;
}

const props = () => {
    return models.Props.findAll()
        .then(props => props)
}

const value = () => {
    return models.ProductProps.findAll({
        group: ['ProductProps.value','ProductProps.PropsId'],
        attributes: [
            'value',
            'PropsId',
            [sequelize.fn('count', sequelize.col('ProductId')), 'productCount']
        ]
    })
        .then(propsValue => propsValue)
}


router.get("/initialState",(req, res) => {
    Promise.all([
        allCategory(),
        MinAndMaxPrice(),
        props(),
        value()
    ])
    .then(([categories, price, props, value]) =>{
        let mergePropsAndValue = merge(props,value);
        res.send({
            categories,
            price,
            props: mergePropsAndValue
        })
    }).catch(err => res.send({Error : err}))
})

export default router;