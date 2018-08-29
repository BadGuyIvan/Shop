import express from 'express';
import models, { sequelize } from "../models";
import Sequelize from "sequelize"; 
const router = express.Router();


router.get("/initialState",(req, res) => {
    models.Category.findAll()
        .then(category => {
            models.Product.findAll({
                attributes: [
                    [sequelize.fn('min', sequelize.col('price')), 'min'],
                    [sequelize.fn('max', sequelize.col('price')), 'max']
                ]
            })
            .then(price => res.send({
                category,
                price: price[0]
            }))   
        })
    }
)

export default router;