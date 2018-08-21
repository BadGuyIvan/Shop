import express from 'express';
import models from "../models";

const router = express.Router();

router.get("/category",(req, res) => {
    models.Category.findAll()
        .then(response => res.send(response))
    }
)

router.get("/category/:category",(req, res) => {
    const category = req.params.category

    models.Category.find({where: {name: category}})
        .then(category => {
            console.log(category.dataValues.id)
            models.Product.findAll({where:{CategoryId: category.dataValues.id}, include: ['Images']})
                .then(response => res.send(response))
        })

    // models.Category.findAll({where: { name: category}, include: [{
    //     model:'Products',
    //     where: {name}
    // }]})
    //     .then(response => res.send(response))
    }
)

export default router;