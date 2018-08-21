import express from 'express';
import models from "../models";

const router = express.Router();

router.get("/products",(req, res) => 
    models.Product.findAll({include: ['Images']})
        .then(response => res.send(response))
)

export default router;