"use strict";


const Logger = require("../../config/Logger");
const User = require("../../models/user");
//const UserStorage = require("../../models/UserStorage");

const output = {

    home: (req, res) => {
        Logger.info(`GET / 200 "홈 화면으로 이동"`);
        res.render("home/index");
    },
    login:  (req,res) => {
        Logger.info(`GET /login 200 "로그인 화면으로 이동"`);
        res.render("home/login");
    },
    register:  (req,res) => {
        Logger.info(`GET /register 200 "회원가입 화면으로 이동"`);
        res.render("home/register");
    }
};


const process = {
    login: async(req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        if(response.err)
            Logger.error(`POST /login 200 Response: "success: ${response.sucess}, ${response.err}"`)
        else
        Logger.info(`POST /login 200 Response: "success: ${response.sucess}, msg: ${response.msg}"`);
        return res.json(response);
    },
    register: async(req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        if(response.err)
        Logger.error(`POST /register 200 Response: "success: ${response.sucess}, ${response.err}"`)
        else
        Logger.info(`POST /register 200 Response: "success: ${response.sucess}, msg: ${response.msg}"`);
        return res.json(response);
    },
};

module.exports = {
    output,
    process,
};

