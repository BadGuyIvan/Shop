import path from "path";
import webpack from 'webpack';
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import express from "express";
import logger from 'morgan'
import { json, urlencoded } from 'body-parser';

import config from "./webpack.devlopment.config";
import models from './models';

//Import Router
import Product from "./api/product";
import Category from "./api/category";
import Search from './api/search';

const app = express();
const compiler = webpack(config);


//Router
app.use(Product);
app.use(Category);
app.use(Search);

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use(
    webpackDevMiddleware(compiler, {
        historyApiFallback: true,
        writeToDisk: true
    })
)
app.use(webpackHotMiddleware(compiler));

app.get('/*', (req, res) => res.sendfile(__dirname+'/public/index.html'));

models.sequelize.sync().then(() => {
    app.listen(3000, err => {
        if(err) {
            return console.error(err);
        }
        console.log('Listening at http://localhost:3000');
    })
})