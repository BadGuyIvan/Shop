import path from "path";
import webpack from 'webpack';
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import express from "express";
import logger from 'morgan'
import bodyParser from 'body-parser';
import config from "./webpack.devlopment.config";
import _ from 'lodash';
import models from './models';
import sequelize from 'sequelize';
//Import Router
import initialState from './api/initialState';
import Filter from "./api/filter";
import Order from "./api/orders";
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

    app.get('*', (req, res) => res.sendfile(__dirname+'/public/index.html'));
} else {
    app.use(express.static(__dirname+'/public'));

	app.get('*', (req, res) => res.sendfile(__dirname+'/public/index.html'));
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