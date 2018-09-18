const path = require("path");
const webpack = require('webpack');
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const express = require("express");
const logger = require('morgan')
const bodyParser = require('body-parser');
const config = require("./webpack.devlopment.config");
const _ = require('lodash');
const models = require('./models');
const sequelize = require('sequelize')
// const sequelize = require('sequelize');
//Import Router
const initialFilter = require('./api/initialFilter');
const Filter = require("./api/filter");
const Order = require("./api/orders");
const app = express();
const compiler = webpack(config);
const isDevelopment = process.env.NODE_ENV !== "production";

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Router
app.use(Filter);
app.use(initialFilter);
app.use(Order)

// const sequelize = new Sequelize
if (isDevelopment) {
	app.use(webpackDevMiddleware(compiler, {
		historyApiFallback: true,
        writeToDisk: true
    }));

	app.use(webpackHotMiddleware(compiler));
    // models.sequelize.sync();

    app.get('/p', (req,res) => {
        // models.sequelize.query(`SELECT * FROM "Products" AS "Product"
        // WHERE (EXISTS (SELECT * FROM "ProductProps"
        // WHERE value = '8.1' AND "ProductId" = "Product"."id"))
        // AND EXISTS (SELECT 1 FROM "ProductProps" 
        // WHERE value = '16MP + 5MP dual camera' AND "ProductId" = "Product"."id")`).then(myTableRows => {
        //     res.send(myTableRows)
        //   })
        
        models.Product.findAll({
            where: {
              $and: [
                models.sequelize.literal(`EXISTS (${models.sequelize.dialect.QueryGenerator.selectQuery('ProductProps', {
                  where: {
                    value: '8.1',
                    ProductId: {
                      $eq: models.sequelize.col('Product.id')
                    }
                  }
                }, models.ProductProps).replace(';', '')})`),
                // models.sequelize.literal(`EXISTS (${models.sequelize.dialect.QueryGenerator.selectQuery('ProductProps', {
                //   where: {
                //     value: '16MP + 5MP dual camera',
                //     ProductId: {
                //       $eq: models.sequelize.col('Product.id')
                //     }  
                //   }
                // }, models.ProductProps).replace(';', '')})`)
              ]
            },
            attributes: ['name'],
            include: [{
                model: models.Props,
                attributes: ['id'],
                through: {
                    attributes: []
                }
            }]
          })
            .then(r => res.send(
                r
            ))
            .catch(err => res.send({Error: err}))
    })

app.get('/gg', (req,res) => {
    models.Product.findAll({
        include: ["Props"]
    })
        .then(r => res.send(r))
})

    app.get('/*', (req, res) => res.sendfile(__dirname+'/public/index.html'));
} else {
    app.use(express.static(path.join(__dirname,'/public')));
    
	app.get('/*', (req, res) => res.sendfile(__dirname+'/public/index.html'));
}
const port = process.env.PORT || 58355;

// models.sequelize.sync()
//     .then(() => console.log('Nice! Database looks fine'))
//     .catch(err => console.log(err))

app.listen(port, err => {
    if(err) {
        return console.error(err);
    }
    console.log(`Listening at ${port}`);
})


