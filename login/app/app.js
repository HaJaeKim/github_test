"use strict";

//모듈 
const express = require('express');
const bodyParser =  require('body-parser');
const app = express();
const dotenv = require('dotenv');


dotenv.config();


//라우팅
const home  = require("./src/routes/home");
const accessLogStream =  require("./src/config/log");

//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
//app.use(morgan("common", { stream: accessLogStream}));
//한글이나 공백처리 시 필요 l
app.use(bodyParser.urlencoded({ extended : true }));



app.use("/", home); // use -> 미들웨어 등록해주는 메소드

module.exports = app;


