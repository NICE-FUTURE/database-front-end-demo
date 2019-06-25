const sql = require("mssql");

const config = {
    user: "your_user_name",
    password: "your_user_password",
    database: "your_database_name",
    server: "localhost"  // don't change it if you don't know what you are doing
};

function listAllTables(res) {
    sql.connect(config, err => {
        if (err) {
            console.log(err);
            return;
        }
        // list all tables
        new sql.Request().query(`select * from ${config.database}.information_schema.tables`, (err, result) => {
            if (err) {
                console.log(err.originalError);
                sql.close();
                return;
            }

            let tables = [];
            result.recordset.forEach(item => {
                tables.push(item.TABLE_SCHEMA+"."+item.TABLE_NAME);
            });

            res.end(JSON.stringify(tables));
            sql.close();
        });
    });
}

function query(res, queryStr) {
    sql.connect(config, err => {
        if (err) {
            console.log(err.originalError);
            sql.close();
            return;
        }
        // query
        new sql.Request().query(queryStr, (err, result) => {
            if (err) {
                console.log(err.originalError);
                sql.close();
                return;
            }

            res.end(JSON.stringify(result.recordsets[0]));
            sql.close();
        });
    });
}

module.exports={listAllTables, query};
