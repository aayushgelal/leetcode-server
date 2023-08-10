const dotenv=require("dotenv");
const Pool= require("pg").Pool;

dotenv.config()
const user=process.env.postresql_user;
const password=process.env.postresql_password;
const database=process.env.postresql_database;
const host=process.env.postresql_host;

const pool=new Pool({
    
    user:user,
    password:password,
    host:host,
    port:5432,
    database:database,
    ssl:true
})
module.exports= pool;
