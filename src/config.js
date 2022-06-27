import { config } from "dotenv";

config();

export default {
    connectionUri: process.env.CLEARDB_DATABASE_URL || `mysql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE}`,
};