const {STRING, INTEGER} = require("sequelize");
const { sequelize } = require("./database");

const ContactSuggestion = sequelize.define("Contact_Suggestion", {
    
    Email : {
        type : STRING,
        
    },
    Name : {
        type : STRING,
        
    },
    Message : {
        type : STRING,
        
    },
    id:{
        type:INTEGER,
        primaryKey:true,
        //autoIncrement:true
    }
}, { timestamps : false, freezeTableName : true });

module.exports = {ContactSuggestion};