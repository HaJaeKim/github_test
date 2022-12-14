'use strict'

const UserStorage = require("./UserStorage");

class User {
    constructor(body){
        this.body =  body;
    }

    async login(){
        const client = this.body;
        try { 
            const { id, pw} = await UserStorage.getUserInfo(client.id);
        //console.log(await UserStorage.getUserInfo(client.id));
        
        if(id){
            if(id === client.id && pw === client.pw){
                return { sucess: true };
            }
            return { sucess: false, msg: "비밀번호가 틀렸습니다." };
        }
        return { sucess: false, msg: "존재하지 않는 아이디입니다." };
        
        } catch (err) {
            return { sucess : false, err };
        }
       
    }
    async register(){
        const client = this.body;
        try {
            const response = await UserStorage.save(client); 
            return response;
        } catch(err) {
            return { sucess: false, err };
        }
    }

}

module.exports =  User;