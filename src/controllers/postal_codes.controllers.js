import getConnection from "./../database/database.js";
import wkx from "wkx";

const getGeometries = async (req, res) => {
    try {
        const connection = await getConnection();
        const results = await connection.query("SELECT * FROM postal_codes");

        const data = [];

        for (let row of results) {
            const geometry = wkx.Geometry.parse(row.the_geom);
            data.push({id: row.id, postalCode: row.code, geoJSON: geometry.toGeoJSON()});
        }

        res.json({ error: null, data: data });
    } catch(error) {
        res.status(500).send(error.message);
    }    
};

const getGeometry = async (req, res) => {
    try {
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM postal_codes WHERE id = ?", id);

        if (!result) {
            res.status(400).json({error: "Resource not found"});
        }

        const item = result[0];

        const geometry = wkx.Geometry.parse(item.the_geom);
        const data = {id: item.id, postalCode: item.code, geoJSON: geometry.toGeoJSON()};

        res.json({ error: null, data: data });
    } catch(error) {
        res.status(500).send(error.message);
    }
};

const getTurnOverByGender = async (req, res) => {
    try {
        const connection = await getConnection();

        let sql = "SELECT postal_codes.code, postal_codes.the_geom, paystats.postal_code_id, paystats.p_gender, SUM(paystats.amount) as total FROM paystats";
        sql += " INNER JOIN postal_codes ON postal_codes.id = paystats.postal_code_id";

        if (req.query.from && req.query.to) {
            const periodFrom = new Date(req.query.from).toJSON().slice(0, 10);
            const periodTo = new Date(req.query.to).toJSON().slice(0, 10);

            sql += " WHERE paystats.p_month >= '" + periodFrom + "' AND paystats.p_month <= '" + periodTo + "'";
        }

        sql += " GROUP BY paystats.postal_code_id, paystats.p_gender";

        const results = await connection.query(sql);

        const data = [];

        for (let row of results) {
            const postalCode = data.find((item) => item.postal_code_id === row.postal_code_id);

            if (!postalCode) {
                const geometry = wkx.Geometry.parse(row.the_geom);
                data.push({postal_code_id: row.postal_code_id, postalCode: row.code, geoJSON: geometry.toGeoJSON(), turnOver: {total_male: 0, total_female: 0}});
            }

            const index = data.findIndex((item) => item.postal_code_id === row.postal_code_id);

            if (row.p_gender === 'M') {
                data[index].turnOver.total_male = row.total.toFixed(2);
            } else {
                data[index].turnOver.total_female = row.total.toFixed(2);
            }
        }

        res.json({ error: null, data: data });
    } catch(error) {
        res.status(500).send(error.message);
    }
}

export const methods = {
    getGeometries,
    getGeometry,
    getTurnOverByGender
};