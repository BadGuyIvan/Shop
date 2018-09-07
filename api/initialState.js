import express from 'express';
import models, { sequelize } from "../models";
import _ from "lodash";
const router = express.Router();

const allCategory = async () => {
   return models.Category.findAll()
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
            let propseValue = b.filter(p => p.PropsId === item.id).map(item => item.value);
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
    return models.ProductProps.findAll()
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