const mysql = require('mysql');

class DB {

    constructor() {
        this.mysqlConnection = null;
    }

    async connect() {

        if (this.mysqlConnection === null) {

            this.mysqlConnection = await mysql.createConnection({
                host: process.env.HOST,
                user: process.env.USER,
                password: process.env.PASSWORD,
                database: process.env.DATABASE_NAME
            });
        
            this.mysqlConnection.connect((err) => {
        
                if (err) {
                    return console.log(`ERROR: ${JSON.stringify(err)}`);
                }
        
            })
        } 

        return this.mysqlConnection;
    }

    async closeConnection() {

        try {
            
            if (this.mysqlConnection !== null) {

                await this.mysqlConnection.end();
            }

        } catch (error) {
            console.log('ERROR: ' + JSON.stringify(error));
        }
    }
}

module.exports = new DB();