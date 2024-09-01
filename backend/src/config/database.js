import sql from 'mysql2/promise';

export default class Database {
    config = {};
    poolconnection = null;
    connected = false;
   
    constructor(config) {
        const{hostname,
                port,
                user,
                pass,
                dbName,
                waitForConnections,
                connectionLimit,
                queueLimit} = config;
        this.pool = sql.createPool({
            host: hostname,
            user: user,
            password: pass,
            database: dbName,
            port:port,
            waitForConnections: waitForConnections,
            connectionLimit: connectionLimit,
            queueLimit: 0,
            queueLimit:queueLimit
        });
        // console.log(`Database: config: ${JSON.stringify(config)}`);
    }

    async connect() {
        try {
            // const [rows, fields] = await this.pool.query('SELECT * FROM ITEMS');
            this.poolconnection = this.pool;
        } catch (error) {
            console.error(`Error connecting to database: ${JSON.stringify(error)}`);
        }
    }

    async disconnect() {
        try {
            this.poolconnection.close();
            console.log('Database connection closed');
        } catch (error) {
            console.error(`Error closing database connection: ${error}`);
        }
    }

    async executeQuery(query) {
        await this.connect();
        // const request = this.poolconnection.request();
        const result = await this.poolconnection.query(query);

        return result.rowsAffected[0];
    }

    async create(data) {
        await this.connect();
        const request = this.poolconnection.request();

        request.input('firstName', sql.NVarChar(255), data.firstName);
        request.input('lastName', sql.NVarChar(255), data.lastName);

        const result = await request.query(
            `INSERT INTO Person (firstName, lastName) VALUES (@firstName, @lastName)`
        );

        return result.rowsAffected[0];
    }

    async readAll() {
        await this.connect();
        // const request = this.poolconnection.request();
        const [rows] = await this.pool.query(`SELECT * FROM ITEMS`);
        return rows;
    }

    async read(id) {
        await this.connect();

        const request = this.poolconnection.request();
        const result = await request
            .input('id', sql.Int, +id)
            .query(`SELECT * FROM Person WHERE id = @id`);

        return result.recordset[0];
    }

    async update(id, data) {
        await this.connect();

        const request = this.poolconnection.request();

        request.input('id', sql.Int, +id);
        request.input('firstName', sql.NVarChar(255), data.firstName);
        request.input('lastName', sql.NVarChar(255), data.lastName);

        const result = await request.query(
            `UPDATE Person SET firstName=@firstName, lastName=@lastName WHERE id = @id`
        );

        return result.rowsAffected[0];
    }

    async delete(id) {
        await this.connect();

        const idAsNumber = Number(id);

        const request = this.poolconnection.request();
        const result = await request
            .input('id', sql.Int, idAsNumber)
            .query(`DELETE FROM Person WHERE id = @id`);

        return result.rowsAffected[0];
    }
}