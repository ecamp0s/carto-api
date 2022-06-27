import mysql from "promise-mysql";
import config from "./../config.js";

const connection = mysql.createPool(`${config.connectionUri}?dateStrings=true`);
/* const connection = mysql.createConnection({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password,
    dateStrings: true
}); */

const getConnection = () => {
    return connection;
};

export default getConnection;