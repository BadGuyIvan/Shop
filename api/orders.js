const express = require('express');
const models = require("../models");
const _ = require("lodash");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/orders", (req, res) => {
    const { total, date, contact, products, trackCode } = req.body.order;

    // nodemailer.createTestAccount((err, account) => {
    //     // create reusable transporter object using the default SMTP transport
    //     let transporter = nodemailer.createTransport({
    //         host: 'localhost',
    //         port: 58355,
    //         secure: false, // true for 465, false for other ports
    //     });
    
    //     // setup email data with unicode symbols
    //     let mailOptions = {
    //         from: 'adadasdas@dsasda.com', // sender address
    //         to: 'badguy.ivan.i@gmail.com', // list of receivers
    //         subject: 'Hello ✔', // Subject line
    //         text: 'Hello world?', // plain text body
    //         html: '<b>Hello world?</b>' // html body
    //     };
    
    //     // send mail with defined transport object
    //     transporter.sendMail(mailOptions, (error, info) => {
    //         if (error) {
    //             return console.log(error);
    //         }
    //         console.log('Message sent: %s', info.messageId);
    //         // Preview only available when sending through an Ethereal account
    //         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
    //         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    //         // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    //     });
    // // });
    
    //     // if you don't want to use this transport object anymore, uncomment following line
    //     // smtpTransport.close(); // shut down the connection pool, no more messages
    // });

    models.Order.create({
        total: total,
        date,
        contact: contact,
        trackCode
    })
        .then(order => {
            Promise.all(
                products.map(product => {
                    return order.addProduct(product.id, { through : { quantity: product.qt}})
                })
            )
        })
        .then(r => res.status(200).send('successful'))
        .catch(err => console.log(err))
})

module.exports = router;