import { getConnection } from "./../database/database";

const getTotalTurnover = async (req, res) => {
    try {
        const connection = await getConnection();

        let sql = "SELECT SUM(amount) as total FROM paystats";

        if (req.query.from && req.query.to) {
            const periodFrom = new Date(req.query.from).toJSON().slice(0, 10);
            const periodTo = new Date(req.query.to).toJSON().slice(0, 10);

            sql += " WHERE p_month >= '" + periodFrom + "' AND p_month <= '" + periodTo + "'";
        }

        const result = await connection.query(sql);

        const data = { total: 0 };

        if (result.length === 1) {
            data.total = result[0].total.toFixed(2);
        }

        res.json({ error: null, data: data });
    } catch(error) {
        res.status(500).send(error.message);
    }
}

const getTurnoverByGender = async (req, res) => {
    try {
        const connection = await getConnection();

        let sql = "SELECT paystats.p_age, paystats.p_gender, SUM(paystats.amount) as total FROM paystats";
        sql += " INNER JOIN postal_codes ON postal_codes.id = paystats.postal_code_id WHERE 1";

        if (req.query.from && req.query.to) {
            const periodFrom = new Date(req.query.from).toJSON().slice(0, 10);
            const periodTo = new Date(req.query.to).toJSON().slice(0, 10);

            sql += " AND paystats.p_month >= '" + periodFrom + "' AND paystats.p_month <= '" + periodTo + "'";
        }

        if (req.query.postalCode) {
            sql += " AND postal_codes.code = '" + req.query.postalCode + "'";
        }

        sql += " GROUP BY paystats.p_age, paystats.p_gender";

        const results = await connection.query(sql);

        const data = [];

        for (let row of results) {
            const pAge = data.find((item) => item.p_age === row.p_age);

            if (!pAge) {
                data.push({p_age: row.p_age});
            }

            const index = data.findIndex((item) => item.p_age === row.p_age);

            if (row.p_gender === 'M') {
                data[index].total_male = row.total.toFixed(2);
            } else {
                data[index].total_female = row.total.toFixed(2);
            }
        }

        res.json({ error: null, data: data });
    } catch(error) {
        res.status(500).send(error.message);
    }
}

const getMonthlyTurnoverByGender = async (req, res) => {
    try {
        const connection = await getConnection();

        let sql = "SELECT paystats.p_month, paystats.p_gender, SUM(paystats.amount) as total FROM paystats";

        if (req.query.from && req.query.to) {
            const periodFrom = new Date(req.query.from).toJSON().slice(0, 10);
            const periodTo = new Date(req.query.to).toJSON().slice(0, 10);

            sql += " WHERE paystats.p_month >= '" + periodFrom + "' AND paystats.p_month <= '" + periodTo + "'";
        }

        sql += " GROUP BY paystats.p_month, paystats.p_gender";

        const results = await connection.query(sql);

        const data = [];

        for (let row of results) {
            const pMonth = data.find((item) => item.p_month === row.p_month);

            if (!pMonth) {
                data.push({p_month: row.p_month});
            }

            const index = data.findIndex((item) => item.p_month === row.p_month);

            if (row.p_gender === 'M') {
                data[index].total_male = row.total.toFixed(2);
            } else {
                data[index].total_female = row.total.toFixed(2);
            }
        }

        res.json({ error: null, data: data });
    } catch(error) {
        res.status(500).send(error.message);
    }
}

export const methods = {
    getTotalTurnover,
    getTurnoverByGender,
    getMonthlyTurnoverByGender
};