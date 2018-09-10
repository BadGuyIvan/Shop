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

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Router
app.use(Filter);
app.use(initialState);
app.use(Order)

app.use(
    webpackDevMiddleware(compiler, {
        historyApiFallback: true,
        writeToDisk: true
    })
)
app.use(webpackHotMiddleware(compiler));

app.get('/*', (req, res) => res.sendfile(__dirname+'/public/index.html'));


// models.sequelize.sync();
    app.listen(3000, err => {
        if(err) {
            return console.error(err);
        }
        console.log('Listening at http://localhost:3000');
    })