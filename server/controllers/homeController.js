const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const dbContext = require("../db/connect");
const { request } = require("express");

const login = async (req, res) => {
    const logonUser = req.body;
    if (logonUser.UserName == "" || logonUser.UserName == null)
        return res.json({ status: false, msg: "Please enter your user name" });
    if (logonUser.Password == "" || logonUser.Password == null)
        return res.json({ status: false, msg: "Please enter your password" });
    dbContext.query(`Select * from users where user_name='${logonUser.UserName}'`)
        .then(dbRes => {
            if (dbRes.rowCount == 1) {
                bcrypt.compare(req.body.Password,dbRes.rows[0].password)
                .then(result=>{
                    if(result){
                        var token = jwt.sign(
                            {
                                id: dbRes.rows[0].user_id,
                                user_name: dbRes.rows[0].user_name,
                                role: dbRes.rows[0].is_admin == true ? 'admin' : 'member',
                                expire: new Date(Date.now() + 3 * 3600000)
                            },
                            process.env.SECRET_KEY
                        )
                        res.cookie('APP_AUTH', token)
                        res.json({ status: true, msg: "Login success", val: token })
                    }else{
                        res.json({ status: false, msg: "Kullanıcı adı veya şifre hatalı, lütfen kontrol ediniz" })
                    }
                })
            } else {
                res.json({ status: false, msg: "Kullanıcı adı veya şifre hatalı, lütfen kontrol ediniz" })
            }
        })
        .catch(err => {
            res.json({ status: false, msg: err.mgs });
        })
}
const userRole = async (req, res) => {
    res.send(req.currentUser.role)
}

module.exports = {
    login,
    userRole
}