import express from 'express';
import models from "../models";
const router = express.Router();

router.get('/search/:search',(req, res) => {
    const search = req.params.search ;
    models.Product.findAll({
        where: {
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
            }, include: ['Images']
        })
    .then(response => res.send(response))
})

export default router;