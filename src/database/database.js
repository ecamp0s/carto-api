import mysql from "promise-mysql";
import config from "./../config.js";

const connection = mysql.createPool(`${config.connectionUri}?dateStrings=true`);

const getConnection = () => {
    return connection;
};

export default getConnection;