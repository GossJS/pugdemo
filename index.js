import express from 'express';
import http from 'http';
import https from 'https';
import bodyParser from 'body-parser';
import m from 'mongoose';
import dot from 'dotenv';
import fs from 'fs';
import appSrc from './app.js';
import CORS from './CORS.js';
import UserModel from './models/User.js';
import UserController from './routes/UserController.js';

dot.config({ path: './.env' });
const { URL } = process.env;
const User = UserModel(m);
const app = appSrc(express, bodyParser, fs, CORS, User, UserController);

try {
    await m.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    http.Server(app).listen(80);
    const options = {
        key: fs.readFileSync( '/etc/letsencrypt/live/pugdemo.kodaktor.ru/privkey.pem'),
        cert: fs.readFileSync( '/etc/letsencrypt/live/pugdemo.kodaktor.ru/fullchain.pem')
    };
    https.Server(options, app).listen(443);
} catch(e) {
    console.log(e.codeName);
}
