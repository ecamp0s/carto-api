import { config } from "dotenv";

config();

export default {
    connectionUri: process.env.CLEARDB_DATABASE_URL || `mysql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE}`,
    host: process.env.HOST || "",
    database: process.env.DATABASE || "",
    user: process.env.USER || "",
    password: process.env.PASSWORD || "",
};