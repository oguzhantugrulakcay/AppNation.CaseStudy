const dbContext = require("../db/connect")
const bcrypt = require("bcrypt");

function isEmptyOrSpaces(input){
    return !input || !input.trim();
}

const list = async (req, res) => {
    await dbContext.query('Select user_id,user_name,first_name,last_name,email,is_admin From Users', (err, dbRes) => {
        if (err != null) {
            res.json({ status: false, msg: err.message });
        } else {
            res.json({
                status: true,
                msg: "",
                val: dbRes.rows
            });
        }
    });
}

const detail = async (req, res) => {
    await dbContext.query(`Select user_id,user_name,first_name,last_name,email,is_admin From Users where user_id=${req.params.id}`, (err, dbRes) => {
        if (err != null) {
            console.log(`DB query error:${err.message}`)
            res.json({ status: false, msg: err.message });
        } else {
            if (dbRes.rowCount != 1) {
                res.json({
                    status: false,
                    msg: "Kullanıcı bulunamadı."
                })
            } else {
                 res.json(
                    {
                        status: true,
                        msg: "",
                        val: dbRes.rows[0]
                    });
            }

        }
    });
}

const create = async (req, res) => {
    const currentUser = req.currentUser
    if (currentUser.role != "admin") {
        res.json({
            status: false,
            msg: "Bu işlem için yetkiniz bulunmamaktadır!"
        }
        )
    }
    const justUser = req.body;
    if (isEmptyOrSpaces(justUser.UserName)) {
        res.json({
            status: false,
            msg: "Kullanıcı adı zorunludur, lütfen kontrol ediniz!"
        }
        )
    }
    if (isEmptyOrSpaces(justUser.Password)) {
         res.json({
            status: false,
            msg: "Şifre zorunludur, lütfen kontrol ediniz!"
        })
    }
    if (isEmptyOrSpaces(justUser.RePassword )) {
         res.json({
            status: false,
            msg: "Şifre ile tekrarı birbirine uymamaktadır, lütfen kontrol ediniz!"
        })
    }
    if (isEmptyOrSpaces(justUser.IsAdmin)) {
         res.json({
            status: false,
            msg: "Role zorunludur, lütfen kontrol ediniz!"
        })
    }
    if (isEmptyOrSpaces(justUser.FirstName)) {
         res.json({
            status: false,
            msg: "Ad zorunludur, lütfen kontrol ediniz!"
        })
    }
    if (isEmptyOrSpaces(justUser.LastName)) {
         res.json({
            status: false,
            msg: "Soyadı zorunludur, lütfen kontrol ediniz!"
        })
    }
    const hashPassword = await bcrypt.hash(justUser.Password, 10);
    const insertQuery = `
    INSERT INTO users (user_name, password, is_admin,first_name,last_name,email)
    VALUES ($1, $2, $3,$4,$5,$6)
    ING *;
`;
    const values = [justUser.UserName, hashPassword, justUser.IsAdmin, justUser.FirstName, justUser.LastName, justUser.Emai??''];
    dbContext.query(insertQuery, values)
        .then(dbRes => {
            res.json({
                status: true,
                msg: "Kullanıcı oluşturuldu",
                val: dbRes.rows[0].user_id
            });
        })
        .catch(err => {
            var msg = err.mgs
            if (err.code == 23505) {
                msg = "Kullanıcı adı sistemde mevcut, lütfen başka bir kullanıcı adı giriniz!"
            }
            res.json({
                status: false,
                msg: msg
            });
        });

}

const update = async (req, res) => {
    const id = req.params.id
    const currentUser = req.currentUser
    const updateData = req.body;
    if (currentUser.role != "admin") {
         res.json({
            status: false,
            msg: "Bu işlem için yetkiniz bulunmamaktadır"
        })
    }
    if (isEmptyOrSpaces(updateData.UserName)) {
         res.json({
            status: false,
            msg: "Kullanıcı adı zorunludur, lütfen kontrol ediniz!"
        }
        )
    }
    if (isEmptyOrSpaces(updateData.FirstName)) {
         res.json({
            status: false,
            msg: "Ad zorunludur, lütfen kontrol ediniz!"
        })
    }
    if (isEmptyOrSpaces(updateData.LastName)) {
         res.json({
            status: false,
            msg: "Soyadı zorunludur, lütfen kontrol ediniz!"
        })
    }
    const findUserQuery = `Select * from users where user_id=${id}`
    dbContext.query(findUserQuery)
        .then(dbRes => {
            if (dbRes.rowCount != 1) {
                 res.json({
                    status: false,
                    msg: "Kullanıcı bulunamadı!"
                });
            }
        })
        .catch(err => {
             res.json({
                status: false,
                msg: err.message
            });
        });
    const updateQuery = "Update users set user_name=$1,first_name=$2,last_name=$3,email=$4 where user_id=$5"
    const values = [updateData.UserName, updateData.FirstName, updateData.LastName, updateData.Email, id]
    dbContext.query(updateQuery, values)
        .then(dbRes => {
             res.json({
                status: true,
                msg: "Kullanıcı güncellendi"
            })
        })
        .catch(err => {
             res.json({
                status: false,
                msg: err.message
            })
        })
}

const remove = async (req, res) => {
    const id = req.params.id
    const currentUser = req.currentUser
    if (currentUser.role != "admin") {
         res.json({
            status: false,
            msg: "Bu işlem için yetkiniz bulunmamaktadır"
        })
    }
    dbContext.query(`Select * from users where user_id=${id}`)
        .then((userRes) => {
            if(userRes.rowCount!=1){
                 res.json({
                    status:false,
                    msg:"Kullanıcı bulunamadı!"
                })
            }
            dbContext.query(`Delete from users where user_id=${id}`)
                .then(() => {
                     res.json({
                        status: true,
                        msg: "Kullanıcı silindi"
                    })
                })
        })
        .catch(err => {
             res.json({
                status: false,
                msg: err.msg
            })
        });
}

module.exports = {
    list,
    detail,
    create,
    update,
    remove
}