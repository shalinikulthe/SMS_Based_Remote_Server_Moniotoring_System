const {STRING} = require("sequelize");
const { sequelize } = require("./database");

const otpDetail = sequelize.define("otp", {
    id : {
        type : STRING,
        primaryKey : true,
        autoIncrement: true,
    },
    EmailID : {
        type : STRING,
        allowNull : false,
    },
    OTP : {
        type : STRING,
        allowNull : false,
    },
}, { timestamps : false , freezeTableName : true });

module.exports = {otpDetail};