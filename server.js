// import path from "path";
const webpack = require('webpack');
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const express = require("express");
const logger = require('morgan')
const bodyParser = require('body-parser');
const config = require("./webpack.devlopment.config");
const _ = require('lodash');
const models = require('./models');
const sequelize = require('sequelize');
//Import Router
const initialState = require('./api/initialState');
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
app.use(initialState);
app.use(Order)

// app.use(
//     webpackDevMiddleware(compiler, {
//         historyApiFallback: true,
//         writeToDisk: true
//     })
// )
// app.use(webpackHotMiddleware(compiler));

app.get('/r', (req,res) => {
    models.Order.findAll({
        include: [{
            model: models.OrderProducts
        }]
    })
        .then(r => res.send(r))
        .catch(err => res.send({Error: err}))
})

if (isDevelopment) {
	app.use(webpackDevMiddleware(compiler, {
		historyApiFallback: true,
        writeToDisk: true
	}));

	app.use(webpackHotMiddleware(compiler));

    app.get('/*', (req, res) => res.sendfile(__dirname+'/public/index.html'));
} else {
    app.use(express.static(__dirname+'/public'));

	app.get('/*', (req, res) => res.sendfile(__dirname+'/public/index.html'));
}

// app.get('*', (req, res) => res.sendfile(__dirname+'/public/index.html'));


// models.sequelize.sync();

const port = process.env.PORT || 5000;

app.listen(port, err => {
    if(err) {
        return console.error(err);
    }
    console.log(`Listening at ${port}`);
})